/**
 * Animal Face AI - Main Logic
 * Uses Teachable Machine Image Model
 */

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/hZHASOkPE/";

let model, webcam, labelContainer, maxPredictions;

/**
 * Initialize the application
 */
async function init() {
    const startBtn = document.getElementById('btn-start');
    const webcamWrapper = document.getElementById('webcam-container');
    
    startBtn.disabled = true;
    startBtn.textContent = '로딩 중...';

    try {
        const modelURL = MODEL_URL + "model.json";
        const metadataURL = MODEL_URL + "metadata.json";

        // Load the model and metadata
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Setup webcam
        const flip = true;
        webcam = new tmImage.Webcam(400, 400, flip);
        await webcam.setup();
        await webcam.play();
        
        // Remove placeholder and add webcam canvas
        webcamWrapper.innerHTML = '';
        webcamWrapper.appendChild(webcam.canvas);
        
        // Setup label container
        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = ''; // Clear previous
        
        for (let i = 0; i < maxPredictions; i++) {
            const resultItem = createResultItem(model.getClassLabels()[i]);
            labelContainer.appendChild(resultItem);
        }

        window.requestAnimationFrame(loop);
    } catch (error) {
        console.error("Initialization failed:", error);
        startBtn.disabled = false;
        startBtn.textContent = '다시 시도하기';
        alert("카메라 권한이 필요하거나 모델을 불러오는 데 실패했습니다.");
    }
}

/**
 * Main animation loop
 */
async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

/**
 * Run prediction and update UI
 */
async function predict() {
    const prediction = await model.predict(webcam.canvas);
    
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
document.getElementById('btn-start').addEventListener('click', init);
