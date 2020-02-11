import React from 'react'
import '@alicloud/console-components/dist/wind.css'
import { storiesOf } from '@storybook/react'
import Basic from './basic'
import Contentable from './contentable'

storiesOf('wind-rc-icon-button', module)
  .add('Basic', () => {
    return <Basic />
  })
  .add('Contentable', () => {
    return <Contentable />
  })
