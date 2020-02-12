import React from 'react'
import Link from '@alicloud/console-components-link'

const Normal: React.FC<{}> = () => {
  return (
    <div style={{ margin: '30px' }}>
      <div>本页面打开</div>
      <p>
        <Link href="https://taobao.com">Normal Link</Link>
      </p>
      <br />
      <br />
      <div>打开新页面</div>
      <p>
        <Link href="https://taobao.com" target="_blank">
          Normal Link
        </Link>
      </p>
    </div>
  )
}

export default Normal
