import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ClassService } from "../services/class.service.prisma";

/**
 * HTTP GET endpoint to retrieve classes for a user
 * Query parameters:
 * - userId: (required) The user ID to get classes for
 * - role: (optional) Filter by role - 'teacher' or 'student'
 */
export async function getClasses(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP function processed request for url "${request.url}"`);

    try {
        // Get userId from query parameters
        const userId = request.query.get('userId');
        
        if (!userId) {
            return {
                status: 400,
                jsonBody: {
                    error: 'Bad Request',
                    message: 'userId query parameter is required'
                }
            };
        }

        const role = request.query.get('role');
        const classService = new ClassService();
        
        let classes;
        
        // Filter by role if specified
        if (role === 'teacher') {
            classes = await classService.getClassesAsTeacher(userId);
        } else if (role === 'student') {
            classes = await classService.getClassesAsStudent(userId);
        } else if (!role) {
            classes = await classService.getClassesByUserId(userId);
        } else {
            return {
                status: 400,
                jsonBody: {
                    error: 'Bad Request',
                    message: 'Invalid role parameter. Must be "teacher" or "student"'
                }
            };
        }

        return {
            status: 200,
            jsonBody: {
                success: true,
                data: classes,
                count: classes.length
            }
        };

    } catch (error) {
        context.error('Error getting classes:', error);
        
        return {
            status: 500,
            jsonBody: {
                error: 'Internal Server Error',
                message: error instanceof Error ? error.message : 'An unexpected error occurred'
            }
        };
    }
}

app.http('getClasses', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'classes',
    handler: getClasses
});
