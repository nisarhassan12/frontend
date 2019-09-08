import styled, { css } from 'styled-components'
import { Flex } from 'rebass'

export const Button = styled.button<{ variant: string }>`
  border-radius: 2rem;
  border: none;
  padding: 0.6rem;
  ${({ theme, variant }) => css`
    color: ${theme[variant].button.color};
    background: ${theme[variant].button.background};
  `};
  :hover {
    ${({ theme, variant }) => css`
      color: ${theme[variant].button.hover.color};
      background: ${theme[variant].button.hover.background};
    `}
    cursor: pointer;
  }
`

export const Input = styled.input`
  border-radius: 2rem;
  border: none;
  padding: 0.6rem;
  background: ${({ theme }) => theme.primary.input.background};
`

export const HelpButton = styled.a`
  border: none;
  font-size: 1em;
  line-height: 2;
  margin-left: 0.1em;
  display: inline-block;
  text-align: center;
  margin-top: 0;
`

export const BasicContainer = styled.div`
  border-radius: 1em;
  background: white;
  box-shadow: 9px 10px 52px 9px hsla(0, 0%, 0%, 0.17);
  padding: 0.7em 2em;
`

export const Page = styled(Flex)`
  height: 100%;
`
