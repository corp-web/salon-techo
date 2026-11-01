# サロン手帳（美容室向けシンプルレジ）

1人営業の美容室向けの予約・カレンダー・会計・カルテ・売上アプリ。iPadとiPhoneで使い、データは自動で同期する。

- アプリのURL：https://corp-web.github.io/salon-techo/
- ソース：このフォルダ（GitHub `corp-web/salon-techo`、main に push すると1分ほどで反映）
- データ：Firebase プロジェクト `salon-techo`（Googleアカウント zacc0612@gmail.com、無料のSparkプラン・カード登録なし）

## ファイル
| ファイル | 中身 |
|---|---|
| index.html | アプリ本体（画面・処理・同期をすべて含む1ファイル） |
| sw.js | ネットがなくても開けるようにする仕組み |
| manifest.json / icon-*.png | ホーム画面のアイコン |
| version.json | 公開中のバージョン（設定画面の「アップデート」が見る） |
| firestore.rules | セキュリティ（ログインした本人のデータだけ読み書きできる） |

## 直して公開するとき（Claude Code への頼み方）
「`Projects\美容室レジ` のサロン手帳を〇〇に直して、公開まで」と頼めばよい。作業の流れは次のとおり。
1. index.html を直す
2. index.html の `APP_VER` と version.json の `v` を、同じ新しい番号にする（例：1.6 → 1.7）
3. `git add` → `git commit` → `git push`
4. iPadとiPhoneでは、設定の「アップデートを確認」で反映（ログインもデータも消えない）

## 守ること
- 料金は発生させない：Blazeプランへの変更や Identity Platform への切り替えはしない
- セキュリティルールを変えるときは `firebase deploy --only firestore:rules`（このPCは zacc0612 でログイン済み）
- お客様データは Firestore の `users/{uid}/` の下にある。テストには別のテスト用アカウントを使い、終わったら消す

## 2店舗目
同じURLを開き、設定の「はじめて使う（登録）」から別のメールで登録すれば、データは完全に別になる（お互いの情報は見えない）。

## やめるとき
1. Firebaseの管理画面で、プロジェクト `salon-techo` を削除する（お客様の個人情報もクラウドから消える）
2. 必要ならGitHubの `corp-web/salon-techo` を非公開にするか削除する
3. Googleアカウント zacc0612 は、ほかで使っていなければ削除してよい
