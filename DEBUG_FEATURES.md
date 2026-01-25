# 🔍 Debug: Check Features Format

## Issue
Features are saved in admin but not displaying on the pricing page.

## Likely Causes

### 1. **Features stored as string instead of array**
The database might be storing features as a string like:
```
"Advanced strategy & execution, Ongoing optimization"
```

Instead of an array:
```json
["Advanced strategy & execution", "Ongoing optimization"]
```

### 2. **Features field is null/undefined**
The query might not be returning the features field.

## Quick Fix

Try this in your browser console on the `/services/social` page:

```javascript
// Open browser console (F12)
// This will show you what data the page is receiving
console.log('Plans:', plans);
```

## Solution

I'll update the code to handle both string and array formats for features.
