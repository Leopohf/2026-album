# Data Extraction System

This tool allows for the automatic extraction of sticker information from physical album photos using Gemini Vision API.

## Project Structure
Located at `@raw/info-extraction-script/`.

- `extract-stickers.js`: The main Node.js script that processes images in `@raw/images/`.
- `package.json`: Project dependencies and configuration.

## Setup

1. **Install Dependencies**:
   ```bash
   cd raw/info-extraction-script
   pnpm install
   ```

2. **Configure API Key**:
   Set your Google Gemini API Key in your environment:
   ```bash
   export GEMINI_API_KEY="your-api-key-here"
   ```

## Usage

Run the script to process all images in the `raw/images/` directory:

```bash
pnpm start
```

The script will:
1. Scan for `.heic`, `.jpg`, and `.png` files in `raw/images/`.
2. Send each image to Gemini 1.5 Flash for analysis.
3. Extract stickers (both owned and missing slots) following the `Sticker` model schema.
4. Consolidate all data into `raw/info-extraction-script/extracted_stickers.json`.

## Technical Details
- **Model**: `gemini-1.5-flash` for high speed and reliable vision capabilities.
- **Package**: `@google/generative-ai` (Official SDK).
- **Manager**: `pnpm` (Project standard).
- **Rate Limiting**: Includes a 2-second delay between images to respect API limits.
