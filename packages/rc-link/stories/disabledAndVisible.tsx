import React, { useState, useCallback } from 'react'
import Link from '@alicloud/console-components-link'
import { Button } from '@alicloud/console-components'

const Disabled: React.FC<{}> = () => {
  const [visible, setVisible] = useState(true)
  const [disabled, setDisabled] = useState(true)

  const handleVisibleChange = useCallback((): void => {
    setVisible(!visible)
  }, [visible])

  const handleDisabledChange = useCallback((): void => {
    setDisabled(!disabled)
  }, [disabled])

  return (
    <div style={{ margin: '30px' }}>
      <h3>禁用-disabled</h3>
      <Button
        type="primary"
        style={{ marginRight: '16px' }}
        onClick={handleDisabledChange}
      >
        禁用/可用
      </Button>
      <Link
        style={{ marginRight: '16px' }}
        shape="button"
        type="primary"
        href="http://www.taobao.com"
        disabled={disabled}
      >
        disabled
      </Link>
      <Link href="http://www.taobao.com" disabled={disabled}>
        disabled
      </Link>
      <h3>显示-visible</h3>
      <Button
        type="primary"
        style={{ marginRight: '16px' }}
        onClick={handleVisibleChange}
      >
        显示/隐藏
      </Button>
      <Link visible={visible} href="http://www.taobao.com">
        visible
      </Link>
      <Link
        visible={visible}
        style={{ marginLeft: '16px' }}
        shape="button"
        type="primary"
        href="http://www.taobao.com"
      >
        visible
      </Link>
    </div>
  )
}

export default Disabled
