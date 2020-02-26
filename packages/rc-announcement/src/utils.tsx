import React from 'react'
import ReactDOM from 'react-dom'
import { pick } from 'lodash'
import { ConfigProvider } from '@alicloud/console-components'
import { ISliderOptions } from './RcAnnouncement'

/**
 * @public
 */
export interface IFusionConfig {
  prefix?: string
}

/**
 * @public
 */
export interface IFusionConfigProps {
  fusionConfig: IFusionConfig
}

export function GetFusionConfig<
  PropType extends { fusionConfig: IFusionConfig }
>(Wrapped: React.ComponentType<PropType>) {
  const ConfifgConsumer: any = (ConfigProvider as any).Consumer
  const HOC: React.FC<Omit<PropType, 'fusionConfig'>> = props => (
    <ConfifgConsumer>
      {(context: IFusionConfig) => (
        <Wrapped {...(props as PropType)} fusionConfig={context} />
      )}
    </ConfifgConsumer>
  )
  return HOC
}

export const extractSliderOptions = (
  sliderOptions: ISliderOptions = {}
): ISliderOptions => {
  return (
    pick(sliderOptions, [
      'autoplay',
      'autoplaySpeed',
      'speed',
      'onChange',
      'animation',
    ]) || {}
  )
}

export const getMaxMessageHeight = (
  messageRefs: any[],
  length: number
): number => {
  let maxHeight = 0
  messageRefs.slice(0, length).forEach((itemRef: any) => {
    const messageDom = ReactDOM.findDOMNode(itemRef.current) as Element
    const { height } = messageDom.getBoundingClientRect()
    maxHeight = maxHeight > height ? maxHeight : height
  })
  return maxHeight
}
