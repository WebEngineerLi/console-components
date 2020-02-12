import * as React from 'react'
import '@alicloud/console-components/dist/wind.css'
import { storiesOf } from '@storybook/react'
import Basic from './basic'
import Normal from './normal'
import Button from './buttonLink'
import Relative from './relative'
import Disabled from './disabledAndVisible'

storiesOf('WindRcLink', module)
  .add('Basic', () => <Basic />)
  .add('Normal', () => <Normal />)
  .add('Button', () => <Button />)
  .add('Relative', () => <Relative />)
  .add('Disabled', () => <Disabled />)
