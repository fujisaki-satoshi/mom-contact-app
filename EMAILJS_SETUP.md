# 📧 EmailJS 設定手順

EmailJSを使ってメール通知を受け取る設定方法です。

## 📋 必要なもの

- メールアドレス（Gmailなど）
- EmailJSアカウント（無料）

## 🚀 セットアップ手順（約10分）

### ステップ1: EmailJSアカウントを作成

1. **EmailJSにアクセス**
   ```
   https://www.emailjs.com/
   ```

2. **Sign Upをクリック**
   - 右上の「Sign Up」ボタンをクリック

3. **アカウント情報を入力**
   - Email: あなたのメールアドレス
   - Password: パスワードを設定
   - 「Create Account」をクリック

4. **メール認証**
   - 登録したメールアドレスに確認メールが届く
   - メール内のリンクをクリックして認証

### ステップ2: Email Serviceを追加

1. **ダッシュボードにログイン**
   - https://dashboard.emailjs.com/

2. **「Add New Service」をクリック**
   - 左メニューの「Email Services」を選択
   - 「Add New Service」ボタンをクリック

3. **メールサービスを選択**
   - **Gmail**を選択（推奨）
   - または他のメールサービス（Outlook、Yahoo等）

4. **Gmailアカウントを連携**
   - 「Connect Account」をクリック
   - Googleアカウントでログイン
   - EmailJSへのアクセスを許可

5. **Service IDをコピー**
   - 作成されたService IDをメモ
   - 例: `service_abc123`

### ステップ3: Email Templateを作成

1. **「Email Templates」を選択**
   - 左メニューから「Email Templates」をクリック

2. **「Create New Template」をクリック**

3. **テンプレートを設定**
   
   **Template Name:**
   ```
   mom_contact_template
   ```
   
   **Subject:**
   ```
   【お母様から】{{message}}
   ```
   
   **Content:**
   ```
   お母様から連絡がありました。

   メッセージ: {{message}}
   送信時刻: {{timestamp}}

   ---
   このメールは「かんたん連絡アプリ」から自動送信されました。
   ```

4. **「Save」をクリック**

5. **Template IDをコピー**
   - 作成されたTemplate IDをメモ
   - 例: `template_xyz789`

### ステップ4: Public Keyを取得

1. **「Account」を選択**
   - 左メニューから「Account」をクリック

2. **「General」タブを開く**

3. **Public Keyをコピー**
   - 「Public Key」の欄に表示されている文字列をコピー
   - 例: `AbCdEfGhIjKlMnOp`

### ステップ5: アプリに設定

1. **アプリを開く**
   - iPhoneのSafariでアプリのURLを開く
   - 例: `https://fujisaki-satoshi.github.io/mom-contact-app/`

2. **設定画面で入力**
   
   **EmailJS Public Key:**
   ```
   ステップ4でコピーしたPublic Key
   ```
   
   **Service ID:**
   ```
   ステップ2でコピーしたService ID
   ```
   
   **Template ID:**
   ```
   ステップ3でコピーしたTemplate ID
   ```
   
   **受信メールアドレス:**
   ```
   通知を受け取りたいメールアドレス
   ```

3. **「保存して開始」をタップ**
   - テストメッセージが送信されます
   - メールを確認してください

## ✅ 動作確認

### テストメッセージの確認

1. **メールアプリを開く**
   - iPhoneのメールアプリまたはGmail

2. **テストメールが届いているか確認**
   - 件名: 「【お母様から】✅ かんたん連絡アプリの設定が完了しました！」
   - 差出人: EmailJS

3. **届いていない場合**
   - 迷惑メールフォルダを確認
   - EmailJSの設定を再確認

## 📱 使い方

1. ホーム画面のアイコンをタップ
2. 送りたいメッセージのボタンをタップ
3. 「送信しました！」と表示されたら完了
4. 数秒後にメールが届きます

## 🔧 カスタマイズ

### メールの件名を変更

EmailJSのダッシュボードで:
1. Email Templates → 作成したテンプレートを選択
2. Subject欄を編集
3. 例: `緊急: お母様から連絡`

### メールの本文を変更

Content欄を編集:
```
お母様から連絡がありました。

メッセージ: {{message}}
送信時刻: {{timestamp}}

すぐに確認してください。
```

### 複数の受信者に送信

Template Contentに以下を追加:
```
To: your-email@example.com, family@example.com
```

## 💰 料金プラン

### 無料プラン
- **月200通まで**: 1日約6-7回の送信
- **十分な量**: 通常の使用には十分

### 有料プラン（必要な場合）
- Personal: $7/月（月1,000通）
- Professional: $15/月（月10,000通）

## 🔒 セキュリティ

### Public Keyの取り扱い
- ✅ Public Keyは公開されても問題ありません
- ✅ ブラウザから直接EmailJSに送信
- ✅ サーバーを経由しないため安全

### メールアドレスの保護
- メールアドレスはiPhone内にのみ保存
- 第三者には見えません

## ❓ よくある質問

### Q1: メールが届かない

**A:** 以下を確認してください:

1. **迷惑メールフォルダを確認**
   - Gmailの場合: 「迷惑メール」タブ
   - iPhoneメールの場合: 「迷惑メール」フォルダ

2. **EmailJSの設定を確認**
   - Service IDが正しいか
   - Template IDが正しいか
   - Public Keyが正しいか

3. **Gmailの連携を確認**
   - EmailJSダッシュボードでGmailが連携されているか

4. **送信制限を確認**
   - 無料プランの月200通を超えていないか

### Q2: 送信が遅い

**A:** EmailJSは通常数秒〜数十秒でメールが届きます。

- ネットワーク状況により遅延する場合があります
- 1分以上待っても届かない場合は再送信してください

### Q3: 複数のデバイスで使える？

**A:** はい、使えます。

- 同じ設定を複数のデバイスに入力
- すべてのデバイスから同じメールアドレスに送信可能

### Q4: 設定を変更したい

**A:** アプリの「⚙️ 設定」ボタンをタップ

- 設定画面に戻ります
- 新しい情報を入力して保存

### Q5: 無料プランの制限を超えたら？

**A:** 以下の選択肢があります:

1. **有料プランにアップグレード**
   - $7/月で月1,000通まで

2. **別のEmailJSアカウントを作成**
   - 新しいメールアドレスで登録
   - 新しいPublic Key等を取得

3. **月が変わるまで待つ**
   - 毎月1日にカウントがリセット

## 🎯 トラブルシューティング

### エラー: "Failed to send email"

**原因と対処法:**

1. **インターネット接続を確認**
   - Wi-Fiまたはモバイルデータがオンか確認

2. **設定を再確認**
   - Public Key、Service ID、Template IDが正しいか

3. **EmailJSのステータスを確認**
   - https://status.emailjs.com/

### エラー: "Invalid public key"

**対処法:**
- Public Keyを再度コピーして入力
- 余分なスペースが入っていないか確認

### エラー: "Template not found"

**対処法:**
- Template IDが正しいか確認
- EmailJSダッシュボードでテンプレートが存在するか確認

## 📞 サポート

### EmailJS公式サポート
- ドキュメント: https://www.emailjs.com/docs/
- サポート: support@emailjs.com

### アプリのサポート
- README.mdのトラブルシューティング
- GitHubのIssues

## 🎉 完了！

設定が完了したら:
1. ホーム画面にアプリを追加
2. ボタンをタップしてテスト
3. メールが届くことを確認

お母様が快適に連絡できるようになることを願っています！

---

**最終更新**: 2026年3月27日