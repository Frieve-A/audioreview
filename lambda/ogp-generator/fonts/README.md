# Fonts Directory

This directory should contain the Noto Sans JP font file for Japanese text rendering.

## Required Font File
- `NotoSansJP-Regular.ttf` - Noto Sans JP Regular font file (TTF format)

## Download Instructions
1. Download Noto Sans JP from Google Fonts: https://fonts.google.com/noto/specimen/Noto+Sans+JP
2. Extract the font file and place `NotoSansJP-Regular.ttf` in this directory
3. The font file is required for proper Japanese text rendering in the OGP images

## Font Registration
The font is automatically registered for both normal and bold weights in `index.js`:
- Normal weight: Used for regular text
- Bold weight: Used for titles and emphasis (same TTF file registered twice)

## Alternative Fonts
If Noto Sans JP is not available, the system will fall back to:
- Hiragino Sans
- Yu Gothic Medium
- Yu Gothic
- Meiryo
- MS Gothic
- Arial

The fallback chain is configured in `drawing.js` for optimal Japanese text rendering. 