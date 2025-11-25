# Quick Diagnostic Steps

## 1. Test if endpoint is accessible

```bash
curl "http://localhost:8140/api/import-lanco-csv?test=true"
```

Expected response:

```json
{
  "status": "ok",
  "message": "Import endpoint is accessible",
  "defaultCsvPath": "...",
  "runtime": "nodejs"
}
```

## 2. Check server logs

Make sure you see in the console:

```
🎯 GET endpoint hit!
```

## 3. If endpoint times out

The issue is likely:

- Server needs restart to pick up new routes
- TypeScript compilation issue

**Solution**: Restart your dev server:

```bash
# Stop the server (Ctrl+C)
# Then restart:
yarn dev
```

## 4. Test with smallest import

```bash
curl -X POST http://localhost:8140/api/import-lanco-csv \
  -H "Content-Type: application/json" \
  -d '{"limit": 1}'
```

Look for these logs:

```
🎯 Import endpoint hit!
📥 Parsing request body...
🚀 Starting Lanco CSV import...
Parameters: { csvPath: '...', limit: 1, ... }
📄 Reading CSV from: ...
✅ CSV file read successfully ...
```

## 5. If you see "Failed to read CSV file"

The file path might be wrong. Update it in the request:

```bash
curl -X POST http://localhost:8140/api/import-lanco-csv \
  -H "Content-Type: application/json" \
  -d '{
    "limit": 1,
    "csvPath": "src/app/api/import-lanco-exports/wc-product-export-24-11-2025-1764009993018.csv"
  }'
```

## Changes Made

1. ✅ Added `export const runtime = "nodejs"` - Forces Node.js runtime for fs support
2. ✅ Added detailed logging at every step
3. ✅ Added health check endpoint (`?test=true`)
4. ✅ Better error handling for file reading

## Try This Now

1. **Restart your dev server** (important!)
2. Test health check:
   ```bash
   curl "http://localhost:8140/api/import-lanco-csv?test=true"
   ```
3. If that works, try import:
   ```bash
   curl -X POST http://localhost:8140/api/import-lanco-csv \
     -H "Content-Type: application/json" \
     -d '{"limit": 1}'
   ```
