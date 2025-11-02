# Setup Guide - Classroom Material API

## Quick Start

### 1. Database Setup

**Note:** The `class` and `class_members` tables already exist in Azure SQL Database.

#### Inspect the existing schema:

```bash
# Navigate to the API directory
cd api

# View the current database structure
sqlcmd -S classroom-material-sql.database.windows.net \
  -d classroom-db \
  -U <username> \
  -P <password> \
  -i database/inspect-schema.sql
```

#### (Optional) Add sample test data:

```bash
# Insert sample classes and members for testing
sqlcmd -S classroom-material-sql.database.windows.net \
  -d classroom-db \
  -U <username> \
  -P <password> \
  -i database/schema.sql
```

Or use Azure Data Studio / SQL Server Management Studio to run the scripts.

### 2. Local Development Setup

```bash
# Install dependencies
npm install

# Configure local settings
# Edit local.settings.json and add your SQL credentials:
# - SQL_USERNAME
# - SQL_PASSWORD

# Build the project
npm run build

# Start the Function App locally
npm start
```

The API will be available at: `http://localhost:7071`

### 3. Test the API Locally

```bash
# Get all classes for a user
curl "http://localhost:7071/api/classes?userId=teacher-001"

# Get classes where user is a teacher
curl "http://localhost:7071/api/classes?userId=teacher-001&role=teacher"

# Get classes where user is a student  
curl "http://localhost:7071/api/classes?userId=student-001&role=student"
```

### 4. Deploy to Azure

#### Option A: Using the deployment script

```bash
# Make sure you're logged in to Azure
az account show

# Run the deployment script
./deploy.sh
```

#### Option B: Manual deployment

```bash
# Update Function App runtime to Node.js
az functionapp config set \
  --name classroom-material-api \
  --resource-group classroom-material-rg \
  --linux-fx-version "NODE|20"

# Build the project
npm run build

# Deploy to Azure
func azure functionapp publish classroom-material-api
```

### 5. Configure Azure Function App Settings

After deployment, add the SQL connection settings to Azure:

```bash
# Add SQL connection settings
az functionapp config appsettings set \
  --name classroom-material-api \
  --resource-group classroom-material-rg \
  --settings \
    SQL_SERVER=classroom-material-sql.database.windows.net \
    SQL_DATABASE=classroom-db \
    SQL_USERNAME=<your-username> \
    SQL_PASSWORD=<your-password>
```

### 6. Test the Deployed API

```bash
# Get the Function App URL
FUNCTION_URL=$(az functionapp show \
  --name classroom-material-api \
  --resource-group classroom-material-rg \
  --query defaultHostName -o tsv)

# Test the endpoint
curl "https://${FUNCTION_URL}/api/classes?userId=teacher-001"
```

## Troubleshooting

### SQL Connection Issues

1. **Check firewall rules:**
   ```bash
   az sql server firewall-rule list \
     --resource-group classroom-material-rg \
     --server classroom-material-sql
   ```

2. **Add your IP if needed:**
   ```bash
   az sql server firewall-rule create \
     --resource-group classroom-material-rg \
     --server classroom-material-sql \
     --name AllowMyIP \
     --start-ip-address <your-ip> \
     --end-ip-address <your-ip>
   ```

### Function App Issues

1. **Check logs:**
   ```bash
   func azure functionapp logstream classroom-material-api
   ```

2. **Verify runtime:**
   ```bash
   az functionapp config show \
     --name classroom-material-api \
     --resource-group classroom-material-rg \
     --query linuxFxVersion
   ```

### Build Issues

1. **Clean and rebuild:**
   ```bash
   npm run clean
   npm run build
   ```

## Next Steps

- [x] Database tables already exist in Azure SQL
- [ ] Inspect database schema with `database/inspect-schema.sql`
- [ ] (Optional) Add sample test data with `database/schema.sql`
- [ ] Configure `local.settings.json` with SQL credentials
- [ ] Test locally with `npm start`
- [ ] Deploy to Azure with `./deploy.sh`
- [ ] Configure Azure Function App settings
- [ ] Test the deployed API
- [ ] Integrate with the React frontend
