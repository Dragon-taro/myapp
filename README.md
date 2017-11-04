# 使い方
docker for mac をインストールしてから、以下のコマンドを実行
```
git clone https://github.com/Dragon-taro/myapp.git
cd myapp
docker-compose build
docker-compose up
```
http://127.0.0.1/ にアクセス

# rails containerが起動しないとき
```
rm -f app/tmp/pids/server.pid
```
それか手動で削除
