const { override, fixBabelImports,addLessLoader } = require('customize-cra');

// - module.exports = function override(config, env) {
// -   // do stuff with the webpack config...
// -   return config;
// - };
 module.exports = override(
     //按需打包
  fixBabelImports('import', {
     libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
 );
 
 