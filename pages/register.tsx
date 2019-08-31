import React, { Fragment, useState, useEffect, useRef, FormEvent } from 'react'
import { Heading } from 'rebass'
// import Router from 'next/router'
import { Button, BasicContainer, Page } from '../components/Primitives'
import NavBar from '../components/Layout/NavBar'
import Form from '../components/Layout/Form'
import Captcha from '../components/Captcha'
import { newPwd, getCaptcha, registerFormBody, verifyCaptcha } from '../lib/form'
import 'isomorphic-unfetch'

const Register = () => {
  const [name, setName] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [pwdLevel, setPwdLevel] = useState<string>('off')
  const [captchaId, setCaptchaId] = useState<string>('')
  const [captchaText, setCaptchaText] = useState<string>('')

  const sendForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(captchaText)

    verifyCaptcha(captchaText).then(a => console.log(a))

    if (verifyCaptcha(captchaText)) {
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
            console.log(res.status)
            // res.status === 200 || 301 ? Router.push('/verify_email') : console.log(res.status)
          })
          .catch((e: ErrorEvent) => console.log(e.message))
      }
    } else {
      if (window) alert('Wrong captcha!')
      getCaptcha(captcha, setCaptchaId)
    }
  }

  const captcha = useRef<HTMLImageElement>(null)

  useEffect(() => newPwd(setPwd, pwdLevel), [pwdLevel])

  useEffect(() => getCaptcha(captcha, setCaptchaId), [])

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
              <Captcha captcha={captcha} setCaptchaText={setCaptchaText} />
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
