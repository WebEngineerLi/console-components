import React from 'react'
import IconButton from '@alicloud/console-components-icon-button'

export default () => (
  <div style={{ padding: 40 }}>
    <h3>Normal</h3>
    <p>
      <IconButton icon="smile">Smile</IconButton>
    </p>
    <h3>Primary</h3>
    <p>
      <IconButton icon="smile" type="primary">
        Smile
      </IconButton>
    </p>
  </div>
)
