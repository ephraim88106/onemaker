# Project Blueprint: AI Animal Face Test (Image Upload Version)

## Overview
A web-based application that analyzes a user's uploaded photo to determine their "animal face type" using a Teachable Machine AI model. Built with modern web standards and a premium aesthetic.

## Features & Design
- **AI Integration:** Uses Teachable Machine Image Model.
- **Image Upload:** Supports file selection and drag-and-drop.
- **Real-time Feedback:** Shows a loading overlay during analysis and instant result updates.
- **Modern UI:** 
  - Glassmorphism effects (blur, semi-transparent surfaces).
  - Custom progress bars for probability visualization.
  - Responsive design using Container Queries.
  - Dynamic highlighting for top results.
  - Subtle noise texture for a premium feel.
- **Technology Stack:** Pure HTML, CSS (Modern Baseline), and JavaScript (ES Modules).

## Implementation Details
- **`index.html`:** Structured with a dedicated upload area and results section.
- **`style.css`:** Implements `oklch` color functions, `@container` queries, and CSS variables for a consistent theme.
- **`main.js`:** 
  - Loads the Teachable Machine model asynchronously.
  - Handles file reading via `FileReader` API.
  - Triggers model prediction on the previewed image.
  - Dynamically updates the DOM with result bars.

## Current Steps (Completed)
1.  **Replaced Webcam Logic:** Switched from live video stream to image upload functionality.
2.  **UI Enhancements:** Added a clear upload placeholder with icon and drag-and-drop support.
3.  **Loading State:** Implemented a loading overlay to provide feedback during AI processing.
4.  **Prediction Logic Update:** Modified the prediction function to work with static images instead of canvas frames.
