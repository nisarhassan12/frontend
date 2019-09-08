// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images')

module.exports = withImages({
  target: 'serverless',
  env: {
    API: process.env.NODE_ENV === 'production' ? 'https://api.komfy.now.sh' : 'http://localhost:8080'
  }
})
