import * as React from 'react'
import { Slider } from '@alicloud/console-components'
import styled from 'styled-components'
import { SliderProps } from '@alicloud/console-components/types/slider'
import colorMap from '../config/colorMap'
import SDots from './SDots'

const calculatedWidth = (total: number, closeable: boolean): string => {
  const baseWidth = 16
  let width = baseWidth
  if (closeable) {
    width += 24
  }
  if (total >= 1) {
    width += 16
  }
  return `calc(100% - ${width}px)`
}

const SliderFC: React.FC<SliderProps & {
  total: number
  closeable: boolean
  type: string
	dotsRender: () => React.ReactNode
	size: 'large' | 'medium'
}> = ({ total, closeable, type, ...restProps }) => <Slider {...restProps} />

const SSlider = styled(SliderFC)`
  /* 轮播图部分 */
  width: ${({ total, closeable }) => calculatedWidth(total, closeable)};
  && {
    position: static;
  }

  .${getPrefix}slick-dots.ver {
    width: 4px;
    right: ${({ closeable }) => (closeable ? '40px' : '16px')};
    left: auto;
		top: ${({ size }) => size === 'large' ? '10px' : '50%'};
		transform: ${({ size }) => size === 'large' ? '0' : 'translateY(-50%)'};
		bottom: auto;
    .${getPrefix}slick-dots-item {
			margin-bottom: 3px;
			display: inline-block;
			line-height: 4px;
			height: 4px;
			&.active {
				height: 8px;
			}
			&:last-child {
				margin-bottom: 0;
			}
			>span {
				display: block;
				line-height: 4px;
				height: 4px;
			}
    }
  }
  .dots-cust {
    .active ${SDots} {
      background: ${({ type }) => colorMap[type || 'success']};
			height: 8px;
    }
  }
`

function getPrefix({ prefix }: { prefix: string }): string {
  return prefix
}

export default SSlider
