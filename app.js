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
    checkConfig();
    setupEventListeners();
    registerServiceWorker();
});

// EmailJSライブラリを動的に読み込む
function loadEmailJSLibrary() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
        emailjsLoaded = true;
        console.log('EmailJS library loaded');
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

// 設定の確認
function checkConfig() {
    const savedConfig = localStorage.getItem(CONFIG_KEY);
    
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        EMAILJS_PUBLIC_KEY = config.publicKey;
        EMAILJS_SERVICE_ID = config.serviceId;
        EMAILJS_TEMPLATE_ID = config.templateId;
        RECIPIENT_EMAIL = config.email;
        
        // EmailJSを初期化
        if (emailjsLoaded && window.emailjs) {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        }
        
        showMainScreen();
    } else {
        showSetupScreen();
    }
}

// イベントリスナーの設定
function setupEventListeners() {
    // 設定保存ボタン
    saveConfigBtn.addEventListener('click', saveConfig);
    
    // Enterキーで設定保存
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveConfig();
        }
    });
    
    // 設定ボタン
    settingsBtn.addEventListener('click', () => {
        const confirm = window.confirm('設定画面に戻りますか？\n（設定を再設定できます）');
        if (confirm) {
            showSetupScreen();
        }
    });
    
    // メッセージボタン
    messageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const message = button.getAttribute('data-message');
            sendMessage(message);
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
    
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    
    EMAILJS_PUBLIC_KEY = publicKey;
    EMAILJS_SERVICE_ID = serviceId;
    EMAILJS_TEMPLATE_ID = templateId;
    RECIPIENT_EMAIL = email;
    
    // EmailJSを初期化
    if (emailjsLoaded && window.emailjs) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    // 入力フィールドをクリア
    publicKeyInput.value = '';
    serviceIdInput.value = '';
    templateIdInput.value = '';
    emailInput.value = '';
    
    showMainScreen();
    
    // テストメッセージを送信
    sendMessage('✅ かんたん連絡アプリの設定が完了しました！');
}

// メッセージの送信
async function sendMessage(message) {
    if (!emailjsLoaded || !window.emailjs) {
        showError('EmailJSライブラリの読み込みに失敗しました。ページを再読み込みしてください。');
        return;
    }
    
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !RECIPIENT_EMAIL) {
        showError('設定が完了していません');
        return;
    }
    
    try {
        // 送信中の視覚的フィードバック
        const clickedButton = event.target.closest('.message-btn');
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
    setupScreen.classList.remove('hidden');
    mainScreen.classList.add('hidden');
}

function showMainScreen() {
    setupScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
}

// Service Workerの登録
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
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
    console.log('PWA install prompt available');
});

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
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
