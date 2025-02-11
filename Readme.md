# Security Plus

<img src="./preview.webp" alt="Security Plus Preview" width="100%" height="auto">

## Overview

Security Plus is a browser extension that adds an extra layer of security to your browsing experience. It intercepts page loads and provides detailed security analysis using VirusTotal and WhoIs before allowing access.

## 🎯 Features

- 🛡️ **Default Page Blocking**: Automatically blocks all new pages for security verification
- 🔍 **Security Analysis Widget**:
  - `VirusTotal` integration for threat detection
  - `WhoIs` lookup for domain information
  - Customizable widget layout using React-Mosaic
  - Shortcut keys for quick actions based on your analysis, shortcuts are based on your OS (mac or windows)
- 🌍 **Extension Pages**:
  - Quick search functionality
  - Database management
  - Customizable settings

## 📁 Poject Structure

```
├── Extension/
│   ├── chromium/
│   ├── firefox/
│   ├── pages/
│   ├── background/
│   └── build.js
|
├── Tests/
│   ├── config/
│   │   └── chromium.ts
│   └── tests/
│       |── pages.spec.ts
|       └── ControlButtons.spec.ts
|
└── website/
```

# 🚀 Tech Stack

- ⚛️ React (v19)
- 🎨 Tailwind CSS
- 🔧 ShadcnUI Components
- 📊 React-Mosaic
- 🌐 Manifest V3

## 🪪 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [VirusTotal](https://www.virustotal.com/)
- [WhoIs](https://whois.com/)

## Contributors

- [Ahmed Hanye](https://www.linkedin.com/in/ahmed-hanye)
