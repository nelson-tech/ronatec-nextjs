# Import Endpoint Diagnostic

## Current Status

- ✅ GET `/api/import-lanco-csv?test=true` works
- ❌ POST `/api/import-lanco-csv` times out
- ❌ Even simple POST endpoints timeout

## Possible Issue

Express server may need body-parser configuration OR there's a routing conflict.

## Run These Commands

### 1. Check if server responds at all

```bash
curl -v http://localhost:8140/api/import-lanco-csv 2>&1 | grep -E "Connected|HTTP"
```

### 2. Try POST without body

```bash
curl -X POST http://localhost:8140/api/test-simple --max-time 3
```

### 3. Try POST with empty JSON

```bash
curl -X POST http://localhost:8140/api/test-simple \
  -H "Content-Type: application/json" \
  --max-time 3
```

### 4. Check server logs

When you run the POST command, do you see ANY output in your terminal running the dev server?

## Likely Solutions

### Solution 1: Use GET instead of POST temporarily

The import can work with GET parameters:

```bash
curl "http://localhost:8140/api/import-lanco-csv?limit=5&offset=0"
```

### Solution 2: Create standalone script

Instead of using API routes, create a Node script:

```bash
# Create: scripts/import-lanco-csv.ts
yarn ts-node scripts/import-lanco-csv.ts
```

### Solution 3: Use existing working endpoint

Your `/api/import-lanco-exports` endpoint works - we could modify that instead.

## What to try NOW

1. **Use the GET version** (should work):

```bash
curl "http://localhost:8140/api/import-lanco-csv?limit=1"
```

2. If GET works, the import will proceed and we can use GET for now

3. Let me know what you see in the server logs when you try the POST

## My Recommendation

Since GET works, let's just use that for now. Try:

```bash
# Test with 1 product
curl "http://localhost:8140/api/import-lanco-csv?limit=1"

# If that works, import all
curl "http://localhost:8140/api/import-lanco-csv"
```

The GET handler will forward to POST internally, so it should work!
