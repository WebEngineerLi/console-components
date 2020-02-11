import React from 'react'
import IconButton from '@alicloud/console-components-icon-button'

const Basic: React.FC<{}> = () => (
  <div style={{ padding: 40 }}>
    <h3>Normal</h3>
    <p>
      <IconButton icon="smile" />
    </p>
    <h3>Primary</h3>
    <p>
      <IconButton icon="smile" type="primary" />
    </p>
  </div>
)

export default Basic
