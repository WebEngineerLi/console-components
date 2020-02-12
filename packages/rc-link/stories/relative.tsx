import React from 'react'
import Link from '@alicloud/console-components-link'
import { Switch, Route } from 'dva/router'
import FakeBrowser from '@alicloud/console-components-fake-browser'

const Relative: React.FC<{}> = () => {
  return (
    <div>
      <Link to="relative" relative>
        Relative Link
      </Link>
    </div>
  )
}

const AppRouter: React.FC<{}> = () => (
  <Switch>
    <Route path="/" component={Relative} />
    <Route path="*" component={Relative} />
  </Switch>
)

// 这里仅为 Demo 展示方便，项目中直接使用 <AppRouter /> 即可

const newProps = {
  style: { height: '200px' },
}

const App: React.FC<{}> = () => (
  <FakeBrowser
    // style={{ height: '500px' }}
    {...newProps}
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
