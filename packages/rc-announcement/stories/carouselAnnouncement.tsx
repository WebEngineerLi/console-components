import React from 'react'
import styled from 'styled-components'
import RcAnnouncement from '@alicloud/console-components-announcement'

const dataSource = [
  {
    title: '这是一条提示信息1',
  },
  {
    title: '这是一条提示信息2',
  },
  {
    title: '这是一条提示信息3',
  },
]

const CarouselDemo: React.FC<{}> = () => (
  <Wrapper>
    <h2>可轮播的信息提示</h2>
    <RcAnnouncement sliderOptions={{  autoplay: false }} closeable type="success" dataSource={dataSource} />
    <RcAnnouncement sliderOptions={{  autoplay: false }} closeable type="warning" dataSource={dataSource} />
    <RcAnnouncement sliderOptions={{  autoplay: false }} closeable type="error" dataSource={dataSource} />
    <RcAnnouncement sliderOptions={{  autoplay: false }} closeable type="info" dataSource={dataSource} />
    <RcAnnouncement sliderOptions={{  autoplay: false }} closeable type="notice" dataSource={dataSource} />
  </Wrapper>
)

export default CarouselDemo

const Wrapper = styled.div`
  > div {
    margin-bottom: 8px;
  }
  > h2 {
    margin-left: 16px;
  }
`
