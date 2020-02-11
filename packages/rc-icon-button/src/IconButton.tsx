import * as React from 'react'
import * as PropTypes from 'prop-types'
import { ButtonProps } from '@alifd/next/types/button'
import * as S from './styles'

const propTypes = {
  icon: PropTypes.string.isRequired,
}

/**
 * @public
 */
export interface IProps {
  /**
   * 需要展示的icon的type
   * @public
   */
  icon: string
}

/**
 * @public
 */
const IconButton: React.FC<IProps & ButtonProps> = props => {
  const { icon, children, ...restProps } = props
  const hasRestChildren = typeof children !== 'undefined' && children !== null

  return (
    <S.IconButton {...restProps} reset={hasRestChildren}>
      {icon && <S.StyledIcon type={icon} />}
      {children}
    </S.IconButton>
  )
}

IconButton.propTypes = propTypes

export { IconButton }
