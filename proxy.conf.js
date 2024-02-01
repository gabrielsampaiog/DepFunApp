const proxy = [
  {
    context: '/api',
    target: 'http://localhost:5047',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;