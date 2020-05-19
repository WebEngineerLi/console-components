import React from 'react'
import {
  IWindIntlPublic,
  createReactIntlFromCfg,
  withRcIntl,
} from '@alicloud/console-components-intl-core'

const intl = createReactIntlFromCfg()

intl.set({
  messages: {
    '@wind_v2.rc.RComponent.test': '测试',
    '@wind_v2.rc.RComponent.cancel': '取消',
  },
})

const RComponent: React.FC<{ intl: IWindIntlPublic }> = ({ intl: intl0 }) => (
  <div style={{ marginLeft: '16px' }}>
    <h2>通过使用withRcIntl，让你的组件拥有可动态配置的文案。</h2>
    <p>{intl0('test')}</p>
  </div>
)

const RComponentWithIntl = withRcIntl({
  componentName: 'RComponent',
})(RComponent)

const Demo: React.FC = intl.withProvider()(() => {
  return <RComponentWithIntl />
})

export default Demo
