import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { baseClassName } from './constants'
import { evalProp, getClassName, IFusionConfigProps } from './utils'
import { ILinkProps } from './Link'

import * as S from './style'

const defaultOptions = {
  renderHrefLinkAs: 'a',
}

export const endue = (options = defaultOptions) => (
  LinkComponent: React.ComponentType<ILinkProps>
) => {
  const exactOptions = {
    ...defaultOptions,
    ...options,
  }

  const H: React.FC<ILinkProps & IFusionConfigProps> = ({
    className,
    disabled = false,
    visible = true,
    shape = 'text',
    type = 'normal',
    size = 'medium',
    fusionConfig,
    ...restProps
  }) => {
    const { prefix = 'next-' } = fusionConfig

    const { href, to, onClick } = restProps

    const exactLinkTargetPath = href || to

    const exactVisible = evalProp(
      visible as ILinkProps['visible'],
      exactLinkTargetPath
    )

    // render as null
    if (!exactVisible) {
      return null
    }
    // 覆盖原有的onClick
    const exactChildProps = {
      ...restProps,
      // 封装一层onClick，避免弹窗以后持续focus
      // https://work.aone.alibaba-inc.com/issue/22271802
      onClick: (e: React.BaseSyntheticEvent) => {
        if (e && e.target && typeof e.target.blur === 'function') {
          e.target.blur()
        }
        typeof onClick === 'function' && onClick(e)
      },
    }

    const exactDisabled = evalProp(
      disabled as ILinkProps['disabled'],
      exactLinkTargetPath
    )
    const computedClassName = classNames(
      baseClassName,
      getClassName(shape, type, size, exactDisabled, prefix),
      className
    )

    // render as disabled
    if (exactDisabled) {
      const { style, ...rest } = exactChildProps
      return (
        <S.SDisabledLink
          aria-disabled="true"
          className={computedClassName}
          role="button"
          style={style}
        >
          <span
            // disabled
            aria-disabled="true"
            role="button"
            className="link"
            {...rest}
          />
        </S.SDisabledLink>
      )
    }

    // render as a
    if (exactOptions.renderHrefLinkAs && (href || !to)) {
      return createElement('a', {
        className: computedClassName,
        href,
        ...exactChildProps,
      })
    }

    // render as Link
    return <LinkComponent {...exactChildProps} className={computedClassName} />
  }

  H.displayName = `accord(${LinkComponent.displayName || LinkComponent.name})`

  H.propTypes = {
    shape: PropTypes.oneOf(['text', 'button']),
    type: PropTypes.oneOf(['normal', 'primary', 'secondary']),
    size: PropTypes.oneOf(['medium', 'small', 'large']),
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    visible: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    className: PropTypes.string,
  }

  return H
}
