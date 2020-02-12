import React from 'react'
import Link from '@alicloud/console-components-link'
import { Switch, Route } from 'dva/router'
import FakeBrowser from '@alicloud/console-components-fake-browser'

const Basic: React.FC<{}> = () => {
  return (
    <div>
      <div>在原页面打开</div>
      <p>
        <Link target="_top" to="/nav">
          Navigator
        </Link>
      </p>
      <br />
      <br />
      <div>打开新页面</div>
      <p>
        <Link to="/nav" target="_blank">
          Navigator
        </Link>
      </p>
    </div>
  )
}

const AppRouter: React.FC<{}> = () => (
  <Switch>
    <Route path="/" component={Basic} />
    <Route path="*" component={Basic} />
  </Switch>
)

// 这里仅为 Demo 展示方便，项目中直接使用 <AppRouter /> 即可
const App: React.FC<{}> = () => (
  <FakeBrowser
    key={Date.now()}
    // position="fixed"
    // width="600px"
    // height="auto"
    // left="0"
    // top="0"
    // bottom="40px"
  >
    <AppRouter />
  </FakeBrowser>
)

export default App
