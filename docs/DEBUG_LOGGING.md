# Debug Logging Guide

This application includes optional debug logging that can be enabled/disabled without rebuilding the containers.

## Backend Debug Logging

### Enable via Environment Variable

Set the `GIGER_DEBUG_LOGGING` environment variable:

```bash
# Enable debug logging
export GIGER_DEBUG_LOGGING=true
docker compose up -d backend

# Or inline
GIGER_DEBUG_LOGGING=true docker compose up -d backend
```

### Disable Debug Logging (Default)

```bash
# Disable debug logging (or just omit the variable)
export GIGER_DEBUG_LOGGING=false
docker compose up -d backend
```

### What Gets Logged

When enabled, the backend logs:
- WebSocket connection events
- Message send/receive events
- Conversation creation details
- Participant socket lookups
- Auth token validation

## Frontend Debug Logging

### Enable via Environment Variable (Build Time)

Set the `VITE_DEBUG_LOGGING` environment variable before building:

```bash
# Enable debug logging
export VITE_DEBUG_LOGGING=true
docker compose build frontend
docker compose up -d frontend
```

### Enable via Browser (Runtime)

You can toggle debug logging at runtime without rebuilding:

```javascript
// In browser console:
localStorage.setItem('GIGER_DEBUG_LOGGING', 'true');
// Then refresh the page

// To disable:
localStorage.setItem('GIGER_DEBUG_LOGGING', 'false');
// Then refresh the page
```

### What Gets Logged

When enabled, the frontend logs:
- WebSocket connection states
- Message sending events
- Conversation creation flow
- Redux state updates
- API request/response details

## Using .env File

You can also create a `.env` file in the project root (copy from `.env.example`):

```bash
# .env file
GIGER_DEBUG_LOGGING=true
VITE_DEBUG_LOGGING=true
```

Then simply:

```bash
docker compose up -d
```

## Production Recommendations

**Always keep debug logging disabled in production** to:
- Reduce log noise
- Improve performance
- Avoid logging sensitive information

The default configuration has logging disabled, so you only need to explicitly set these variables when debugging issues.
