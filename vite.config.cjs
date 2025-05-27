module.exports = {
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
};
