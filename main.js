/**
 * AI Face Lab - Main Logic
 */

// 모델 설정
const MODELS = {
    'view-animal': {
        url: "https://teachablemachine.withgoogle.com/models/hZHASOkPE/",
        title: "동물상 테스트",
        subtitle: "나와 가장 닮은 동물의 특징을 찾아보세요",
        descriptions: {
            "dog": {
                "title": "강아지상",
                "main": "다정하고 온순한 매력의 소유자! 상대방을 편안하게 해주는 선한 눈매와 밝은 미소가 특징입니다.",
                "features": [
                    { "title": "친화력 깡패", "text": "상대가 먼저 다가오면 무장해제되는 속도가 매우 빠릅니다." },
                    { "title": "평화주의자", "text": "논쟁보다는 대화와 타협을 선호하는 '둥글둥글한' 성격이 많습니다." }
                ]
            },
            "cat": {
                "title": "고양이상",
                "main": "도도하면서도 신비로운 매력! 알면 알수록 깊은 매력을 가진 츤데레 타입입니다.",
                "features": [
                    { "title": "독립적인 성향", "text": "혼자만의 시간을 소중히 여기며 자신만의 세계가 뚜렷합니다." },
                    { "title": "예민한 직관", "text": "분위기 파악이 빠르고 직관력이 뛰어나 호불호가 확실합니다." }
                ]
            },
            "rabbit": {
                "title": "토끼상",
                "main": "상큼하고 발랄한 에너지! 맑고 깨끗한 느낌의 첫인상으로 주변을 화사하게 만듭니다.",
                "features": [
                    { "title": "비타민 같은 존재", "text": "특유의 밝은 에너지로 모임의 분위기 메이커 역할을 합니다." },
                    { "title": "호기심 천국", "text": "새로운 것에 대한 호기심이 많고 배우는 것을 즐깁니다." }
                ]
            },
            "dino": {
                "title": "공룡상",
                "main": "카리스마 넘치는 듬직한 매력! 뚜렷한 이목구비로 강렬한 신뢰감을 줍니다.",
                "features": [
                    { "title": "외강내유", "text": "무뚝뚝해 보이지만 친해지면 누구보다 따뜻하고 속이 깊습니다." },
                    { "title": "추진력 대장", "text": "목표를 정하면 앞만 보고 달려가는 추진력이 뛰어납니다." }
                ]
            },
            "bear": {
                "title": "곰상",
                "main": "포근하고 듬직한 매력! 보는 것만으로도 안정감을 주는 넉넉한 마음씨의 소유자입니다.",
                "features": [
                    { "title": "인내심 끝판왕", "text": "어떤 상황에서도 평정심을 잘 유지하며 묵묵히 자리를 지킵니다." },
                    { "title": "따뜻한 포용력", "text": "고민을 잘 들어주고 공감해주며 넓은 마음으로 타인을 포용합니다." }
                ]
            }
        }
    },
    'view-king': {
        url: "https://teachablemachine.withgoogle.com/models/p-L_fVwV6/", 
        title: "왕이 될 상인가",
        subtitle: "당신의 얼굴에 숨겨진 천부적인 운명을 분석합니다",
        descriptions: {
            "king": {
                "title": "왕의 재목",
                "main": "천성이 인자하고 백성을 사랑할 줄 아는 성군이 될 상입니다. 덕으로 사람을 다스리니 따르는 자가 끊이지 않습니다.",
                "features": [
                    { "title": "포용의 리더십", "text": "적조차 내 편으로 만드는 압도적인 덕망을 가졌습니다." },
                    { "title": "천운의 소유자", "text": "어려운 고비마다 귀인이 나타나 돕는 하늘이 내린 운명입니다." }
                ]
            },
            "traitor": {
                "title": "역모의 상",
                "main": "야망이 크고 눈빛이 매서워 남의 밑에 있지 못할 상입니다. 스스로 새로운 판을 짜려는 강한 에너지를 가졌습니다.",
                "features": [
                    { "title": "강력한 야심", "text": "세상의 질서를 뒤엎고 자신만의 세계를 구축하려는 의지가 강합니다." },
                    { "title": "불굴의 카리스마", "text": "상대를 압도하는 기운으로 사람들을 휘어잡는 능력이 탁월합니다." }
                ]
            },
            "wealthy": {
                "title": "부귀영화상",
                "main": "평생 먹을 복이 끊이지 않고 재물이 모이는 상입니다. 인복이 많아 주변 사람들의 도움으로 큰 부를 이룹니다.",
                "features": [
                    { "title": "황금빛 재물운", "text": "손을 대는 일마다 번창하며 재산이 마르지 않는 복을 가졌습니다." },
                    { "title": "원만한 대인관계", "text": "사람들을 편안하게 해주는 매력으로 귀중한 인연을 많이 맺습니다." }
                ]
            },
            "scholar": {
                "title": "고결한 선비상",
                "main": "학문과 도리에 밝고 명예를 소중히 여기는 상입니다. 청렴결백한 성품으로 많은 이들의 존경을 받습니다.",
                "features": [
                    { "title": "예리한 지성", "text": "사물의 이치를 꿰뚫어 보고 진리를 탐구하는 능력이 뛰어납니다." },
                    { "title": "흔들림 없는 절개", "text": "어떠한 유혹에도 굴하지 않고 자신의 신념을 지키는 강직함이 있습니다." }
                ]
            },
            "general": {
                "title": "용맹한 장군감",
                "main": "호랑이 같은 기개와 용맹함을 갖춘 상입니다. 한 나라를 지탱하는 든든한 대들보 역할을 수행할 운명입니다.",
                "features": [
                    { "title": "불굴의 투지", "text": "어떠한 역경에도 굴하지 않고 목표를 쟁취하는 강한 정신력을 가졌습니다." },
                    { "title": "압도적 통솔력", "text": "눈빛만으로도 상대를 제압하고 무리를 이끄는 강력한 기운이 있습니다." }
                ]
            }
        }
    }
};

