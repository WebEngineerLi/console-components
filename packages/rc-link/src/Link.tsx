import React, { Component } from 'react'
import { Link as RouteLink, LinkProps } from 'dva/router'
import { endue } from './endue'
import relative from './relative'
import { GetFusionConfig } from './utils'

interface IState {
  failedOnReactRouterLink: boolean
}

/**
 * @public
 */
export interface ILinkProps {
  /**
   * 样式名
   * @public
   */
  className?: string
  /**
   * 样式
   * @public
   */
  style?: React.CSSProperties
  /**
   * 是否禁用
   * @public
   * @defaultValue `false`
   */
  disabled?: boolean | ((path: string) => boolean)
  /**
   * 是否显示
   * @public
   * @defaultValue `true`
   */
  visible?: boolean | ((path: string) => boolean)
  /**
   * 表现形式
   * @public
   * @defaultValue `text`
   */
  shape?: 'text' | 'button'
  /**
   * 强调类型，目前只在 shape="button" 时生效，可选值为 normal（默认） primary secondar
   * @public
   * @defaultValue `normal`
   */
  type?: 'normal' | 'primary' | 'secondary'
  /**
   * 尺寸，目前只在 shape="button" 时生效
   * @public
   * @defaultValue `medium`
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 外链链接
   * @public
   */
  href?: string
  /**
   * 内链链接
   * @public
   */
  to?: string
  /**
   * 点击事件
   * @public
   */
  onClick?: (e: React.BaseSyntheticEvent) => void
  /**
   * 是否是相对地址
   * @public
   */
  relative?: boolean
  /**
   * 子节点
   * @public
   */
  children?: React.ReactNode
  /**
   * 规定在何处打开链接, 可参照a标签的target
   * @public
   */
  target?: string
}

class Link extends Component<ILinkProps, IState> {
  static getDerivedStateFromError(): IState {
    return {
      failedOnReactRouterLink: true,
    }
  }

  constructor(props: ILinkProps) {
    super(props)
    this.state = {
      failedOnReactRouterLink: false,
    }
  }

  componentDidCatch(err: Error | null): void {
    if (err) {
      this.setState({
        failedOnReactRouterLink: true,
      })
      console &&
        console.warn(
          'Failed on render <Link> component, will use <a> to instead of it.'
        )
    }
  }

  render(): React.ReactNode {
    const { failedOnReactRouterLink } = this.state
    if (failedOnReactRouterLink) {
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a {...this.props} />
    }

    return <RouteLink {...(this.props as LinkProps)} />
  }
}

export default relative(GetFusionConfig(endue({ renderHrefLinkAs: 'a' })(Link)))
