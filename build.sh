#!/bin/bash
node prefix-bulma.js
yarn build
gulp
rm -rf ./build/static/js/*.map
rm -rf ../compiled-web/js
rm -rf ../compiled-web/assets
rm -rf ../compiled-web/static
rm -rf ../compiled-web/*.js
cp -a build/* ../compiled-web/
rsync -avzhe ssh --progress /Users/Hai/work/mf24h/compiled-web/ root@178.128.26.214:/home/mf24h/compiled-web/
# cd /Users/Hai/Works/mf24h/compiled-web && git add . && git commit -m "up" && git push
# ssh root@206.189.156.226 'cd /home/bankgo/compiled-web && git pull' &
# cp -a bankgo.com.pem ../compiled-web/
# cp -a bankgo.com.key ../compiled-web/
