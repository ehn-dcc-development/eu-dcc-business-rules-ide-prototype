rm dist/*
npx parcel build src/index.html
sed -e 's/="\/index/="file:\.\/index/g' dist/index.html > dist/index-local.html
sed -i -e 's/type="module"//g' dist/index-local.html
open dist/index-local.html
rm dist/index-local.html-e
