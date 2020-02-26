import React, { useMemo, useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Message } from '@alicloud/console-components'
import classnames from 'classnames'
import Title from './Title'
import iconMap from './config/iconMap'
import {
  extractSliderOptions,
  GetFusionConfig,
  IFusionConfigProps,
  getMaxMessageHeight,
} from './utils'
import { SDots, SSlider, SWrapper, SMessageItem } from './styles'

/**
 * 轮播属性
 * @public
 */
export interface ISliderOptions {
  /**
   * 是否自动播放
   * @defaultValue `true`
   */
  autoplay?: boolean
  /**
   * 自动播放速度
   * @defaultValue `3000`
   */
  autoplaySpeed?: number
  /**
   * 切换速度
   * @defaultValue `600`
   */
  speed?: number
  /**
   * 轮播切换的回调函数
   */
  onChange?: (index: number) => void
  /**
   * 轮播切换动画
   * @defaultValue `slide`
   */
  animation?: 'fade' | 'slide'
}

/**
 * dataSource的属性
 * @public
 */
export interface IDataSourceItem {
  /**
   * 标题
   */
  title: React.ReactNode
  /**
   * 内容
   */
  content?: React.ReactNode
  /**
   * 链接
   */
  link?: React.ReactNode
}

/**
 * Message的属性
 * @public
 */
export interface IRcAnnouncementProps {
  /**
   * 内容, 数组类型，最多支持三条内容，多余的会被移除, 详情见下dataSource
   */
  dataSource: Array<IDataSourceItem>
  /**
   * 是否可关闭
   * @defaultValue `false`
   */
  closeable?: boolean
  /**
   * 类型
   * @defaultValue `success`
   */
  type?: 'success' | 'error' | 'notice' | 'warning' | 'info'
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 自定义样式
   */
  style?: React.CSSProperties
  /**
   * 轮播属性，继承Slider的部分属性，详情见下sliderOptions
   */
  sliderOptions?: ISliderOptions
}

const RcAnnouncement: React.FC<IRcAnnouncementProps & IFusionConfigProps> = ({
  dataSource = [],
  type = 'success',
  className,
  closeable = false,
  sliderOptions,
  style,
  fusionConfig,
}) => {
  const refArray = [useRef(null), useRef(null), useRef(null)]

  const [maxMessageHeight, setMaxMessageHeight] = useState(0)

  const exactDataSource = useMemo(() => {
    return dataSource.length > 3 ? dataSource.slice(0, 3) : dataSource
  }, [dataSource])

  const exactSize = useMemo(() => {
    return exactDataSource.some(item => item.content) ? 'large' : 'medium'
  }, [exactDataSource])

  useLayoutEffect(() => {
    const maxHeight = getMaxMessageHeight(refArray, exactDataSource.length)
    setMaxMessageHeight(maxHeight)
  }, [exactDataSource.length, refArray])

  const { prefix = 'next-' } = fusionConfig

  const renderMessageList = (
    data: IRcAnnouncementProps['dataSource']
  ): React.ReactNode[] =>
    data.map((item: IDataSourceItem, index: number) => (
      <SMessageItem
        prefix={prefix}
        className={classnames({
          'large-message': !!item.content,
          'medium-message': !item.content,
        })}
        style={{ height: maxMessageHeight ? `${maxMessageHeight}px` : 'auto' }}
        ref={refArray[index]}
        // eslint-disable-next-line react/no-array-index-key
        key={`${item.title}-${index}`}
        title={<Title title={item.title} link={item.link} />}
        iconType={iconMap[type]}
        type={type === 'info' ? 'help' : type}
        size="medium"
        closeable={false}
      >
        {item.content}
      </SMessageItem>
    ))

  return (
    <SWrapper prefix={prefix} size={exactSize}>
      <Message
        type={type === 'info' ? 'help' : type}
        closeable={closeable}
        className={classnames(className)}
        style={style}
      >
        <SSlider
          closeable={closeable}
          total={exactDataSource.length || 0}
          type={type === 'info' ? 'help' : type}
          prefix={prefix}
          autoplay
          {...extractSliderOptions(sliderOptions || {})}
          dotsClass="dots-cust"
          dotsDirection="ver"
          slideDirection="ver"
          size={exactSize}
          arrows={false}
          dotsRender={() => <SDots className="dots" />}
        >
          {renderMessageList(exactDataSource)}
        </SSlider>
      </Message>
    </SWrapper>
  )
}

/**
 * @public
 */
const defaultExp: React.FC<IRcAnnouncementProps> = GetFusionConfig(
  RcAnnouncement
)
export default defaultExp
