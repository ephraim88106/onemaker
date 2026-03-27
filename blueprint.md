# Project Blueprint: AI Face Lab (Multi-Test Platform)

## Overview
A comprehensive web-based AI face analysis platform. Users can choose between different specialized tests, starting with "Animal Face Test" and "King of Face (Physiognomy) Test". Built with a modular view system and a premium, high-tech aesthetic.

## Features & Design
- **Navigation System:** A main home screen to select between available AI tests with enhanced glassmorphism cards.
- **Multi-Test Support:** 
  - **Animal Face Test:** Analysis of facial features compared to animal types with detailed traits.
  - **King of Face Test:** Traditional physiognomy analysis using a specialized Teachable Machine model (`p-L_fVwV6`).
- **Premium UI/UX:** 
  - **Visual Scanning:** Immersive laser scanner line animation during AI analysis.
  - **Advanced Glassmorphism:** Deep translucent surfaces with neon glow effects, radial gradients, and backdrop blur.
  - **Smooth Animations:** Sequential fade-in animations for results and fluid view transitions.
- **Modular Architecture:** Unified upload and result display logic that adapts based on the selected test.
- **Community & Sharing:** 
  - Integrated Disqus comment system.
  - Social sharing functionality (Web Share API with Clipboard fallback).
  - Reset functionality to restart tests easily.

## Implementation Details
- **`index.html`:** Implements a view-switching structure and interactive upload area with scanner elements.
- **`style.css`:** Advanced CSS using `oklch` colors, radial gradients, and complex animations (`scan`, `viewIn`, `cardIn`). Responsive design with container queries.
- **`main.js`:** 
  - Centralized `MODELS` configuration.
  - Robust model loading with URL normalization and error handling.
  - Improved result matching logic (case-insensitive, whitespace-trimmed).
  - Controlled delays for better UX during the analysis phase.

## Current Steps (Completed)
1.  **Premium Design Overhaul:** Applied high-end visual styles including scanning effects and enhanced glassmorphism.
2.  **Stability Fixes:** Resolved potential model loading issues and result label mismatching.
3.  **Multi-Test Expansion:** Rebuilt the app into a platform called "AI Face Lab" with navigation.
4.  **Utility Features:** Integrated "Reset", "Share", and Disqus comments.
5.  **Visual Polish:** Implemented full-screen background image support with readability overlays and noise texture.
