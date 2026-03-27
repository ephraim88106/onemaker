/**
 * AI Face Lab - Premium Logic (Stability & Design Update)
 */

const MODELS = {
    'view-animal': {
        url: "https://teachablemachine.withgoogle.com/models/hZHASOkPE/",
        title: "동물상 테스트",
        subtitle: "나와 가장 닮은 동물의 특징을 찾아보세요",
        descriptions: {
            "강아지": {
                "title": "강아지상",
                "main": "다정하고 온순한 매력의 소유자! 상대방을 편안하게 해주는 선한 눈매와 밝은 미소가 특징입니다.",
                "features": [
                    { "title": "친화력 깡패", "text": "상대가 먼저 다가오면 무장해제되는 속도가 매우 빠릅니다." },
                    { "title": "평화주의자", "text": "논쟁보다는 대화와 타협을 선호하는 '둥글둥글한' 성격이 많습니다." }
                ]
            },
            "고양이": {
                "title": "고양이상",
                "main": "도도하면서도 신비로운 매력! 알면 알수록 깊은 매력을 가진 츤데레 타입입니다.",
                "features": [
                    { "title": "독립적인 성향", "text": "혼자만의 시간을 소중히 여기며 자신만의 세계가 뚜렷합니다." },
                    { "title": "예민한 직관", "text": "분위기 파악이 빠르고 직관력이 뛰어나 호불호가 확실합니다." }
                ]
            },
            "토끼": {
                "title": "토끼상",
                "main": "상큼하고 발랄한 에너지! 맑고 깨끗한 느낌의 첫인상으로 주변을 화사하게 만듭니다.",
                "features": [
                    { "title": "비타민 같은 존재", "text": "특유의 밝은 에너지로 모임의 분위기를 화사하게 만듭니다." },
                    { "title": "호기심 천국", "text": "새로운 것에 대한 호기심이 많고 배우는 것을 즐깁니다." }
                ]
            },
            "공룡": {
                "title": "공룡상",
                "main": "카리스마 넘치는 듬직한 매력! 뚜렷한 이목구비로 강렬한 신뢰감을 줍니다.",
                "features": [
                    { "title": "외강내유", "text": "무뚝뚝해 보이지만 친해지면 누구보다 따뜻하고 속이 깊습니다." },
                    { "title": "추진력 대장", "text": "목표를 정하면 앞만 보고 달려가는 추진력이 뛰어납니다." }
                ]
            },
            "곰": {
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
            "king": { "title": "왕의 재목", "main": "천성이 인자하고 백성을 사랑할 줄 아는 성군이 될 상입니다.", "features": [{ "title": "포용의 리더십", "text": "압도적인 덕망을 가졌습니다." }] },
            "traitor": { "title": "역모의 상", "main": "야망이 크고 눈빛이 매서워 남의 밑에 있지 못할 상입니다.", "features": [{ "title": "불굴의 카리스마", "text": "판을 뒤엎는 강한 에너지를 가졌습니다." }] },
            "wealthy": { "title": "부귀영화상", "main": "평생 재물이 마르지 않고 풍족한 삶을 누릴 상입니다.", "features": [{ "title": "황금빛 재물운", "text": "인복이 많아 주변의 도움을 많이 받습니다." }] },
            "scholar": { "title": "고결한 선비상", "main": "학문과 명예를 중시하며 청렴결백한 성품을 지닌 상입니다.", "features": [{ "title": "예리한 지성", "text": "사물의 이치를 꿰뚫어 보는 눈이 밝습니다." }] },
            "general": { "title": "용맹한 장군감", "main": "기개가 높고 용맹하여 무리를 이끄는 지도자 상입니다.", "features": [{ "title": "압도적 통솔력", "text": "어떠한 역경도 뚫고 나가는 투지가 있습니다." }] },
            // 한글 레이블 대응 추가
            "왕": { "title": "왕의 재목", "main": "천성이 인자하고 백성을 사랑할 줄 아는 성군이 될 상입니다.", "features": [{ "title": "포용의 리더십", "text": "압도적인 덕망을 가졌습니다." }] },
            "왕이 될 상": { "title": "왕이 될 상", "main": "곧 큰 기회를 잡아 천하를 호령하게 될 귀한 상입니다.", "features": [{ "title": "천운의 소유자", "text": "하늘이 내린 운명을 타고났습니다." }] },
            "역적": { "title": "역모의 상", "main": "남의 밑에 있지 못할 강한 야심과 카리스마를 가진 상입니다.", "features": [{ "title": "강력한 야심", "text": "스스로 새로운 길을 개척하는 힘이 있습니다." }] }
        }
    }
};

let currentView = 'view-home';
let currentModelInfo = null;
let model = null;

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
const scannerLine = document.getElementById('scanner-line');

const app = {
    switchView: async function(viewId) {
        currentView = viewId;
        currentModelInfo = MODELS[viewId];
        testTitle.textContent = currentModelInfo.title;
        testSubtitle.textContent = currentModelInfo.subtitle;
        views.home.classList.remove('active');
        views.test.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            const baseUrl = currentModelInfo.url.endsWith('/') ? currentModelInfo.url : currentModelInfo.url + '/';
            model = await tmImage.load(baseUrl + "model.json", baseUrl + "metadata.json");
        } catch (e) {
            console.error("Model load failed", e);
            alert("모델 로딩 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            this.goHome();
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
        scannerLine.style.display = 'none';
    }
};

window.app = app;

async function predict(imageElement) {
    if (!model) await app.loadModel();
    scannerLine.style.display = 'block';
    
    try {
        const prediction = await model.predict(imageElement);
        await new Promise(resolve => setTimeout(resolve, 1500));
        prediction.sort((a, b) => b.probability - a.probability);
        labelContainer.innerHTML = '';

        prediction.forEach((p, index) => {
            const prob = (p.probability * 100).toFixed(0);
            if (prob < 1) return;

            const className = p.className.trim();
            // 레이블 매칭 (한국어/영어 모두 지원)
            const desc = currentModelInfo.descriptions[className] || 
                         currentModelInfo.descriptions[className.toLowerCase()] || {
                title: className,
                main: "당신은 아주 특별한 매력을 가지고 있습니다!",
                features: []
            };

            const card = document.createElement('div');
            card.className = `result-card ${index === 0 ? 'top-match' : ''}`;
            card.style.animationDelay = `${index * 0.1}s`;
            
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
        labelContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
        alert("이미지 분석 중 오류가 발생했습니다.");
    } finally {
        scannerLine.style.display = 'none';
    }
}

btnUpload.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
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

btnReset.addEventListener('click', () => { app.resetTest(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
btnShare.addEventListener('click', async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: 'AI 페이스 랩', text: '내 결과를 확인해봐!', url });
    else { await navigator.clipboard.writeText(url); alert('링크가 복사되었습니다!'); }
});

uploadWrapper.addEventListener('dragover', (e) => { e.preventDefault(); uploadWrapper.classList.add('dragover'); });
uploadWrapper.addEventListener('dragleave', () => uploadWrapper.classList.remove('dragover'));
uploadWrapper.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadWrapper.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
    }
});
