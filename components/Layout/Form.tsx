import React, { InputHTMLAttributes, FormEvent, ReactNode, Fragment } from 'react'
import styled from 'styled-components'
import Tooltip from 'react-tooltip'
import { Flex } from 'rebass'
import { Input, HelpButton } from '../Primitives'

declare interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  slug?: string
  help?: ReactNode
}

declare interface FormInterface {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  children?: ReactNode
  body: InputProps[]
}

const StyledForm = styled.form`
  & > input:disabled {
    color: black;
  }
  h2 {
    font-size: 1.2em;
    margin-bottom: 0.5em;
    display: inline-block;
  }
  button {
    display: block;
    width: 100%;
    margin-top: 0.5em;
  }
`

const Form = ({ onSubmit, children, body }: FormInterface) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      {body.map((field: InputProps, i: number) => (
        <Fragment>
          <Flex>
            <h2>{field.slug}</h2>
            {field.help && (
              <Fragment>
                <HelpButton data-tip data-for={field.name}>
                  ?
                </HelpButton>
                <Tooltip id={field.name} aria-haspopup={true} role="info">
                  {field.help}
                </Tooltip>
              </Fragment>
            )}
          </Flex>
          <Input key={i} {...field} />
        </Fragment>
      ))}
      {children}
    </StyledForm>
  )
}

export default Form
