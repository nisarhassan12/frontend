/* eslint-disable @typescript-eslint/no-var-requires */

const withImages = require('next-images')
const withFonts = require('next-fonts')
const withCss = require('@zeit/next-css')

module.exports = withCss(
  withFonts(
    withImages({
      target: 'serverless',
      env: {
        API: process.env.NODE_ENV === 'production' ? 'https://api.komfy.now.sh' : 'http://localhost:8080'
      }
    })
  )
)
