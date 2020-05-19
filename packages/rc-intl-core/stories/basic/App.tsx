import React from 'react'
import intl, { withProvider } from '@alicloud/console-components-intl'
import Child from './index'

intl.setMessages({
  'common.confirm': '确认',
  '@wind_v2.rc.App.common.delete': '删除',
})

const App = () => {
  return <Child />
}

export default withProvider()(App)
