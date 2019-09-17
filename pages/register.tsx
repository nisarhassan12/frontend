import React, { Fragment, useState, useEffect, useRef, FormEvent } from 'react'
import { Button } from 'rebass/styled-components'
import { Checkbox, Label } from '@rebass/forms'
import Router from 'next/router'
import { BasicContainer, Page } from '../components/Primitives'
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
        <h1>Hello {name}!</h1>
        <BasicContainer>
          <Form body={registerFormBody(setName, pwd)} onSubmit={sendForm}>
            <Label>
              Complex password:
              <Checkbox id="check" value={pwdLevel} onClick={() => setPwdLevel(pwdLevel === 'on' ? 'off' : 'on')} />
            </Label>
            <Captcha captcha={captcha} setCaptchaText={setCaptchaText} />
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
