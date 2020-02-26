import React from 'react'
import styled from 'styled-components'
import RcAnnouncement from '@alicloud/console-components-announcement'

const dataSource = [
  {
    title: '标题标题',
    content:
      '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内',
  },
  {
    title: '标题标题2',
    content: '内容内容内容内容内容内容内容内容',
  },
  {
    title: '标题标题3',
    content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内',
  },
]

const LargeDemo: React.FC<{}> = () => (
  <Wrapper>
    <h2>强化消息提示</h2>
    <RcAnnouncement sliderOptions={{  autoplay: false }} closeable type="success" dataSource={dataSource} />
    <RcAnnouncement sliderOptions={{  autoplay: false }} closeable type="warning" dataSource={dataSource} />
    <RcAnnouncement sliderOptions={{  autoplay: false }} closeable type="error" dataSource={dataSource} />
    <RcAnnouncement sliderOptions={{  autoplay: false }} closeable type="info" dataSource={dataSource} />
    <RcAnnouncement sliderOptions={{  autoplay: false }} closeable type="notice" dataSource={dataSource} />
  </Wrapper>
)

export default LargeDemo

const Wrapper = styled.div`
  > div {
    margin-bottom: 8px;
  }
  > h2 {
    margin-left: 16px;
  }
`
