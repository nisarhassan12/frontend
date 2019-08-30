import { encode as arrayBufferToBase64 } from 'base64-arraybuffer'
import { RefObject, FormEvent } from 'react'

export const verifyCaptcha = (digits: string, setValidCaptcha: Function) => {
  fetch(`${process.env.API}/captcha/verify?digits=${digits}`).then(res => {
    if (res.status === 200) {
      setValidCaptcha(true)
    } else {
      setValidCaptcha(false)
    }
  })
}

export const getCaptcha = (captcha: RefObject<HTMLImageElement>, setCaptchaId: Function) => {
  fetch(`${process.env.API}/captcha/get`)
    .then(res => {
      setCaptchaId(res.headers.get('X-Captcha-Id'))
      return res.arrayBuffer()
    })
    .then(buf => {
      const imageStr = arrayBufferToBase64(buf)
      if (captcha.current) {
        captcha.current.src = `data:image/jpeg;base64,${imageStr}`
      }
    })
}

export const newPwd = (setPwd: Function, pwdLevel: string) => {
  fetch(`${process.env.API}/rand${pwdLevel === 'on' ? '' : '_dict'}`)
    .then(res => res.text())
    .then(text => setPwd(text))
}

export const registerFormBody = (setName: Function, pwd: string) => [
  {
    name: 'username',
    type: 'text',
    required: true,
    onInput: (e: FormEvent<HTMLInputElement>) => setName(e.currentTarget.value),
    placeholder: 'How we can call you?',
    slug: 'Username'
  },
  {
    slug: 'Email',
    name: 'email',
    type: 'email',
    required: true,
    placeholder: 'hello@example.com',
    help: 'Email is only used for verification link and nothing else.'
  },
  {
    slug: 'Password',
    name: 'password',
    value: pwd,
    readOnly: true,
    help:
      'For better security, an algorithm generates a password instead of a person. It removes the human factor with passwords like "P@$$word123"'
  }
]
