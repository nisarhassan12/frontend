const withImages = require('next-images')

module.exports = withImages({
  target: 'serverless',
  env: {
    API: 'https://api.komfy.now.sh'
  }
})
