// EmailJS設定（ユーザーが後で設定）
let EMAILJS_PUBLIC_KEY = '';
let EMAILJS_SERVICE_ID = '';
let EMAILJS_TEMPLATE_ID = '';
let RECIPIENT_EMAIL = '';

// ローカルストレージのキー
const CONFIG_KEY = 'emailjs_config';

// DOM要素
let setupScreen, mainScreen, feedbackOverlay, errorOverlay;
let publicKeyInput, serviceIdInput, templateIdInput, emailInput, saveConfigBtn, settingsBtn;
let messageButtons;

// EmailJSライブラリの読み込み状態
let emailjsLoaded = false;

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    loadEmailJSLibrary();
    initializeElements();
    loadConfig();
    setupEventListeners();
    registerServiceWorker();
});

// EmailJSライブラリを動的に読み込む
function loadEmailJSLibrary() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
        emailjsLoaded = true;
        initEmailJS();
    };
    script.onerror = () => {
        console.error('Failed to load EmailJS library');
    };
    document.head.appendChild(script);
}

// DOM要素の取得
function initializeElements() {
    setupScreen = document.getElementById('setup-screen');
    mainScreen = document.getElementById('main-screen');
    feedbackOverlay = document.getElementById('feedback-overlay');
    errorOverlay = document.getElementById('error-overlay');
    
    publicKeyInput = document.getElementById('public-key-input');
    serviceIdInput = document.getElementById('service-id-input');
    templateIdInput = document.getElementById('template-id-input');
    emailInput = document.getElementById('email-input');
    saveConfigBtn = document.getElementById('save-config-btn');
    settingsBtn = document.getElementById('settings-btn');
    
    messageButtons = document.querySelectorAll('.message-btn');
}

// 設定の読み込み
function loadConfig() {
    const savedConfig = localStorage.getItem(CONFIG_KEY);
    
    if (savedConfig) {
        try {
            const config = JSON.parse(savedConfig);
            EMAILJS_PUBLIC_KEY = config.publicKey || '';
            EMAILJS_SERVICE_ID = config.serviceId || '';
            EMAILJS_TEMPLATE_ID = config.templateId || '';
            RECIPIENT_EMAIL = config.email || '';
            
            initEmailJS();
            showMainScreen();
        } catch (error) {
            console.error('Error parsing config:', error);
            showSetupScreen();
        }
    } else {
        showSetupScreen();
    }
}

// EmailJSの初期化（ライブラリ読み込み待機）
function initEmailJS() {
    if (emailjsLoaded && window.emailjs && EMAILJS_PUBLIC_KEY) {
        try {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        } catch (error) {
            console.error('Error initializing EmailJS:', error);
        }
    } else if (EMAILJS_PUBLIC_KEY) {
        setTimeout(initEmailJS, 100);
    }
}

// イベントリスナーの設定
function setupEventListeners() {
    if (!saveConfigBtn) {
        console.error('saveConfigBtn not found!');
        return;
    }
    
    // 設定保存ボタン
    saveConfigBtn.addEventListener('click', saveConfig);
    
    // Enterキーで設定保存
    if (emailInput) {
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveConfig();
            }
        });
    }
    
    // 設定ボタン
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            const confirmResult = window.confirm('設定画面に戻りますか？\n（設定を再設定できます）');
            if (confirmResult) {
                showSetupScreen();
            }
        });
    }
    
    // メッセージボタン（長押し対応）
    messageButtons.forEach(button => {
        let touchStartTime = 0;
        let isTouchDevice = false;
        
        // タッチ開始
        button.addEventListener('touchstart', (e) => {
            isTouchDevice = true;
            touchStartTime = Date.now();
            // 視覚的フィードバック
            button.style.opacity = '0.7';
        }, { passive: true });
        
        // タッチ終了（指を離したタイミング）
        button.addEventListener('touchend', (e) => {
            e.preventDefault(); // clickイベントの発火を防ぐ
            button.style.opacity = '1';
            
            const message = button.getAttribute('data-message');
            sendMessage(message, e);
        });
        
        // タッチキャンセル
        button.addEventListener('touchcancel', (e) => {
            button.style.opacity = '1';
        });
        
        // クリック（マウス用・PCでのテスト用）
        button.addEventListener('click', (e) => {
            // タッチデバイスの場合はclickイベントを無視
            if (isTouchDevice) {
                return;
            }
            const message = button.getAttribute('data-message');
            sendMessage(message, e);
        });
    });
}

