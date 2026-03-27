# Project Blueprint: AI Animal Face Test (Image Upload Version)

## Overview
A web-based application that analyzes a user's uploaded photo to determine their "animal face type" using a Teachable Machine AI model. Built with modern web standards and a premium aesthetic.

## Features & Design
- **AI Integration:** Uses Teachable Machine Image Model.
- **Image Upload:** Supports file selection and drag-and-drop.
- **Real-time Feedback:** Shows a loading overlay during analysis and instant result updates.
- **Detailed Results:** 
  - Shows only the most relevant animal type (top prediction).
  - Provides a character-based description for each animal (Dog, Cat, Rabbit, Fox/Dino, Bear).
  - Visualizes the match percentage.
- **Community Engagement:** Integrated Disqus comment system for user feedback and interaction.
- **Modern UI:** 
  - Glassmorphism effects (blur, semi-transparent surfaces).
  - Premium result card with expressive typography and structured feature lists.
  - Responsive design using Container Queries.
  - Subtle noise texture for a premium feel.
- **Technology Stack:** Pure HTML, CSS (Modern Baseline), and JavaScript (ES Modules).

## Implementation Details
- **`index.html`:** Structured with a dedicated upload area, a dynamic result card section, and a Disqus thread container.
- **`style.css`:** Implements `oklch` color functions, `@container` queries, and CSS variables for a consistent theme. Includes specific styles for the `result-card` and `comments-area`.
- **`main.js`:** 
  - Loads the Teachable Machine model asynchronously.
  - Handles file reading via `FileReader` API.
  - Triggers model prediction on the previewed image.
  - Contains a comprehensive mapping of animal types to detailed Korean descriptions and character traits.
  - Dynamically updates the DOM with the top result and its associated features.

## Current Steps (Completed)
1.  **Replaced Webcam Logic:** Switched from live video stream to image upload functionality.
2.  **UI Enhancements:** Added a clear upload placeholder with icon and drag-and-drop support.
3.  **Loading State:** Implemented a loading overlay to provide feedback during AI processing.
4.  **Result Display Overhaul:** 
    - Replaced individual probability bars with a single, detailed result card.
    - Added custom descriptions for Dog, Cat, Rabbit, Dino, and Bear types.
    - Updated `predict` logic to identify the top match and display its specific traits.
5.  **Social Integration:** Added Disqus comment system below the results area.
