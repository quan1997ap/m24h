#!/bin/bash

yarn build
gulp
rm -rf ./build/static/js/*.map
rm -rf ../web-mobile-beta-build/js
rm -rf ../web-mobile-beta-build/assets
rm -rf ../web-mobile-beta-build/static
rm -rf ../web-mobile-beta-build/*.js
cp -a build/* ../web-mobile-beta-build/
# cp -a bankgo.com.pem ../web-mobile-beta-build/
# cp -a bankgo.com.key ../web-mobile-beta-build/