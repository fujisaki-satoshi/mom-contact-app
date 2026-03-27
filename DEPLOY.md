# 🚀 デプロイガイド

このアプリをGitHub Pagesで公開する手順です。

## 方法1: GitHub Web UIを使う（推奨・簡単）

### 1. GitHubでリポジトリを作成

1. https://github.com にアクセスしてログイン
2. 右上の「+」→「New repository」をクリック
3. 以下を入力:
   - Repository name: `mom-contact-app`
   - Description: 「パーキンソン病の母のための連絡アプリ」
   - Public を選択
   - 「Create repository」をクリック

### 2. ファイルをアップロード

1. 作成したリポジトリのページで「uploading an existing file」をクリック
2. 以下のファイルをすべてドラッグ&ドロップ:
   ```
   index.html
   style.css
   app.js
   manifest.json
   service-worker.js
   README.md
   icons/icon-192.png
   icons/icon-512.png
   icons/icon.svg
   ```
3. Commit message: 「Initial commit」
4. 「Commit changes」をクリック

### 3. GitHub Pagesを有効化

1. リポジトリの「Settings」タブをクリック
2. 左メニューから「Pages」を選択
3. Source セクションで:
   - Branch: 「main」を選択
   - Folder: 「/ (root)」を選択
4. 「Save」をクリック
5. 数分待つと、緑色のボックスに公開URLが表示されます
   - 例: `https://あなたのユーザー名.github.io/mom-contact-app/`

### 4. アプリにアクセス

- 表示されたURLをiPhoneのSafariで開く
- ブックマークに保存するか、ホーム画面に追加

## 方法2: Git コマンドラインを使う（上級者向け）

### 前提条件
- Gitがインストールされていること
- GitHubアカウントがあること

### 手順

```bash
# 1. GitHubでリポジトリを作成（Web UIで）

# 2. ローカルリポジトリをリモートに接続
cd mom-contact-app
git remote add origin https://github.com/あなたのユーザー名/mom-contact-app.git

# 3. 初回コミット
git add .
git commit -m "Initial commit: かんたん連絡アプリ"

# 4. GitHubにプッシュ
git branch -M main
git push -u origin main

# 5. GitHub Pagesを有効化（Web UIで設定）
```

## 方法3: GitHub Desktop を使う（初心者向け）

### 1. GitHub Desktop をインストール

- https://desktop.github.com/ からダウンロード
- インストールしてGitHubアカウントでログイン

### 2. リポジトリを公開

1. GitHub Desktop を開く
2. 「File」→「Add Local Repository」
3. `mom-contact-app` フォルダを選択
4. 「Publish repository」をクリック
5. Repository name: `mom-contact-app`
6. 「Keep this code private」のチェックを外す（Public にする）
7. 「Publish repository」をクリック

### 3. GitHub Pagesを有効化

- ブラウザでGitHubのリポジトリページを開く
- 「Settings」→「Pages」で設定（方法1の手順3を参照）

## 📱 アプリのURL

デプロイ後のURLは以下の形式になります:

```
https://あなたのGitHubユーザー名.github.io/mom-contact-app/
```

例:
- ユーザー名が `tanaka` の場合
- URL: `https://tanaka.github.io/mom-contact-app/`

## 🔄 アプリを更新する場合

### Web UIで更新

1. GitHubのリポジトリページを開く
2. 更新したいファイルをクリック
3. 鉛筆アイコン（Edit）をクリック
4. 内容を編集
5. 「Commit changes」をクリック
6. 数分後に自動的に反映されます

### Git コマンドで更新

```bash
cd mom-contact-app

# ファイルを編集後
git add .
git commit -m "定型文を追加"
git push

# 数分後に自動的に反映されます
```

## ⚠️ 注意事項

1. **Public リポジトリにする**
   - GitHub Pagesは無料プランではPublicリポジトリのみ対応
   - LINE Notifyトークンはアプリ内に含めないこと（ユーザーが個別に設定）

2. **反映に時間がかかる**
   - 初回デプロイ: 5-10分程度
   - 更新: 1-3分程度

3. **カスタムドメイン（オプション）**
   - 独自ドメインを使いたい場合は、GitHub Pagesの設定で追加可能
   - 例: `mom-contact.example.com`

## 🆘 トラブルシューティング

### 404 エラーが表示される

- GitHub Pagesの設定を確認
- URLが正しいか確認（リポジトリ名を含む）
- 数分待ってから再度アクセス

### ファイルが更新されない

- ブラウザのキャッシュをクリア
- シークレットモードで開いてみる
- GitHub Actionsのタブでビルド状況を確認

### アイコンが表示されない

- `icons/` フォルダ内のファイルもアップロードされているか確認
- ブラウザの開発者ツールでエラーを確認

## 📞 サポート

問題が解決しない場合:
1. GitHubのリポジトリのIssuesタブで質問
2. README.mdのトラブルシューティングセクションを確認