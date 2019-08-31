import React, { Fragment, useState } from 'react'
import { Flex, Heading } from 'rebass'
import { Button, BasicContainer } from '../components/Primitives'
import NavBar from '../components/Layout/NavBar'
import Form from '../components/Layout/Form'

const Login = () => {
  const [name, setName] = useState<string>('')

  return (
    <Fragment>
      <NavBar />
      <Flex
        style={{
          height: '90vh'
        }}
        alignItems="center"
        justifyContent="center"
        flexDirection="column">
        <Heading as="h1" textAlign="center" fontSize="calc(1.8em + 2vw)">
          Welcome back, {name}!
        </Heading>
        <BasicContainer>
          <Form
            sendForm={() => {}}
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
      </Flex>
    </Fragment>
  )
}

export default Login
