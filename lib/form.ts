import { encode as arrayBufferToBase64 } from 'base64-arraybuffer'
import { RefObject, FormEvent } from 'react'
import 'isomorphic-unfetch'

export const verifyCaptcha = async (digits: string, captchaId: string): Promise<boolean> => {
  const res = await fetch(`${process.env.API}/captcha/verify?digits=${digits}`, {
    method: 'GET',
    headers: {
      'X-Captcha-ID': captchaId
    }
  })

  if (res.status === 200) {
    return true
  } else {
    return false
  }
}

export const getCaptcha = (captcha: RefObject<HTMLImageElement>, setCaptchaId: Function) => {
  fetch(`${process.env.API}/captcha/get`, {
    method: 'GET'
  })
    .then(res => {
      const id = res.headers.get('X-Captcha-Id')
      setCaptchaId(id)
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
