# Security Plus: Extension

- [Security Plus: Extension](#security-plus-extension)
  - [Introduction](#introduction)
  - [Usage](#usage)

## Introduction

This extension's source code includes both background and page-specific components. A build script (`build.js`) automates the compilation process, generating unpacked extension folders compatible with Firefox and chromium browsers.

## Usage

1. Clone the repository.
2. Navigate to `Extension` directory.
3. Run the build script.
```bash
  node build.js
```
4. Load the extension in your browser by following the instructions below:
    - **Firefox**: Open `about:debugging`, click `This Firefox`, then `Load Temporary Add-on`. Select any file in the extension's directory.
    - **Chrome**: Open `chrome://extensions`, enable `Developer mode`, then click `Load unpacked`. Select the extension's directory.
