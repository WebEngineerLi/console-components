import React from 'react'
import intl, { withRcIntl } from '@alicloud/console-components-intl-core'

const messages = {
  'text.normal': 'This is a normal text.',
  'text.normal.with.non.runtime': 'This is a normal text with non-runtime.',
  'text.normal.with.chinese': '这是一段优美的文字',
  'text.with.html': 'This is <span style="color: red">{text}</span> text.',
  '@wind_v2.base.Pagination.prev': 'Prev page',
}

intl.setMessages({
  'common.confirm': '确认',
})

const App: React.FC<any> = (props) => {
  console.log('props:', props)
  return (
    <div style={{ marginLeft: '16px' }}>
      <h2>基本用法</h2>
    </div>
  )
}

export default withRcIntl({
  defaultMessages: messages,
  componentName: 'App',
  warningIfNoMessageFromCtx: false,
})(App)
