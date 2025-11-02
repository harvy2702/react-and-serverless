#!/bin/bash

# Azure Function App Deployment Script
# This script updates the Function App runtime and deploys the code

set -e

RESOURCE_GROUP="classroom-material-rg"
FUNCTION_APP_NAME="classroom-material-api"
RUNTIME="node"
RUNTIME_VERSION="20"

echo "📦 Building the project..."
npm run build

echo "🔧 Updating Function App runtime to Node.js..."
az functionapp config set \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --linux-fx-version "NODE|$RUNTIME_VERSION"

echo "⏳ Waiting for runtime update to complete..."
sleep 10

echo "🚀 Deploying to Azure..."
func azure functionapp publish $FUNCTION_APP_NAME

echo "✅ Deployment complete!"
echo "🌐 Function URL: https://$FUNCTION_APP_NAME.azurewebsites.net/api/classes"
