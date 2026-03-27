# 🔐 GitHub認証ガイド

`git push`で認証が求められた場合の対処法です。

## 📝 あなたの情報

**GitHub Username:** `fujisaki-satoshi`

これはリポジトリのURLから確認できます:
```
https://github.com/fujisaki-satoshi/mom-contact-app
                    ^^^^^^^^^^^^^^^^
                    これがUsername
```

## 🔑 Personal Access Token（PAT）の取得

GitHubではパスワードの代わりにPersonal Access Tokenを使います。

### ステップ1: GitHubでトークンを作成

1. **GitHubにログイン**
   - https://github.com にアクセス

2. **Settings を開く**
   - 右上のプロフィールアイコンをクリック
   - 「Settings」を選択

3. **Developer settings を開く**
   - 左サイドバーの一番下にある「Developer settings」をクリック

4. **Personal access tokens を選択**
   - 「Personal access tokens」→「Tokens (classic)」をクリック

5. **Generate new token をクリック**
   - 「Generate new token」→「Generate new token (classic)」を選択

6. **トークンの設定**
   
   **Note（メモ）:**
   ```
   mom-contact-app deployment
   ```
   
   **Expiration（有効期限）:**
   ```
   90 days（90日間）
   ```
   
   **Select scopes（権限）:**
   - ✅ `repo`（すべてにチェック）
     - repo:status
     - repo_deployment
     - public_repo
     - repo:invite
     - security_events

7. **Generate token をクリック**
   - 緑色のボタンをクリック

8. **トークンをコピー**
   - 表示されたトークンをコピー
   - 例: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - ⚠️ **重要**: このトークンは一度しか表示されません！

### ステップ2: トークンを保存（推奨）

トークンを安全な場所に保存してください:

**macOSのメモアプリ:**
```
タイトル: GitHub Personal Access Token
内容: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**テキストファイル:**
```bash
echo "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" > ~/github-token.txt
chmod 600 ~/github-token.txt
```

### ステップ3: git pushで使用

```bash
cd /Users/fujisaki/Desktop/mom-contact-app

git push origin main
```

**認証情報を入力:**
```
Username: fujisaki-satoshi
Password: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
         ↑ コピーしたトークンを貼り付け
```

## 💡 より簡単な方法: Web UIでアップロード

コマンドラインが面倒な場合は、Web UIを使う方が簡単です:

### 方法1: 個別ファイルを編集

1. **GitHubリポジトリを開く**
   ```
   https://github.com/fujisaki-satoshi/mom-contact-app
   ```

2. **ファイルをクリック**
   - 例: `app.js` をクリック

3. **鉛筆アイコン（Edit）をクリック**

4. **内容を貼り付け**
   - ローカルの `app.js` の内容をコピー
   - ブラウザで全選択（Command+A）して貼り付け

5. **Commit changes をクリック**

### 方法2: 新しいファイルをアップロード

1. **Add file → Upload files をクリック**

2. **ファイルをドラッグ&ドロップ**
   - `EMAILJS_SETUP.md` など

3. **Commit changes をクリック**

## 🔄 認証情報を保存（オプション）

毎回入力するのが面倒な場合:

### macOSのキーチェーンに保存

```bash
git config --global credential.helper osxkeychain
```

次回 `git push` 時に入力した認証情報が自動的に保存されます。

### 認証情報をキャッシュ

```bash
git config --global credential.helper cache
git config --global credential.helper 'cache --timeout=3600'
```

1時間（3600秒）認証情報をキャッシュします。

## 📋 完全な手順（コマンドライン）

```bash
# 1. ディレクトリに移動
cd /Users/fujisaki/Desktop/mom-contact-app

# 2. 変更をステージング
git add app.js index.html style.css README.md EMAILJS_SETUP.md

# 3. コミット
git commit -m "EmailJS対応版に更新"

# 4. プッシュ
git push origin main

# 5. 認証情報を入力
# Username: fujisaki-satoshi
# Password: [Personal Access Token]
```

## 📋 完全な手順（Web UI）

```
1. https://github.com/fujisaki-satoshi/mom-contact-app を開く

2. 各ファイルを更新:
   - app.js → Edit → 内容を貼り付け → Commit
   - index.html → Edit → 内容を貼り付け → Commit
   - style.css → Edit → 内容を貼り付け → Commit
   - README.md → Edit → 内容を貼り付け → Commit

3. 新しいファイルを追加:
   - Add file → Upload files
   - EMAILJS_SETUP.md をドラッグ&ドロップ
   - Commit changes
```

## ❓ よくある質問

### Q1: Usernameがわからない

**A:** リポジトリのURLから確認できます:
```
https://github.com/fujisaki-satoshi/mom-contact-app
                    ^^^^^^^^^^^^^^^^
                    これがUsername
```

### Q2: パスワードを入力してもエラーになる

**A:** GitHubアカウントのパスワードは使えません。Personal Access Tokenを使用してください。

### Q3: トークンを忘れた・失くした

**A:** 新しいトークンを発行してください:
1. GitHub Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token

### Q4: トークンの有効期限が切れた

**A:** 新しいトークンを発行してください。有効期限は最大90日です。

### Q5: Web UIとコマンドライン、どちらが良い？

**A:** 初心者には**Web UI**を推奨します:
- 認証が不要
- 視覚的にわかりやすい
- ミスが少ない

## 🎯 推奨: Web UIを使う

コマンドラインの認証が面倒な場合は、Web UIを使うことを強くお勧めします。

**メリット:**
- ✅ 認証不要（ブラウザでログイン済み）
- ✅ 視覚的にわかりやすい
- ✅ ファイルごとに編集・確認できる
- ✅ ミスが少ない

**デメリット:**
- ❌ ファイルを1つずつ編集する必要がある
- ❌ 大量のファイルがある場合は時間がかかる

今回は5つのファイルなので、Web UIで十分です！

---

**最終更新**: 2026年3月27日