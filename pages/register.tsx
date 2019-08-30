import React, { Fragment, useState, useEffect, useRef, FormEvent } from 'react'
import { Heading } from 'rebass'
import Router from 'next/router'
import { Button, BasicContainer, Page } from '../components/Primitives'
import NavBar from '../components/Layout/NavBar'
import Form from '../components/Layout/Form'
import { newPwd, getCaptcha, registerFormBody } from '../lib/form'
import 'isomorphic-unfetch'

const Register = () => {
  const [name, setName] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [pwdLevel, setPwdLevel] = useState<string>('off')
  const [captchaId, setCaptchaId] = useState<string>('')
  const [validCaptcha, setValidCaptcha] = useState(false)

  const sendForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formElement = e.currentTarget

    const formContent = new FormData(formElement)

    if (!formElement.reportValidity()) {
      fetch(`${process.env.API}/reg`, {
        method: 'POST',
        body: formContent,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Captcha-Id': captchaId
        }
      })
        .then((res: Response) => {
          res.status === 200 || 301 ? Router.push('/verify_email') : console.log(res.status)
        })
        .catch((e: ErrorEvent) => console.log(e.message))
    }
  }

  const captcha = useRef<HTMLImageElement>(null)

  useEffect(() => newPwd(setPwd, pwdLevel), [pwdLevel])
  useEffect(() => {
    getCaptcha(captcha, setCaptchaId)
  }, [validCaptcha])

  return (
    <Fragment>
      <NavBar />
      <Page alignItems="center" justifyContent="center" flexDirection="column">
        <Heading as="h1" textAlign="center" fontSize="calc(1.8em + 2vw)">
          Hello {name}!
        </Heading>
        <BasicContainer>
          <Form body={registerFormBody(setName, pwd)} sendForm={sendForm}>
            <div>
              Complex password:
              <input
                type="checkbox"
                id="check"
                value={pwdLevel}
                onClick={() => setPwdLevel(pwdLevel === 'on' ? 'off' : 'on')}
              />
              <div>
                <input />
                <img ref={captcha} />
              </div>
            </div>
            <Button type="button" variant="primary" onClick={() => newPwd(setPwd, pwdLevel)}>
              Create password
            </Button>
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </Form>
        </BasicContainer>
      </Page>
    </Fragment>
  )
}

export default Register
