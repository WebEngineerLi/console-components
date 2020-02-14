import React, { useState } from 'react'
import { Button } from '@alicloud/console-components'
import Selector from '@alicloud/console-components-selector'
import styled from 'styled-components'

const generateDataSource = (() => {
  const _dataSource = []
  for (let i = 0; i < 10; i++) { // eslint-disable-line
    if (i === 3) {
      _dataSource.push({
        label: `Option ${i}`,
        value: `Option ${i}`,
        disabled: true,
      })
    } else {
      _dataSource.push({
        label: `Option ${i} Available`,
        value: Math.random().toString(),
      })
    }
  }
  return _dataSource
})()

const Basic: React.FC<{}> = () => {
  const [dataSource, setDataSource] = useState(generateDataSource)
  const [pageNumber, setPageNumber] = useState(0)
  const [totalCount, setTotalCount] = useState(55)
  const [value, setValue] = useState()

  const handleChange = (v: string | string[]): void => {
    setValue(v)
  }
  const handleSubmit = (): void => {
    console.log('value:', value)
  }

  return (
    <Wrapper>
      <Selector
        width="380px"
        placeholder="请选择弹性公网IP"
        searchPlaceholder="输入ID进行精确搜索"
        noDataTip={<span>当前状态：没有找到弹性公网IP</span>}
        noDataGuide={
          <div>
            <a href="/#/Selector">购买弹性公网IP</a>
          </div>
        }
        value={value}
        multiple
        dataSource={dataSource}
        pageNumber={pageNumber}
        totalCount={totalCount}
        onChange={handleChange}
        searchIndex="IpAddress"
        onLoad={(param, extra) => {
          console.log(param, extra)
          setTimeout(() => {
            if (extra && extra.clear) {
              setDataSource([])
              setPageNumber(param.PageNumber)
            } else {
              setDataSource([
                ...dataSource,
                {
                  label: `Some Year Later ${Math.random()}`,
                  value: `${Math.random()}`,
                },
              ])
              setPageNumber(param.PageNumber)
            }
          }, 500)
        }}
      />
      <Button style={{ marginLeft: '20px' }} onClick={handleSubmit}>
        提交
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 20px;
  .wind-selector {
    display: inline-block;
  }
`

export default Basic
