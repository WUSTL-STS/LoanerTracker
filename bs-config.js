module.exports = {
    proxy: 'localhost:8080',
    files: ['views/**/*', 'public/**/*', "routes/**/*", "models/**/*", "config/**/*", "index.js", "static/**/*"],
    port: 3000,
    notify: false,
    reloadDelay: 100,
    open: false
  };
  