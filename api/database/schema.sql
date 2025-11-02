-- ============================================
-- Sample Data for Testing
-- ============================================
-- This script inserts sample data into existing tables

-- Insert sample data for testing
DECLARE @teacherId UNIQUEIDENTIFIER = NEWID();
DECLARE @studentId UNIQUEIDENTIFIER = NEWID();
DECLARE @classId1 UNIQUEIDENTIFIER = NEWID();
DECLARE @classId2 UNIQUEIDENTIFIER = NEWID();

-- Insert sample profiles first (required by foreign key)
INSERT INTO profiles (id, display_name, avatar_url, email, created_at, updated_at)
VALUES 
    (@teacherId, 'John Teacher', NULL, 'john.teacher@example.com', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
    (@studentId, 'Jane Student', NULL, 'jane.student@example.com', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

-- Insert sample classes
INSERT INTO classes (id, name, description, owner_id, invite_code, created_at, updated_at)
VALUES 
    (@classId1, 'Mathematics 101', 'Introduction to Mathematics', @teacherId, 'MATH101', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
    (@classId2, 'Physics 201', 'Advanced Physics Concepts', @teacherId, 'PHYS201', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

-- Insert class members
INSERT INTO class_members (class_id, user_id, role, joined_at, invited_by)
VALUES 
    (@classId1, @teacherId, 'teacher', SYSDATETIMEOFFSET(), NULL),
    (@classId2, @teacherId, 'teacher', SYSDATETIMEOFFSET(), NULL),
    (@classId1, @studentId, 'student', SYSDATETIMEOFFSET(), @teacherId);

-- Display the inserted data
PRINT 'Sample data inserted successfully!';
PRINT '';
PRINT 'Test User IDs:';
PRINT 'Teacher ID: ' + CAST(@teacherId AS NVARCHAR(50));
PRINT 'Student ID: ' + CAST(@studentId AS NVARCHAR(50));
PRINT '';

-- Verify the data
SELECT 'Profiles' as TableName, COUNT(*) as RecordCount FROM profiles
UNION ALL
SELECT 'Classes' as TableName, COUNT(*) as RecordCount FROM classes
UNION ALL
SELECT 'Class Members' as TableName, COUNT(*) as RecordCount FROM class_members;

-- Show sample query result (what the API will return for teacher)
SELECT 
    c.id,
    c.name,
    c.description,
    c.owner_id,
    c.created_at,
    c.updated_at,
    cm.role,
    cm.joined_at
FROM classes c
INNER JOIN class_members cm ON c.id = cm.class_id
WHERE cm.user_id = @teacherId
ORDER BY cm.joined_at DESC;
