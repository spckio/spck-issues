SystemJS.config({
  baseURL:'https://unpkg.com/',
  defaultExtension: true,
  packages: {
    ".": {
      main: './main.js',
      defaultExtension: 'js'
    }
  },
  meta: {
    '*.js': {
      'babelOptions': {}
    }
  },
  map: {
    'plugin-babel': 'systemjs-plugin-babel@latest/plugin-babel.js',
    'systemjs-babel-build': 'systemjs-plugin-babel@latest/systemjs-babel-browser.js'
  },
  transpiler: 'plugin-babel'
});

SystemJS.import('./main')
  .catch(console.error.bind(console));
