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

    const captchaIsValid = await verifyCaptcha(captchaText, captchaId)

    console.log(captchaIsValid)

    if (captchaIsValid) {
      const formContent = new FormData(formElement)

      if (formElement.reportValidity()) {
        fetch(`${process.env.API}/reg`, {
          method: 'POST',
          body: formContent,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Captcha': `${captchaId}:${captchaText}`
          }
        })
          .then(async (res: Response) => {
            res.status === 200 || res.status === 301 ? Router.push('/verify_email') : setErr(await res.text())
          })
          .catch((e: ErrorEvent) => setErr(e.error))
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
