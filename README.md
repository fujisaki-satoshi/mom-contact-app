# 📱 かんたん連絡アプリ

パーキンソン病などで指先が震えて文字入力が困難な方でも、大きなボタンを押すだけで家族に連絡できるアプリです。

## ✨ 特徴

- **大きなボタン**: 震える指でも押しやすい設計
- **シンプルな操作**: 選択肢から選ぶだけ
- **完全無料**: サーバー費用・アプリ登録料不要
- **iPhoneのホーム画面に追加可能**: アプリのように使える
- **メール通知**: 家族のメールアドレスに届く

## 📋 必要なもの

1. **iPhone**（お母様用）
2. **メールアドレス**（受信者用）
3. **GitHubアカウント**（無料・デプロイ用）
4. **EmailJSアカウント**（無料・メール送信用）

## 🚀 セットアップ手順

### ステップ1: GitHub Pagesでアプリを公開

1. **GitHubにログイン**
   - https://github.com にアクセス
   - アカウントがない場合は新規作成（無料）

2. **新しいリポジトリを作成**
   - 右上の「+」→「New repository」をクリック
   - Repository name: `mom-contact-app`（任意の名前でOK）
   - Public を選択
   - 「Create repository」をクリック

3. **ファイルをアップロード**
   - 「uploading an existing file」をクリック
   - 以下のファイルをすべてドラッグ&ドロップ:
     - `index.html`
     - `style.css`
     - `app.js`
     - `manifest.json`
     - `service-worker.js`
     - `icons/icon-192.png`
     - `icons/icon-512.png`
   - 「Commit changes」をクリック

4. **GitHub Pagesを有効化**
   - リポジトリの「Settings」タブをクリック
   - 左メニューから「Pages」を選択
   - Source: 「Deploy from a branch」を選択
   - Branch: 「main」を選択、フォルダは「/ (root)」
   - 「Save」をクリック
   - 数分待つと、URLが表示されます（例: `https://username.github.io/mom-contact-app/`）

### ステップ2: EmailJSを設定

詳細は [EMAILJS_SETUP.md](EMAILJS_SETUP.md) を参照してください。

**簡易手順:**

1. **EmailJSアカウント作成**
   - https://www.emailjs.com/ にアクセス
   - Sign Upしてアカウント作成

2. **Email Service追加**
   - Gmailアカウントを連携
   - Service IDをコピー

3. **Email Template作成**
   - 新しいテンプレートを作成
   - Template IDをコピー

4. **Public Key取得**
   - Account → General
   - Public Keyをコピー

### ステップ3: お母様のiPhoneで設定

1. **アプリを開く**
   - SafariでGitHub PagesのURL（ステップ1で取得）を開く
   - 例: `https://username.github.io/mom-contact-app/`

2. **設定を入力**
   - 初回起動時に設定画面が表示されます
   - EmailJS Public Key: ステップ2で取得
   - Service ID: ステップ2で取得
   - Template ID: ステップ2で取得
   - 受信メールアドレス: 通知を受け取りたいメールアドレス
   - 「保存して開始」をクリック
   - テストメッセージが送信され、メールに通知が届きます

3. **ホーム画面に追加**（推奨）
   - Safari下部の「共有」ボタン（□に↑のアイコン）をタップ
   - 「ホーム画面に追加」を選択
   - 「追加」をタップ
   - ホーム画面にアプリアイコンが追加されます

## 📱 使い方

1. ホーム画面のアイコンをタップしてアプリを開く
2. 送りたいメッセージのボタンをタップ
3. 「送信しました！」と表示されたら完了
4. 受信者のメールアドレスに通知が届きます

## 🔧 カスタマイズ

### 定型文を変更したい場合

`index.html` の以下の部分を編集してください:

```html
<button class="message-btn emergency" data-message="🆘 助けてほしい（緊急）">
    <span class="icon">🆘</span>
    <span class="text">助けてほしい</span>
    <span class="subtext">緊急</span>
</button>
```

- `data-message`: 送信されるメッセージ内容
- `<span class="icon">`: ボタンに表示される絵文字
- `<span class="text">`: ボタンに表示されるテキスト

### ボタンの色を変更したい場合

`style.css` の以下のクラスを編集してください:

- `.message-btn.emergency`: 赤色（緊急用）
- `.message-btn.urgent`: 黄色（重要）
- `.message-btn.warning`: オレンジ色（警告）
- `.message-btn.success`: 緑色（良い知らせ）
- `.message-btn.info`: 青色（情報）
- `.message-btn.thanks`: 紫色（感謝）

### メールテンプレートを変更

EmailJSのダッシュボードで:
1. Email Templates → 作成したテンプレートを選択
2. Subject（件名）やContent（本文）を編集
3. 保存

## 🔒 セキュリティとプライバシー

- **設定の保管**: EmailJS設定はお母様のiPhone内にのみ保存されます
- **サーバー不要**: メッセージは直接EmailJS APIに送信され、第三者のサーバーを経由しません
- **Public Key**: Public Keyは公開されても問題ありません（送信専用）

## 💰 料金

### 完全無料で使える範囲
- **GitHub Pages**: 無料
- **EmailJS無料プラン**: 月200通まで（1日約6-7回）
- **アプリ登録料**: 不要（PWAのため）

### 月200通を超える場合
- EmailJS Personal: $7/月（月1,000通）
- EmailJS Professional: $15/月（月10,000通）

## ❓ トラブルシューティング

### メッセージが送信できない

1. **インターネット接続を確認**
   - Wi-Fiまたはモバイルデータ通信がオンになっているか確認

2. **設定を確認**
   - アプリの「⚙️ 設定」ボタンをタップ
   - Public Key、Service ID、Template IDを再確認

3. **EmailJSの設定を確認**
   - EmailJSダッシュボードでGmailが連携されているか
   - テンプレートが正しく作成されているか

### メールが届かない

1. **迷惑メールフォルダを確認**
   - Gmailの場合: 「迷惑メール」タブ
   - iPhoneメールの場合: 「迷惑メール」フォルダ

2. **送信制限を確認**
   - EmailJS無料プランの月200通を超えていないか
   - EmailJSダッシュボードで使用状況を確認

3. **テストメッセージを送信**
   - アプリの設定画面で「保存して開始」をタップ
   - テストメッセージが届くか確認

### ホーム画面に追加できない

- Safariブラウザを使用していることを確認
- Chrome等の他のブラウザでは「ホーム画面に追加」機能が使えません

## 📞 サポート

問題が解決しない場合は、以下を確認してください:

1. iPhoneのiOSバージョン（iOS 13以降推奨）
2. Safariのバージョン
3. エラーメッセージの内容
4. [EMAILJS_SETUP.md](EMAILJS_SETUP.md) のトラブルシューティング

## 📚 関連ドキュメント

- **[QUICKSTART.md](QUICKSTART.md)** - 5分で始められるガイド
- **[EMAILJS_SETUP.md](EMAILJS_SETUP.md)** - EmailJS設定の詳細手順
- **[DEPLOY.md](DEPLOY.md)** - GitHub Pagesへのデプロイ方法
- **[UPLOAD_GUIDE.md](UPLOAD_GUIDE.md)** - ファイルアップロード方法
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - プロジェクト概要

## 🙏 謝辞

このプロジェクトは、パーキンソン病などで日常生活に困難を抱える方々とそのご家族のために作成しました。
少しでもお役に立てれば幸いです。

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
自由に使用・改変・配布できます。

---

**作成日**: 2026年3月
**バージョン**: 2.0.0（EmailJS対応版）
**更新日**: 2026年3月27日