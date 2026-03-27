# 📤 GitHubへのアップロード手順

## 方法1: Web UIでアップロード（推奨・最も簡単）

### ステップ1: GitHubリポジトリを開く

1. ブラウザで以下のURLを開く:
   ```
   https://github.com/fujisaki-satoshi/mom-contact-app
   ```

2. 「uploading an existing file」のリンクをクリック
   - または「Add file」→「Upload files」をクリック

### ステップ2: ファイルをアップロード

1. **Finderでファイルを選択**
   - Finderを開く
   - `/Users/fujisaki/Desktop/mom-contact-app` フォルダを開く
   - 以下のファイルを選択（Command+クリックで複数選択）:
     ```
     ✅ index.html
     ✅ style.css
     ✅ app.js
     ✅ manifest.json
     ✅ service-worker.js
     ✅ README.md
     ✅ QUICKSTART.md
     ✅ DEPLOY.md
     ✅ LINE_NOTIFY_SETUP.md
     ✅ PROJECT_SUMMARY.md
     ✅ .gitignore
     ```

2. **ドラッグ&ドロップ**
   - 選択したファイルをGitHubのアップロード画面にドラッグ
   - アップロードが完了するまで待つ

3. **iconsフォルダのファイルをアップロード**
   - 「Add file」→「Upload files」を再度クリック
   - `icons/` フォルダ内の3つのファイルを選択:
     ```
     ✅ icon-192.png
     ✅ icon-512.png
     ✅ icon.svg
     ```
   - ドラッグ&ドロップ
   - ⚠️ 重要: ファイル名の前に `icons/` を追加
     - 例: `icons/icon-192.png`

4. **コミット**
   - Commit message: 「Initial commit: かんたん連絡アプリ」
   - 「Commit changes」をクリック

### ステップ3: GitHub Pagesを有効化

1. **Settingsタブを開く**
   - リポジトリページの上部にある「Settings」をクリック

2. **Pagesを選択**
   - 左サイドバーから「Pages」をクリック

3. **設定**
   - Source: 「Deploy from a branch」を選択
   - Branch: 「main」を選択
   - Folder: 「/ (root)」を選択
   - 「Save」をクリック

4. **URLを確認**
   - 数分待つと、緑色のボックスに公開URLが表示されます:
   ```
   https://fujisaki-satoshi.github.io/mom-contact-app/
   ```
   - このURLをブックマークしてください

## 方法2: GitHub Desktopを使う（GUI推奨）

### 前提条件
GitHub Desktopがインストールされていない場合:
1. https://desktop.github.com/ からダウンロード
2. インストールしてGitHubアカウントでログイン

### 手順

1. **GitHub Desktopを開く**

2. **リポジトリを追加**
   - 「File」→「Add Local Repository」
   - 「Choose...」をクリック
   - `/Users/fujisaki/Desktop/mom-contact-app` を選択
   - 「Add Repository」をクリック

3. **変更をコミット**
   - 左下の「Summary」に「Initial commit」と入力
   - 「Commit to main」をクリック

4. **GitHubにプッシュ**
   - 上部の「Publish repository」をクリック
   - 「Keep this code private」のチェックを外す（Publicにする）
   - 「Publish repository」をクリック

5. **GitHub Pagesを有効化**
   - ブラウザでリポジトリを開く
   - 方法1のステップ3を実行

## 方法3: コマンドライン（上級者向け）

### GitHubの認証設定

1. **Personal Access Tokenを作成**
   - https://github.com/settings/tokens にアクセス
   - 「Generate new token」→「Generate new token (classic)」
   - Note: 「mom-contact-app」
   - Expiration: 「90 days」
   - Scopes: 「repo」にチェック
   - 「Generate token」をクリック
   - トークンをコピー（一度しか表示されません）

2. **プッシュ**
   ```bash
   cd /Users/fujisaki/Desktop/mom-contact-app
   git push -u origin main
   ```
   - Username: `fujisaki-satoshi`
   - Password: コピーしたトークンを貼り付け

3. **GitHub Pagesを有効化**
   - 方法1のステップ3を実行

## ✅ アップロード完了後の確認

### 1. ファイルが正しくアップロードされたか確認

リポジトリページで以下のファイルが表示されているか確認:
```
mom-contact-app/
├── index.html
├── style.css
├── app.js
├── manifest.json
├── service-worker.js
├── README.md
├── QUICKSTART.md
├── DEPLOY.md
├── LINE_NOTIFY_SETUP.md
├── PROJECT_SUMMARY.md
├── .gitignore
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    └── icon.svg
```

### 2. GitHub Pagesが有効になっているか確認

1. Settings → Pages を開く
2. 緑色のボックスに「Your site is live at...」と表示されているか確認

### 3. アプリが動作するか確認

1. 公開URLをiPhoneのSafariで開く:
   ```
   https://fujisaki-satoshi.github.io/mom-contact-app/
   ```

2. 設定画面が表示されることを確認

## 🎉 次のステップ

アップロードが完了したら:

1. **LINE Notifyトークンを取得**
   - `LINE_NOTIFY_SETUP.md` を参照

2. **お母様のiPhoneで設定**
   - SafariでアプリのURLを開く
   - トークンを入力
   - ホーム画面に追加

3. **動作確認**
   - ボタンをタップしてメッセージを送信
   - LINEに通知が届くか確認

## ❓ トラブルシューティング

### ファイルがアップロードできない

- ファイルサイズが大きすぎる場合は、個別にアップロード
- ブラウザを再読み込みしてみる

### GitHub Pagesが有効にならない

- 数分待ってから再度確認
- リポジトリがPublicになっているか確認

### アプリが表示されない

- URLが正しいか確認
- ブラウザのキャッシュをクリア
- シークレットモードで開いてみる

## 📞 サポート

問題が解決しない場合は、以下を確認:
- GitHubのステータスページ: https://www.githubstatus.com/
- README.mdのトラブルシューティングセクション