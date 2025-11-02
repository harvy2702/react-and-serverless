# Classroom Material API

TypeScript Azure Functions API for managing classroom materials and classes.

## Prerequisites

- Node.js 18.x or later
- Azure Functions Core Tools v4
- Azure SQL Database access

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure local settings:**
   - Copy `.env.example` to `local.settings.json`
   - Update the SQL credentials in `local.settings.json`:
     ```json
     {
       "Values": {
         "SQL_USERNAME": "your_username",
         "SQL_PASSWORD": "your_password"
       }
     }
     ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Run locally:**
   ```bash
   npm start
   ```

## API Endpoints

### GET /api/classes

Get all classes for a user.

**Query Parameters:**
- `userId` (required): The user ID to get classes for
- `role` (optional): Filter by role - `teacher` or `student`

**Examples:**
```bash
# Get all classes for a user
curl "http://localhost:7071/api/classes?userId=user123"

# Get classes where user is a teacher
curl "http://localhost:7071/api/classes?userId=user123&role=teacher"

# Get classes where user is a student
curl "http://localhost:7071/api/classes?userId=user123&role=student"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "class-uuid",
      "name": "Mathematics 101",
      "description": "Introduction to Mathematics",
      "created_by": "teacher-uuid",
      "created_at": "2025-11-01T00:00:00Z",
      "updated_at": "2025-11-01T12:00:00Z",
      "role": "student",
      "joined_at": "2025-11-01T10:00:00Z"
    }
  ],
  "count": 1
}
```

## Database Schema

**Note:** The `class` and `class_members` tables already exist in the Azure SQL Database.

To inspect the existing schema, run:
```bash
sqlcmd -S classroom-material-sql.database.windows.net \
  -d classroom-db \
  -U <username> \
  -P <password> \
  -i database/inspect-schema.sql
```

To add sample test data:
```bash
sqlcmd -S classroom-material-sql.database.windows.net \
  -d classroom-db \
  -U <username> \
  -P <password> \
  -i database/schema.sql
```

### Expected Table Structure

The API works with these tables (they should already exist):

**`class` table** - Stores class information
**`class_members` table** - Manages user-class relationships with roles (teacher/student)

## Deployment

### Update Function App Runtime

The Azure Function App needs to be updated to Node.js:

```bash
az functionapp config set \
  --name classroom-material-api \
  --resource-group classroom-material-rg \
  --linux-fx-version "NODE|20"
```

### Deploy to Azure

```bash
func azure functionapp publish classroom-material-api
```

## Project Structure

```
api/
├── src/
│   ├── config/
│   │   └── database.ts          # Database connection configuration
│   ├── models/
│   │   └── class.model.ts       # TypeScript interfaces for data models
│   ├── services/
│   │   └── class.service.ts     # Business logic for class operations
│   └── functions/
│       └── getClasses.ts        # HTTP endpoint handler
├── package.json
├── tsconfig.json
├── host.json                    # Azure Functions host configuration
└── local.settings.json          # Local environment variables
```

## Development

- **Build:** `npm run build`
- **Watch mode:** `npm run watch`
- **Clean build:** `npm run clean`
- **Start locally:** `npm start`

## Notes

- The `class` and `class_members` tables already exist in Azure SQL Database.
- Run `database/inspect-schema.sql` to view the current schema structure.
- Run `database/schema.sql` to insert sample test data (optional).
- CORS is configured to allow requests from the client application.
- Authentication is set to `anonymous` for development. Update to `function` or use Azure AD for production.
