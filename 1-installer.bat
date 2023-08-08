:: ls %1

symfony composer create-project symfony/skeleton %1 ^6.3.*
cd /D %1
symfony composer require symfony/webapp-pack --no-interaction
symfony composer require symfony/webpack-encore-bundle --no-interaction
CMD /C "yarn install"
CMD /C "yarn add jquery bootstrap @popperjs/core"
CMD /C "yarn add sass-loader sass --dev"
CMD /C "yarn add vue@2"
CMD /C "yarn add sass-loader"
CMD /C "yarn add vue-loader@15"
CMD /C "yarn add postcss-loader"
CMD /C "yarn add postcss-preset-env"
CMD /C "yarn add @vue/babel-helper-vue-jsx-merge-props"
CMD /C "yarn add @vue/babel-preset-jsx"
CMD /C "yarn add path"
CMD /C "yarn add moment"
CMD /C "yarn add classnames"
symfony composer require --dev symfony/maker-bundle --no-interaction
symfony console make:controller TestController --no-interaction
rm -R assets
rm -R templates
rm -R webpack.config.js
cp -R ../assets assets
cp -R ../templates templates
cp -R ../webpack.config.js webpack.config.js
start CMD /K "yarn encore dev --watch"
start CMD /K "symfony serve --port=8090"
firefox https://127.0.0.1:8090/test


