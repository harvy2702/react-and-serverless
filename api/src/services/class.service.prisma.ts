import { prisma } from '../config/prisma';
import { ClassWithRole } from '../models/class.model';

export class ClassService {
    /**
     * Get all classes for a specific user (both as teacher and student)
     * @param userId - The user ID to get classes for
     * @returns Array of classes with the user's role in each class
     */
    async getClassesByUserId(userId: string): Promise<ClassWithRole[]> {
        const memberships = await prisma.classMember.findMany({
            where: {
                user_id: userId
            },
            include: {
                class: true
            },
            orderBy: {
                joined_at: 'desc'
            }
        });

        return memberships.map(membership => ({
            id: membership.class.id,
            name: membership.class.name,
            description: membership.class.description,
            owner_id: membership.class.owner_id,
            invite_code: membership.class.invite_code,
            created_at: membership.class.created_at,
            updated_at: membership.class.updated_at,
            role: membership.role as 'teacher' | 'student',
            joined_at: membership.joined_at
        }));
    }

    /**
     * Get classes where user is a teacher
     * @param userId - The user ID to get classes for
     * @returns Array of classes where user is a teacher
     */
    async getClassesAsTeacher(userId: string): Promise<ClassWithRole[]> {
        const memberships = await prisma.classMember.findMany({
            where: {
                user_id: userId,
                role: 'teacher'
            },
            include: {
                class: true
            },
            orderBy: {
                joined_at: 'desc'
            }
        });

        return memberships.map(membership => ({
            id: membership.class.id,
            name: membership.class.name,
            description: membership.class.description,
            owner_id: membership.class.owner_id,
            invite_code: membership.class.invite_code,
            created_at: membership.class.created_at,
            updated_at: membership.class.updated_at,
            role: membership.role as 'teacher' | 'student',
            joined_at: membership.joined_at
        }));
    }

    /**
     * Get classes where user is a student
     * @param userId - The user ID to get classes for
     * @returns Array of classes where user is a student
     */
    async getClassesAsStudent(userId: string): Promise<ClassWithRole[]> {
        const memberships = await prisma.classMember.findMany({
            where: {
                user_id: userId,
                role: 'student'
            },
            include: {
                class: true
            },
            orderBy: {
                joined_at: 'desc'
            }
        });

        return memberships.map(membership => ({
            id: membership.class.id,
            name: membership.class.name,
            description: membership.class.description,
            owner_id: membership.class.owner_id,
            invite_code: membership.class.invite_code,
            created_at: membership.class.created_at,
            updated_at: membership.class.updated_at,
            role: membership.role as 'teacher' | 'student',
            joined_at: membership.joined_at
        }));
    }

    /**
     * Get a single class by ID with user's role
     * @param classId - The class ID
     * @param userId - The user ID
     * @returns Class with role if user is a member, null otherwise
     */
    async getClassById(classId: string, userId: string): Promise<ClassWithRole | null> {
        const membership = await prisma.classMember.findUnique({
            where: {
                class_id_user_id: {
                    class_id: classId,
                    user_id: userId
                }
            },
            include: {
                class: true
            }
        });

        if (!membership) {
            return null;
        }

        return {
            id: membership.class.id,
            name: membership.class.name,
            description: membership.class.description,
            owner_id: membership.class.owner_id,
            invite_code: membership.class.invite_code,
            created_at: membership.class.created_at,
            updated_at: membership.class.updated_at,
            role: membership.role as 'teacher' | 'student',
            joined_at: membership.joined_at
        };
    }

    /**
     * Create a new class
     * @param name - Class name
     * @param description - Class description
     * @param ownerId - Owner user ID
     * @returns Created class
     */
    async createClass(name: string, description: string | null, ownerId: string) {
        // Create class and add owner as teacher in a transaction
        return await prisma.$transaction(async (tx) => {
            const newClass = await tx.class.create({
                data: {
                    name,
                    description,
                    owner_id: ownerId,
                    invite_code: this.generateInviteCode()
                }
            });

            await tx.classMember.create({
                data: {
                    class_id: newClass.id,
                    user_id: ownerId,
                    role: 'teacher'
                }
            });

            return newClass;
        });
    }

    /**
     * Update class details
     * @param classId - Class ID
     * @param updates - Fields to update
     * @returns Updated class
     */
    async updateClass(classId: string, updates: { name?: string; description?: string | null }) {
        return await prisma.class.update({
            where: { id: classId },
            data: updates
        });
    }

    /**
     * Delete a class
     * @param classId - Class ID
     */
    async deleteClass(classId: string) {
        // Delete class members first, then the class
        await prisma.$transaction(async (tx) => {
            await tx.classMember.deleteMany({
                where: { class_id: classId }
            });
            
            await tx.class.delete({
                where: { id: classId }
            });
        });
    }

    /**
     * Add a member to a class
     * @param classId - Class ID
     * @param userId - User ID to add
     * @param role - Role (teacher or student)
     * @param invitedBy - User ID who invited
     */
    async addClassMember(classId: string, userId: string, role: 'teacher' | 'student', invitedBy?: string) {
        return await prisma.classMember.create({
            data: {
                class_id: classId,
                user_id: userId,
                role,
                invited_by: invitedBy
            }
        });
    }

    /**
     * Remove a member from a class
     * @param classId - Class ID
     * @param userId - User ID to remove
     */
    async removeClassMember(classId: string, userId: string) {
        return await prisma.classMember.delete({
            where: {
                class_id_user_id: {
                    class_id: classId,
                    user_id: userId
                }
            }
        });
    }

    /**
     * Generate a random invite code
     */
    private generateInviteCode(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
}
