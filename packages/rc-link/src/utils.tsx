import React from 'react'
import { ConfigProvider } from '@alicloud/console-components'
import { btn } from './constants'

import { ILinkProps } from './index'

export const evalProp = (
  prop: ILinkProps['disabled'],
  path: ILinkProps['to']
): boolean => {
  if (typeof prop === 'boolean') {
    return prop
  }

  if (typeof prop === 'function') {
    return prop(path as string)
  }

  return false
}

export const getClassName = (
  shape: ILinkProps['shape'],
  type: ILinkProps['type'],
  size: ILinkProps['size'],
  disabled: boolean,
  prefix: string
): {
  disabled: boolean
} => {
  const result = { disabled: !!disabled } // disabled style
  if (shape === 'button') {
    const btnTypeClassName = `${prefix}${btn}-${type}`
    const btnSizeClassName = `${prefix}${size}`
    return {
      ...result,
      [`${prefix}${btn}`]: true,
      [btnTypeClassName]: true,
      [btnSizeClassName]: true,
    }
  }
  return result
}

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
