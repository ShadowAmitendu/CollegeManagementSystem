# Appwrite Tooling

This project includes Appwrite CLI and MCP scaffolding.

## CLI

Install the Appwrite CLI first:

```bash
brew install appwrite
```

Then authenticate and connect this repo to your project:

```bash
npm run appwrite:login
npm run appwrite:init
```

The root `appwrite.config.json` uses Appwrite CLI 20+ `includes` to keep deployable resources under `appwrite/`.

## MCP

VS Code MCP config lives in `.vscode/mcp.json`.

The Appwrite Docs MCP uses the hosted docs server. The Appwrite API MCP uses `uvx mcp-server-appwrite` and reads these local environment variables:

```bash
export APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
export APPWRITE_PROJECT_ID="your-project-id"
export APPWRITE_API_KEY="your-local-api-key"
```

Create an API key in Appwrite with only the scopes needed for the operations you want your AI tool to perform.
