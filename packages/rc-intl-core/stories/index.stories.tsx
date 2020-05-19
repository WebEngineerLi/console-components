import * as React from 'react'
import '@alicloud/console-components/dist/wind.css'
import { storiesOf } from '@storybook/react'
import BasicDemo from './basic/App'
import WithRcIntl from './withRcIntl'

storiesOf('WindIntl', module).add('BasicDemo', () => <BasicDemo />)
storiesOf('WithRcIntl', module).add('WithRcIntl', () => <WithRcIntl />)