// 設定の保存
function saveConfig() {
    const publicKey = publicKeyInput.value.trim();
    const serviceId = serviceIdInput.value.trim();
    const templateId = templateIdInput.value.trim();
    const email = emailInput.value.trim();
    
    if (!publicKey || !serviceId || !templateId || !email) {
        alert('すべての項目を入力してください');
        return;
    }
    
    // メールアドレスの簡易チェック
    if (!email.includes('@')) {
        alert('正しいメールアドレスを入力してください');
        return;
    }
    
    const config = {
        publicKey: publicKey,
        serviceId: serviceId,
        templateId: templateId,
        email: email
    };
    
    try {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
        
        EMAILJS_PUBLIC_KEY = publicKey;
        EMAILJS_SERVICE_ID = serviceId;
        EMAILJS_TEMPLATE_ID = templateId;
        RECIPIENT_EMAIL = email;
        
        initEmailJS();
        
        // 入力フィールドをクリア
        publicKeyInput.value = '';
        serviceIdInput.value = '';
        templateIdInput.value = '';
        emailInput.value = '';
        
        showMainScreen();
        
        // テストメッセージを送信
        setTimeout(() => {
            sendMessage('✅ かんたん連絡アプリの設定が完了しました！');
        }, 500);
    } catch (error) {
        console.error('Error saving config:', error);
        alert('設定の保存に失敗しました: ' + error.message);
    }
}

// メッセージの送信
async function sendMessage(message, event) {
    if (!emailjsLoaded || !window.emailjs) {
        showError('EmailJSライブラリの読み込みに失敗しました。ページを再読み込みしてください。');
        return;
    }
    
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !RECIPIENT_EMAIL) {
        showError('設定が完了していません');
        return;
    }
    
    let clickedButton = null;
    if (event && event.target) {
        clickedButton = event.target.closest('.message-btn');
    }
    
    try {
        // 送信中の視覚的フィードバック
        if (clickedButton) {
            clickedButton.style.opacity = '0.6';
        }
        
        // 現在時刻を追加
        const now = new Date();
        const timeString = now.toLocaleString('ja-JP', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // EmailJSでメール送信
        const templateParams = {
            to_email: RECIPIENT_EMAIL,
            from_name: 'お母様',
            message: message,
            timestamp: timeString
        };
        
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );
        
        if (clickedButton) {
            clickedButton.style.opacity = '1';
        }
        
        if (response.status === 200) {
            showSuccess();
        } else {
            showError('送信に失敗しました。もう一度お試しください。');
        }
    } catch (error) {
        console.error('Send Error:', error);
        
        if (clickedButton) {
            clickedButton.style.opacity = '1';
        }
        
        if (error.text) {
            showError(`送信エラー: ${error.text}`);
        } else {
            showError('ネットワークエラーが発生しました。インターネット接続を確認してください。');
        }
    }
}

// 成功フィードバックの表示
function showSuccess() {
    feedbackOverlay.classList.remove('hidden');
    
    // バイブレーション（対応デバイスのみ）
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
    
    // 2秒後に自動で閉じる
    setTimeout(() => {
        feedbackOverlay.classList.add('hidden');
    }, 2000);
}

// エラーフィードバックの表示
function showError(message) {
    const errorText = errorOverlay.querySelector('.feedback-text');
    errorText.textContent = message || '送信できませんでした';
    errorOverlay.classList.remove('hidden');
    
    // バイブレーション（対応デバイスのみ）
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }
}

// エラーオーバーレイを閉じる
function hideError() {
    errorOverlay.classList.add('hidden');
}

// グローバルに公開（HTMLから呼び出すため）
window.hideError = hideError;

// 画面切り替え
function showSetupScreen() {
    // 既存の設定値を表示
    const savedConfig = localStorage.getItem(CONFIG_KEY);
    if (savedConfig) {
        try {
            const config = JSON.parse(savedConfig);
            if (publicKeyInput) publicKeyInput.value = config.publicKey || '';
            if (serviceIdInput) serviceIdInput.value = config.serviceId || '';
            if (templateIdInput) templateIdInput.value = config.templateId || '';
            if (emailInput) emailInput.value = config.email || '';
        } catch (error) {
            console.error('Error loading config for display:', error);
        }
    }
    
    if (setupScreen) setupScreen.classList.remove('hidden');
    if (mainScreen) mainScreen.classList.add('hidden');
}

function showMainScreen() {
    if (setupScreen) setupScreen.classList.add('hidden');
    if (mainScreen) mainScreen.classList.remove('hidden');
}

// Service Workerの登録
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered');
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// PWAインストールプロンプト
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
});

// オフライン/オンライン状態の監視
window.addEventListener('online', () => {
    console.log('Online');
});

window.addEventListener('offline', () => {
    console.log('Offline');
    alert('インターネット接続がありません。接続を確認してください。');
});

// Made with Bob
