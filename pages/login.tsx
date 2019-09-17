import React, { Fragment, useState } from 'react'
import { Button } from 'rebass/styled-components'
import { BasicContainer, Page } from '../components/Primitives'
import NavBar from '../components/Layout/NavBar'
import Form from '../components/Layout/Form'

const Login = () => {
  const [name, setName] = useState<string>('')

  return (
    <Fragment>
      <NavBar />
      <Page alignItems="center" justifyContent="center" flexDirection="column">
        <h1>Welcome back, {name}!</h1>
        <BasicContainer>
          <Form
            onSubmit={() => {}}
            body={[
              {
                slug: 'Username',
                name: 'username',
                type: 'text',
                required: true,
                onInput: e => setName(e.currentTarget.value),
                placeholder: 'How were you called?'
              },
              {
                slug: 'Password',
                name: 'password',
                placeholder: 'What was your password?',
                required: true
              }
            ]}>
            <Button variant="secondary" type="submit">
              Sign In
            </Button>
          </Form>
        </BasicContainer>
      </Page>
    </Fragment>
  )
}

export default Login
