import React, { RefObject } from 'react'
import { Input, HelpButton } from './Primitives'
import { Flex, Image } from 'rebass/styled-components'
import Tooltip from 'react-tooltip'

declare interface CaptchaInterface {
  setCaptchaText: (e: any) => void
  captcha: RefObject<HTMLImageElement>
}

const Captcha = ({ setCaptchaText, captcha }: CaptchaInterface) => (
  <Flex flexDirection="column">
    <Flex flexDirection="row">
      <h2>Captcha</h2>
      <HelpButton data-tip data-for="captcha">
        ?
      </HelpButton>
      <Tooltip id="captcha" aria-haspopup={true} role="info">
        We use captcha to prevent spam accounts. To complete it, just don't be a robot.
      </Tooltip>
    </Flex>
    <Image
      sx={{
        height: '40px'
      }}
      ref={captcha}
    />
    <Input autoComplete="off" id="captcha" onChange={e => setCaptchaText(e.target.value)} placeholder="Captcha text" />
  </Flex>
)

export default Captcha
