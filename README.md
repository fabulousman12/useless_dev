# Backend

This backend powers the Enterprise URL Lengthener app. It is a small Express server that:

- serves the built frontend from `backend/frontnend/dist`
- accepts URL-lengthening requests at `POST /lengthen`
- stores generated redirect mappings in memory
- automatically deletes each generated mapping after 15 minutes
- redirects generated enterprise URLs back to the original URL, or occasionally to a joke Google search

## Requirements

- Node.js 18 or newer
- npm

## Install

From the `backend` folder, install dependencies:

```bash
npm install
```

## Run Locally

Start the server with:

```bash
npm start
```

The backend runs on port `3001` by default.

You can change the port by setting the `PORT` environment variable.

PowerShell example:

```powershell
$env:PORT=4000
npm start
```

## How It Works

When the server starts, it:

- enables CORS for all origins
- parses JSON request bodies
- serves static files from `./frontnend/dist`
- exposes a `POST /lengthen` endpoint
- keeps generated URL mappings in an in-memory `Map`
- schedules each generated mapping to expire after 15 minutes

Because mappings are stored in memory, all generated enterprise URLs are lost when the server restarts, and each generated URL also expires automatically after 15 minutes.

## API

### `POST /lengthen`

Creates an absurdly long "enterprise" URL from a normal URL.

#### Request body

```json
{
  "url": "https://example.com/docs",
  "aiOptimized": true,
  "seoBoost": true,
  "tracking": false,
  "blockchain": false,
  "synergy": true,
  "emotionalSupport": true
}
```

#### Fields

- `url` - required; the original URL to transform
- `aiOptimized` - optional boolean
- `seoBoost` - optional boolean
- `tracking` - optional boolean
- `blockchain` - optional boolean
- `synergy` - optional boolean
- `emotionalSupport` - optional boolean

If the URL does not include `http://` or `https://`, the server automatically tries it with `https://`.

#### Success response

```json
{
  "originalUrl": "https://example.com/docs",
  "enhancedUrl": "http://localhost:3001/enterprise-grade-scalable/example-path?...",
  "report": {
    "report_id": "ENT-ABCDEFGH-V2",
    "timestamp": "2026-04-08T12:00:00.000Z"
  },
  "compliance": true
}
```

The `report` object includes extra joke metadata such as:

- summary and fake metrics
- compliance and blockchain status
- redirect behavior probabilities
- warnings and disclaimer text

#### Error responses

Missing URL:

```json
{
  "error": "This URL lacks enterprise readiness (Please provide a URL)"
}
```

Invalid URL:

```json
{
  "error": "This URL lacks enterprise readiness (Invalid format)"
}
```

## Example Usage

### Using `curl`

```bash
curl -X POST http://localhost:3001/lengthen \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"https://github.com\",\"aiOptimized\":true,\"seoBoost\":true,\"synergy\":true}"
```

### Using PowerShell

```powershell
$body = @{
  url = "https://github.com"
  aiOptimized = $true
  seoBoost = $true
  synergy = $true
  emotionalSupport = $true
} | ConvertTo-Json

Invoke-RestMethod -Method Post `
  -Uri "http://localhost:3001/lengthen" `
  -ContentType "application/json" `
  -Body $body
```

## Redirect Behavior

When someone opens a generated enterprise URL, the backend checks whether it exists in the in-memory map and then:

- usually redirects to the original URL
- sometimes redirects to a Google search for that URL
- sometimes waits briefly before redirecting
- returns an expiry message if the 15-minute lifetime has already passed

If the route is not found, the server returns a custom `404` HTML message.

## Project Files

- `index.js` - Express server and route logic
- `reportGenerator.js` - fake enterprise report generator
- `package.json` - scripts and dependencies
- `frontnend/dist` - built frontend served by the backend

## Notes

- The static frontend directory is named `frontnend/dist` in this project, and the backend code expects that exact path.
- There is no database; generated mappings are temporary and are auto-deleted after 15 minutes.
- There are currently no automated tests configured in `package.json`.
