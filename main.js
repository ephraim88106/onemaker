/**
 * Animal Face AI - Main Logic
 * Uses Teachable Machine Image Model with Image Upload
 */

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/hZHASOkPE/";

const ANIMAL_DESCRIPTIONS = {
    "dog": {
        "title": "강아지상",
        "main": "다정하고 온순한 매력의 소유자! 상대방을 편안하게 해주는 선한 눈매와 밝은 미소가 특징입니다. 강아지상을 가진 분들은 주로 '외유내강'보다는 '외유내유'하거나, 겉으로 보이는 다정함 속에 섬세한 감수성을 숨기고 있는 경우가 많습니다.",
        "features": [
            { "title": "친화력 깡패", "text": "낯가림이 있어도 상대가 먼저 다가오면 무장해제되는 속도가 매우 빠릅니다." },
            { "title": "평화주의자", "text": "싸움이나 논쟁보다는 대화와 타협을 선호하는 '둥글둥글한' 성격이 많습니다." },
            { "title": "애정 갈구형", "text": "강아지가 주인의 사랑을 원하듯, 주변 사람들에게 인정받고 사랑받을 때 최고의 능력을 발휘합니다." }
        ]
    },
    "cat": {
        "title": "고양이상",
        "main": "도도하면서도 신비로운 매력! 가끔은 차가워 보일 수 있지만 알면 알수록 깊은 매력을 가진 타입입니다. 깔끔하고 세련된 인상 뒤에 따뜻한 반전 매력을 숨기고 있습니다.",
        "features": [
            { "title": "츤데레의 정석", "text": "겉으로는 무심해 보여도 속으로는 주변 사람들을 세심하게 챙기는 츤데레 매력이 있습니다." },
            { "title": "독립적인 성향", "text": "혼자만의 시간을 소중히 여기며, 자신만의 세계가 뚜렷하고 주관이 강합니다." },
            { "title": "예민한 직관", "text": "분위기 파악이 빠르고 직관력이 뛰어나며, 호불호가 확실한 편입니다." }
        ]
    },
    "rabbit": {
        "title": "토끼상",
        "main": "보는 사람마저 기분 좋게 만드는 상큼함! 귀엽고 발랄한 이미지로 주변에 긍정적인 에너지를 전파합니다. 맑고 깨끗한 느낌의 첫인상을 주는 경우가 많습니다.",
        "features": [
            { "title": "비타민 같은 존재", "text": "특유의 밝은 에너지로 모임의 분위기를 화사하게 만드는 분위기 메이커입니다." },
            { "title": "보호본능 자극", "text": "연약해 보일 수 있지만 내면은 의외로 단단하며, 사람들의 보호본능을 자극하는 매력이 있습니다." },
            { "title": "호기심 천국", "text": "새로운 것에 대한 호기심이 많고 배우는 것을 즐기며, 활발하게 움직이는 것을 좋아합니다." }
        ]
    },
    "dino": {
        "title": "공룡상",
        "main": "강렬하고 카리스마 넘치는 매력! 뚜렷한 이목구비와 선이 굵은 외모로 듬직한 신뢰감을 줍니다. 무심한 듯 시크한 매력이 주변 사람들을 끌어당깁니다.",
        "features": [
            { "title": "외강내유", "text": "겉모습은 강해 보이고 무뚝뚝해 보일 수 있지만, 친해지면 누구보다 따뜻하고 속이 깊습니다." },
            { "title": "추진력 대장", "text": "한번 목표를 정하면 앞만 보고 달려가는 추진력이 뛰어나며 리더십이 있는 경우가 많습니다." },
            { "title": "묵묵한 의리파", "text": "말보다는 행동으로 보여주는 타입으로, 주변 사람들에게 든든한 버팀목이 되어줍니다." }
        ]
    },
    "bear": {
        "title": "곰상",
        "main": "포근하고 듬직한 매력! 보는 것만으로도 안정감을 주는 넉넉한 마음씨의 소유자입니다. 편안하고 신뢰감 있는 인상으로 사람들에게 안식처가 되어줍니다.",
        "features": [
            { "title": "인내심 끝판왕", "text": "어떤 상황에서도 평정심을 잘 유지하며 묵묵히 자신의 자리를 지키는 인내심이 강합니다." },
            { "title": "따뜻한 포용력", "text": "주변 사람들의 고민을 잘 들어주고 공감해주며, 넓은 마음으로 타인을 포용합니다." },
            { "title": "성실함의 대명사", "text": "요령을 피우기보다 정직하고 성실하게 노력하며, 꾸준함으로 승부하는 타입입니다." }
        ]
    }
};

let model, maxPredictions;

// DOM Elements
const fileInput = document.getElementById('file-input');
const btnUpload = document.getElementById('btn-upload');
const uploadWrapper = document.getElementById('upload-container');
const imagePreview = document.getElementById('image-preview');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const loadingOverlay = document.getElementById('loading-overlay');

// Result Elements
const resultCard = document.getElementById('result-card');
const resultTitle = document.getElementById('result-title');
const resultPercentage = document.getElementById('result-percentage');
const descriptionMain = document.getElementById('description-main');
const descriptionList = document.getElementById('description-list');

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

    // Hide previous result
    resultCard.style.display = 'none';

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
    
    // Find the highest probability prediction
    let topPrediction = prediction[0];
    for (let i = 1; i < prediction.length; i++) {
        if (prediction[i].probability > topPrediction.probability) {
            topPrediction = prediction[i];
        }
    }

    const className = topPrediction.className.toLowerCase();
    const probability = (topPrediction.probability * 100).toFixed(0);
    
    // Get description or fallback
    const desc = ANIMAL_DESCRIPTIONS[className] || {
        "title": `${topPrediction.className}상`,
        "main": `당신은 ${topPrediction.className}상입니다!`,
        "features": []
    };

    // Update UI
    resultTitle.textContent = `${desc.title}이시네요.`;
    resultPercentage.textContent = `일치율: ${probability}%`;
    descriptionMain.textContent = desc.main;
    
    // Clear and build feature list
    descriptionList.innerHTML = '';
    desc.features.forEach(feature => {
        const item = document.createElement('div');
        item.className = 'description-item';
        item.innerHTML = `
            <span class="item-title">${feature.title}</span>
            <p class="item-text">${feature.text}</p>
        `;
        descriptionList.appendChild(item);
    });

    // Show result card
    resultCard.style.display = 'flex';
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

// Initial call to load model
init();
