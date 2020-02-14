import * as React from 'react'
import '@alicloud/console-components/dist/wind.css'
import { storiesOf } from '@storybook/react'
import BasicDemo from './basic'
import WithoutFieldDemo from './selectorWithoutField'

storiesOf('WindRcSelector', module)
  .add('BasicDemo', () => <BasicDemo />)
  .add('WithoutFieldDemo', () => <WithoutFieldDemo />)
