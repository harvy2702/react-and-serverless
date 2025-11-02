import * as sql from 'mssql';
import { getConnection } from '../config/database';
import { ClassWithRole } from '../models/class.model';

export class ClassService {
    /**
     * Get all classes for a specific user (both as teacher and student)
     * @param userId - The user ID to get classes for
     * @returns Array of classes with the user's role in each class
     */
    async getClassesByUserId(userId: string): Promise<ClassWithRole[]> {
        const pool = await getConnection();
        
        const query = `
            SELECT 
                c.id,
                c.name,
                c.description,
                c.owner_id,
                c.invite_code,
                c.created_at,
                c.updated_at,
                cm.role,
                cm.joined_at
            FROM classes c
            INNER JOIN class_members cm ON c.id = cm.class_id
            WHERE cm.user_id = @userId
            ORDER BY cm.joined_at DESC
        `;

        const result = await pool.request()
            .input('userId', sql.UniqueIdentifier, userId)
            .query<ClassWithRole>(query);

        return result.recordset;
    }

    /**
     * Get classes where user is a teacher
     * @param userId - The user ID to get classes for
     * @returns Array of classes where user is a teacher
     */
    async getClassesAsTeacher(userId: string): Promise<ClassWithRole[]> {
        const pool = await getConnection();
        
        const query = `
            SELECT 
                c.id,
                c.name,
                c.description,
                c.owner_id,
                c.invite_code,
                c.created_at,
                c.updated_at,
                cm.role,
                cm.joined_at
            FROM classes c
            INNER JOIN class_members cm ON c.id = cm.class_id
            WHERE cm.user_id = @userId AND cm.role = 'teacher'
            ORDER BY cm.joined_at DESC
        `;

        const result = await pool.request()
            .input('userId', sql.UniqueIdentifier, userId)
            .query<ClassWithRole>(query);

        return result.recordset;
    }

    /**
     * Get classes where user is a student
     * @param userId - The user ID to get classes for
     * @returns Array of classes where user is a student
     */
    async getClassesAsStudent(userId: string): Promise<ClassWithRole[]> {
        const pool = await getConnection();
        
        const query = `
            SELECT 
                c.id,
                c.name,
                c.description,
                c.owner_id,
                c.invite_code,
                c.created_at,
                c.updated_at,
                cm.role,
                cm.joined_at
            FROM classes c
            INNER JOIN class_members cm ON c.id = cm.class_id
            WHERE cm.user_id = @userId AND cm.role = 'student'
            ORDER BY cm.joined_at DESC
        `;

        const result = await pool.request()
            .input('userId', sql.UniqueIdentifier, userId)
            .query<ClassWithRole>(query);

        return result.recordset;
    }
}
