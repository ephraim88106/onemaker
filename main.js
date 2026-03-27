/**
 * Animal Face AI - Main Logic
 * Uses Teachable Machine Image Model with Image Upload
 */

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/hZHASOkPE/";

let model, labelContainer, maxPredictions;

// DOM Elements
const fileInput = document.getElementById('file-input');
const btnUpload = document.getElementById('btn-upload');
const uploadWrapper = document.getElementById('upload-container');
const imagePreview = document.getElementById('image-preview');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const loadingOverlay = document.getElementById('loading-overlay');

/**
 * Initialize the application and load the model
 */
async function init() {
    try {
        const modelURL = MODEL_URL + "model.json";
        const metadataURL = MODEL_URL + "metadata.json";

        // Load the model and metadata
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Setup label container
        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = ''; // Clear previous
        
        for (let i = 0; i < maxPredictions; i++) {
            const resultItem = createResultItem(model.getClassLabels()[i]);
            labelContainer.appendChild(resultItem);
        }
        
        console.log("Model loaded successfully");
    } catch (error) {
        console.error("Model initialization failed:", error);
        alert("모델을 불러오는 데 실패했습니다.");
    }
}

/**
 * Handle file selection and prediction
 */
async function handleImageUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
    }

    if (!model) {
        await init();
    }

    // Show loading and preview
    loadingOverlay.style.display = 'flex';
    
    const reader = new FileReader();
    reader.onload = async (e) => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
        uploadPlaceholder.style.display = 'none';

        // Wait for image to load to predict
        imagePreview.onload = async () => {
            await predict(imagePreview);
            loadingOverlay.style.display = 'none';
        };
    };
    reader.readAsDataURL(file);
}

/**
 * Run prediction and update UI
 */
async function predict(imageElement) {
    const prediction = await model.predict(imageElement);
    
    // Sort predictions by probability (optional, but current UI expects fixed order)
    // For consistency with previous UI, we'll keep the order from the model
    
    for (let i = 0; i < maxPredictions; i++) {
        const probability = prediction[i].probability.toFixed(2);
        const percentage = (probability * 100).toFixed(0);
        
        const item = labelContainer.childNodes[i];
        const bar = item.querySelector('.probability-bar-fill');
        const value = item.querySelector('.probability-value');
        
        bar.style.width = `${percentage}%`;
        value.textContent = `${percentage}%`;
        
        // Highlight the top prediction
        if (probability > 0.5) {
            item.style.borderColor = 'var(--accent-color)';
            item.style.backgroundColor = 'oklch(25% 0.03 260 / 0.9)';
        } else {
            item.style.borderColor = 'oklch(100% 0 0 / 0.05)';
            item.style.backgroundColor = 'var(--surface-color)';
        }
    }
}

/**
 * Helper to create result DOM elements
 */
function createResultItem(className) {
    const div = document.createElement('div');
    div.className = 'result-item';
    div.innerHTML = `
        <span class="animal-name">${className}</span>
        <div class="probability-bar-bg">
            <div class="probability-bar-fill" style="width: 0%"></div>
        </div>
        <span class="probability-value">0%</span>
    `;
    return div;
}

// Event Listeners
btnUpload.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleImageUpload(e.target.files[0]);
    }
});

// Drag and Drop
uploadWrapper.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadWrapper.classList.add('dragover');
});

uploadWrapper.addEventListener('dragleave', () => {
    uploadWrapper.classList.remove('dragover');
});

uploadWrapper.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadWrapper.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        handleImageUpload(e.dataTransfer.files[0]);
    }
});

// Initial call to load model and setup UI
init();
