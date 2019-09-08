import React from 'react'
import Router from 'next/router'
import cookies from 'nookies'

const SetCookie = () => <h1>Redirecting to Sign In...</h1>

SetCookie.getInitialProps = async (ctx: any) => {
  const { req, res, query } = ctx

  if (!query.verify_code) {
    res.statusCode = 400
    res.end('Verify code not found')
  } else {
    const verify_code = query.verify_code.toString()

    cookies.set({ req, res }, 'jwt-token', verify_code, {})
    if (res) {
      res.writeHead(302, {
        Location: '/login'
      })
      res.end()
    } else {
      Router.push('/login')
    }
  }

  return {}
}

export default SetCookie
