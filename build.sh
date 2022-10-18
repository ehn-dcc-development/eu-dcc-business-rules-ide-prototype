npx parcel build src/index.html --dist-dir build
sed -e 's/="\/index/="file:\.\/index/g' build/index.html > build/index-local.html
sed -i -e 's/type="module"//g' build/index-local.html
#rm build/index-local.html-e
#open build/index-local.html