let currentView = 'view-home';
let currentModelInfo = null;
let model = null;

// DOM Elements
const views = {
    home: document.getElementById('view-home'),
    test: document.getElementById('view-test')
};

const testTitle = document.getElementById('test-title');
const testSubtitle = document.getElementById('test-subtitle');
const fileInput = document.getElementById('file-input');
const btnUpload = document.getElementById('btn-upload');
const uploadWrapper = document.getElementById('upload-container');
const imagePreview = document.getElementById('image-preview');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const loadingOverlay = document.getElementById('loading-overlay');
const labelContainer = document.getElementById('label-container');
const actionBar = document.getElementById('action-bar');
const btnReset = document.getElementById('btn-reset');
const btnShare = document.getElementById('btn-share');

/**
 * 뷰 전환 로직
 */
const app = {
    switchView: async function(viewId) {
        currentView = viewId;
        currentModelInfo = MODELS[viewId];
        
        // UI 설정
        testTitle.textContent = currentModelInfo.title;
        testSubtitle.textContent = currentModelInfo.subtitle;
        
        // 화면 전환
        views.home.classList.remove('active');
        views.test.classList.add('active');
        
        // 모델 미리 로드
        await this.loadModel();
    },

    goHome: function() {
        views.test.classList.remove('active');
        views.home.classList.add('active');
        this.resetTest();
    },

    loadModel: async function() {
        if (!currentModelInfo) return;
        loadingOverlay.style.display = 'flex';
        try {
            model = await tmImage.load(
                currentModelInfo.url + "model.json", 
                currentModelInfo.url + "metadata.json"
            );
            console.log("Model loaded for", currentView);
        } catch (e) {
            console.error("Model load failed", e);
            alert("모델 로딩 중 오류가 발생했습니다.");
        } finally {
            loadingOverlay.style.display = 'none';
        }
    },

    resetTest: function() {
        labelContainer.innerHTML = '';
        actionBar.style.display = 'none';
        imagePreview.style.display = 'none';
        imagePreview.src = '';
        uploadPlaceholder.style.display = 'flex';
        fileInput.value = '';
    }
};

// 전역 등록 (HTML에서 호출 가능하도록)
window.app = app;

/**
 * 예측 로직
 */
async function predict(imageElement) {
    if (!model) await app.loadModel();
    
    const prediction = await model.predict(imageElement);
    prediction.sort((a, b) => b.probability - a.probability);

    labelContainer.innerHTML = '';

    prediction.forEach((p, index) => {
        const prob = (p.probability * 100).toFixed(0);
        if (prob < 1) return;

        const className = p.className.toLowerCase();
        const desc = currentModelInfo.descriptions[className] || {
            title: p.className,
            main: "당신의 운명은...",
            features: []
        };

        const card = document.createElement('div');
        card.className = `result-card ${index === 0 ? 'top-match' : ''}`;
        
        let featuresHtml = desc.features.map(f => `
            <div class="description-item">
                <span class="item-title">${f.title}</span>
                <p class="item-text">${f.text}</p>
            </div>
        `).join('');

        card.innerHTML = `
            <div class="result-header">
                <h2 class="result-title">${desc.title}</h2>
                <p class="result-percentage">${prob}%</p>
            </div>
            <div class="result-description">
                <p class="description-main">${desc.main}</p>
                <div class="description-list">${featuresHtml}</div>
            </div>
        `;
        labelContainer.appendChild(card);
    });

    actionBar.style.display = 'flex';
}

/**
 * 이벤트 리스너
 */
btnUpload.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadPlaceholder.style.display = 'none';
            imagePreview.onload = () => predict(imagePreview);
        };
        reader.readAsDataURL(file);
    }
});

btnReset.addEventListener('click', () => app.resetTest());
btnShare.addEventListener('click', async () => {
    const url = window.location.href;
    if (navigator.share) {
        await navigator.share({ title: 'AI 페이스 랩', text: '결과를 확인해보세요!', url });
    } else {
        await navigator.clipboard.writeText(url);
        alert('링크가 복사되었습니다!');
    }
});

// 드래그 앤 드롭
uploadWrapper.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadWrapper.classList.add('dragover');
});
uploadWrapper.addEventListener('dragleave', () => uploadWrapper.classList.remove('dragover'));
uploadWrapper.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadWrapper.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
    }
});
