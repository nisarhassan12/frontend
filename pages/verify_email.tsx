import React, { Fragment } from 'react'
import { Flex } from 'rebass/styled-components'
import { BasicContainer } from '../components/Primitives'
import NavBar from '../components/Layout/NavBar'

const VerifyEmail = () => (
  <Fragment>
    <NavBar />
    <Flex style={{ height: '80vh' }} alignItems="center" justifyContent="center">
      <BasicContainer>
        <h1>Check your email</h1>
      </BasicContainer>
    </Flex>
  </Fragment>
)

export default VerifyEmail
