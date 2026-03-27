# Animal Face Test - Project Blueprint

## Overview
A modern, AI-powered web application that identifies a user's "animal face" type using a Google Teachable Machine model. The app provides a premium, interactive experience with real-time feedback and a polished UI.

## Features & Design
- **AI Integration:** Real-time face analysis using TensorFlow.js and Teachable Machine.
- **Modern UI:** 
  - Soft dark theme using `oklch` color space.
  - Subtle noise texture background for a premium feel.
  - Glassmorphism effects for the webcam container.
  - Multi-layered drop shadows for depth.
- **Responsiveness:** Fully mobile-responsive design using container queries and logical properties.
- **Interactivity:** Smooth transitions, hover effects with "glow" shadows, and clear state indicators.
- **Accessibility:** Semantic HTML, ARIA labels, and high-contrast color palette.

## Technical Details
- **Framework-less:** Pure HTML, CSS, and JavaScript.
- **Web Standards:** 
  - ES Modules for clean logic separation.
  - CSS Variables for consistent theming.
  - Modern CSS features: `@container`, `:has()`, `oklch()`.
- **Model URL:** `https://teachablemachine.withgoogle.com/models/hZHASOkPE/`

## Execution Plan
1. [x] **Structure:** Update `index.html` with semantic tags and library links.
2. [x] **Style:** Implement a premium CSS design in `style.css`.
3. [x] **Logic:** Implement Teachable Machine initialization and prediction in `main.js`.
4. [x] **Validation:** Verify webcam access and prediction accuracy in the preview.
