import React, { Fragment } from 'react'
import Meta from '../components/Meta'
import App from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import 'typeface-source-sans-pro'
import withApollo from '../lib/apollo'
import theme from '../lib/theme'

declare interface Props {
  apollo: ApolloClient<any>
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: #293335;
    background: #f6f6f6;
    font-size: 17px;
    line-height: 1.6;
  }
  html, body, #__next {
    height: 100%;
  }
  * {
    font-family: ${theme.fonts.body};
  }
  pre {
    font-family: ${theme.fonts.monospace};
  }

  /* --------------------------------------- */
  /* ----- Headings ----- */
  /* --------------------------------------- */

  h1,
  h2,
  h3 {
    line-height: 1;
  }

  h1 {
    font-weight: 300;
  }

  h2, h3 {
    font-weight: 400;
  }

  a {
    color: #0074D9;
  }
`

class BaseApp extends App<Props> {
  public render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <Fragment>
        <GlobalStyle />
        <Meta />
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Fragment>
    )
  }
}

export default withApollo(BaseApp)
