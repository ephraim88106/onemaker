# Project Blueprint: AI Face Lab (Multi-Test Platform)

## Overview
A comprehensive web-based AI face analysis platform. Users can choose between different specialized tests, starting with "Animal Face Test" and "King of Face (Physiognomy) Test". Built with a modular view system and premium aesthetic.

## Features & Design
- **Navigation System:** A main home screen to select between available AI tests.
- **Multi-Test Support:** 
  - **Animal Face Test:** Analysis of facial features compared to animal types.
  - **King of Face Test:** Traditional physiognomy analysis using a specialized Teachable Machine model.
- **Modular Architecture:** Unified upload and result display logic that adapts based on the selected test.
- **Community & Sharing:** 
  - Integrated Disqus comment system.
  - Social sharing functionality (Web Share API with Clipboard fallback).
  - Reset functionality to restart tests easily.
- **Premium UI/UX:** 
  - Multi-view navigation with smooth transitions.
  - Glassmorphism effects and custom background support.
  - Responsive design optimized for both mobile and desktop.

## Implementation Details
- **`index.html`:** Implements a view-switching structure (`view-home`, `view-test`).
- **`style.css`:** Defined styles for menu cards, view transitions, and specialized result highlights. Supports full-screen background images with readability overlays.
- **`main.js`:** 
  - Centralized `MODELS` configuration for easy expansion of new tests.
  - Dynamic model loading and prediction logic.
  - Comprehensive trait mapping for each test type (Animal labels vs. Gwan-sang labels).

## Current Steps (Completed)
1.  **Multi-Test Expansion:** Rebuilt the app into a platform called "AI Face Lab".
2.  **Navigation Implementation:** Added a home screen with menu cards for test selection.
3.  **Physiognomy Model Integration:** Applied a new specialized model (`p-L_fVwV6`) for the "King of Face" test.
4.  **Utility Features:** Added "Reset" and "Share" buttons to the results area.
5.  **Visual Overhaul:** Implemented a full-screen background image (`background.jpg`) with fixed attachment and noise texture.
