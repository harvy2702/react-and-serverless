export interface Class {
    id: string;
    name: string;
    description?: string;
    owner_id: string;
    invite_code?: string;
    created_at: Date;
    updated_at: Date;
}

export interface ClassMember {
    class_id: string;
    user_id: string;
    role: 'teacher' | 'student';
    joined_at: Date;
    invited_by?: string;
}

export interface ClassWithRole extends Class {
    role: 'teacher' | 'student';
    joined_at: Date;
}
