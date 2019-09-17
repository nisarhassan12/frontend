import React, { ReactNode } from 'react'
import Link from 'next/link'
import { Flex } from 'rebass'
import styled from 'styled-components'

declare interface NavBarInterface {
  items?: { text: string; href: string }[]
  children?: JSX.Element[] | JSX.Element
}

const LinksGroup = styled.div`
  a {
    margin-left: 2em;
    color: whitesmoke;
    font-size: 1.2em;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const StyledNav = styled(Flex)`
  padding: 0.5rem 2em 0.5em 1em;
  background: black;
  position: fixed;
  top: 0;
  left: 0;
`

const Icon = styled.img`
  height: 40px;
  width: 100%;
`

const NavBar = ({
  items = [
    {
      text: 'Sign In',
      href: '/login'
    },
    {
      text: 'Sign Up',
      href: '/register'
    }
  ]
}: NavBarInterface) => {
  return (
    <StyledNav flexWrap="wrap" flexDirection="row" width={1} alignItems="center" justifyContent="space-between">
      <Link href="/">
        <a>
          <Icon src="../../static/logo.svg" />
        </a>
      </Link>
      <LinksGroup>
        {items.map((el: { href: string; text: ReactNode }) => (
          <Link href={el.href} key={el.href}>
            <a>{el.text}</a>
          </Link>
        ))}
      </LinksGroup>
    </StyledNav>
  )
}

export default NavBar
