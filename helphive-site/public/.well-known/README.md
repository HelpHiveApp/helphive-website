# Well-Known Directory - Password Reset Verification Files

This directory contains verification files for Android and iOS app password reset functionality.

## Files

### 1. `assetlinks.json` (Android)
This file is used for Android App Links verification.

**Fields to fill in:**
- `package_name`: Your Android app's package name (e.g., `com.helphive.app`)
- `sha256_cert_fingerprints`: Your app's SHA-256 certificate fingerprint(s)

**How to get SHA-256 fingerprint:**
```bash
# For debug keystore
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# For release keystore
keytool -list -v -keystore /path/to/your/keystore.jks -alias your-key-alias
```

**Example filled:**
```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.helphive.app",
      "sha256_cert_fingerprints": [
        "14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"
      ]
    }
  }
]
```

---

### 2. `apple-app-site-association` (iOS)
This file is used for iOS Universal Links verification.

**Fields to fill in:**
- `TEAM_ID`: Your Apple Developer Team ID (10-character identifier)
- `YOUR_BUNDLE_IDENTIFIER`: Your iOS app's bundle identifier (e.g., `com.helphive.app`)

**How to find Team ID:**
1. Go to https://developer.apple.com/account
2. Click on "Membership" in the sidebar
3. Your Team ID is listed there

**Example filled:**
```json
{
  "applinks": {
    "details": [
      {
        "appIDs": [
          "ABC123DEF4.com.helphive.app"
        ],
        "components": [
          {
            "/": "/reset-password/*",
            "comment": "Matches any URL with path starting with /reset-password/"
          }
        ]
      }
    ]
  },
  "webcredentials": {
    "apps": [
      "ABC123DEF4.com.helphive.app"
    ]
  }
}
```

---

## Important Notes

1. **File Placement**: These files are in `public/.well-known/` so they'll be accessible at:
   - `https://yourdomain.com/.well-known/assetlinks.json`
   - `https://yourdomain.com/.well-known/apple-app-site-association`

2. **HTTPS Required**: Both Android and iOS require HTTPS for verification files to work.

3. **No File Extension**: The `apple-app-site-association` file should NOT have a file extension.

4. **Content-Type**: 
   - For `assetlinks.json`: `application/json`
   - For `apple-app-site-association`: `application/json` (Next.js handles this automatically)

5. **Multiple Apps**: You can add multiple certificate fingerprints (Android) or app IDs (iOS) to support multiple apps or environments.

6. **Path Patterns**: Adjust the path patterns in the iOS file to match your actual password reset URL structure.

---

## Testing

### Android
1. Use Google's Digital Asset Links testing tool:
   https://developers.google.com/digital-asset-links/tools/generator

### iOS
1. Use Apple's AASA validator:
   https://search.developer.apple.com/appsearch-validation-tool/

2. Or test with the Branch.io validator:
   https://branch.io/resources/aasa-validator/

---

## Troubleshooting

- **404 errors**: Make sure the files are in the `public/.well-known/` directory
- **Verification fails**: Double-check fingerprints/team IDs are correct
- **iOS not working**: Ensure no `.json` extension on `apple-app-site-association`
- **Android not working**: Verify SHA-256 fingerprint matches your signing certificate
