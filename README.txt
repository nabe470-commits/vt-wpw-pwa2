# VT & WPW 学習アプリ（PWA）デプロイ手順

最終更新: 2025-10-30

## ファイル一覧
- index.html
- manifest.webmanifest
- sw.js
- icons/icon-192.png
- icons/icon-512.png

## 公開（GitHub Pages）
1. 新規リポジトリを作成し、上記ファイルをすべて追加・コミット。
2. GitHub: Settings → Pages → Deploy from a branch を選択。
3. Branch: `main`、Folder: `/root` を指定して保存。
4. 数分後に公開URLが発行されます。`https://<ユーザー名>.github.io/<リポジトリ名>/`

## iPhoneへのインストール
1. Safariで上記URLを開く。
2. 共有ボタン → 「ホーム画面に追加」をタップ。
3. アイコン名を確認して追加。ホーム画面からフルスクリーンで起動可能。

## 備考
- 初回アクセス時にService Workerがキャッシュを作成。以降はオフラインでも起動可能です（CDNのライブラリはオンライン時に一度読み込んでおくことを推奨）。
- 更新後にキャッシュが残る場合は、Safariのサイトデータを削除するか、アプリを再インストールしてください。
