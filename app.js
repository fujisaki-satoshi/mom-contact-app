// LINE Notify API エンドポイント
const LINE_NOTIFY_API = 'https://notify-api.line.me/api/notify';

// ローカルストレージのキー
const TOKEN_KEY = 'line_notify_token';

// DOM要素
let setupScreen, mainScreen, feedbackOverlay, errorOverlay;
let tokenInput, saveTokenBtn, settingsBtn;
let messageButtons;

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    checkToken();
    setupEventListeners();
    registerServiceWorker();
});

// DOM要素の取得
function initializeElements() {
    setupScreen = document.getElementById('setup-screen');
    mainScreen = document.getElementById('main-screen');
    feedbackOverlay = document.getElementById('feedback-overlay');
    errorOverlay = document.getElementById('error-overlay');
    
    tokenInput = document.getElementById('token-input');
    saveTokenBtn = document.getElementById('save-token-btn');
    settingsBtn = document.getElementById('settings-btn');
    
    messageButtons = document.querySelectorAll('.message-btn');
}

// トークンの確認
function checkToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (token) {
        showMainScreen();
    } else {
        showSetupScreen();
    }
}

// イベントリスナーの設定
function setupEventListeners() {
    // トークン保存ボタン
    saveTokenBtn.addEventListener('click', saveToken);
    
    // Enterキーでトークン保存
    tokenInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveToken();
        }
    });
    
    // 設定ボタン
    settingsBtn.addEventListener('click', () => {
        const confirm = window.confirm('設定画面に戻りますか？\n（トークンを再設定できます）');
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

// トークンの保存
function saveToken() {
    const token = tokenInput.value.trim();
    
    if (!token) {
        alert('トークンを入力してください');
        return;
    }
    
    // トークンの形式チェック（簡易版）
    if (token.length < 20) {
        alert('トークンが短すぎます。正しいトークンを入力してください。');
        return;
    }
    
    localStorage.setItem(TOKEN_KEY, token);
    tokenInput.value = '';
    showMainScreen();
    
    // テストメッセージを送信
    sendMessage('✅ かんたん連絡アプリの設定が完了しました！');
}

// メッセージの送信
async function sendMessage(message) {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!token) {
        showError('トークンが設定されていません');
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
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const fullMessage = `【お母様から】\n${message}\n\n送信時刻: ${timeString}`;
        
        // LINE Notify APIにPOSTリクエスト
        const response = await fetch(LINE_NOTIFY_API, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `message=${encodeURIComponent(fullMessage)}`
        });
        
        if (clickedButton) {
            clickedButton.style.opacity = '1';
        }
        
        if (response.ok) {
            showSuccess();
        } else {
            const errorData = await response.json();
            console.error('LINE Notify Error:', errorData);
            
            if (response.status === 401) {
                showError('トークンが無効です。設定を確認してください。');
                // トークンを削除して設定画面に戻る
                setTimeout(() => {
                    localStorage.removeItem(TOKEN_KEY);
                    showSetupScreen();
                }, 2000);
            } else {
                showError('送信に失敗しました。もう一度お試しください。');
            }
        }
    } catch (error) {
        console.error('Send Error:', error);
        showError('ネットワークエラーが発生しました。インターネット接続を確認してください。');
        
        if (clickedButton) {
            clickedButton.style.opacity = '1';
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
    // デフォルトのインストールプロンプトを防ぐ
    e.preventDefault();
    deferredPrompt = e;
    
    // カスタムインストールボタンを表示することも可能
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
