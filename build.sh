BUILD_PATH=build
rm -rf $BUILD_PATH
mkdir $BUILD_PATH
npx parcel build src/index.html --dist-dir $BUILD_PATH
sed -e 's/="\/index/="file:\.\/index/g' $BUILD_PATH/index.html > $BUILD_PATH/index-local.html
sed -i -e 's/type="module"//g' $BUILD_PATH/index-local.html
#rm $BUILD_PATH/index-local.html-e
#open $BUILD_PATH/index-local.html
