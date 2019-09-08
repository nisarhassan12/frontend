import React, { Fragment, useState, useEffect, useRef, FormEvent } from 'react'
import { Heading } from 'rebass'
import Router from 'next/router'
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
  const [err, setErr] = useState<string>('')

  const sendForm = async (e: FormEvent<HTMLFormElement>) => {
    const formElement = e.currentTarget

    e.preventDefault()

    console.log(formElement)

    const captchaIsValid = await verifyCaptcha(captchaText, captchaId)

    if (captchaIsValid) {
      const formContent = new FormData(formElement)

      if (formElement.reportValidity()) {
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
            res.status === 200 || 301 ? Router.push('/verify_email') : setErr(err)
          })
          .catch((e: ErrorEvent) => console.log(e.message))
      }
    } else {
      setErr('Captcha did not match')
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
          <Form body={registerFormBody(setName, pwd)} onSubmit={sendForm}>
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
            {err}
          </Form>
        </BasicContainer>
      </Page>
    </Fragment>
  )
}

export default Register
