# Lint
./node_modules/.bin/eslint js/source js/__tests__
# flow
./node_modules/.bin/flow
# test
npm test
# JavaScriptのトランスファイル
./node_modules/.bin/babel js/source -d js/build
# JavaScriptのパッケージング
./node_modules/.bin/browserify js/build/app.js -o bundle.js
./node_modules/.bin/browserify js/build/discover.js -o discover-bundle.js
# CSSのパッケージング
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
# 完了
date; echo;
