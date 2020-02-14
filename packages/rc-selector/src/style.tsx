import styled from 'styled-components'
import { Icon } from '@alicloud/console-components'

/* 这个值影响组件计算，谨慎更变，多方验证 */
const maxHeightOfOverlay = '300px'

const inputHeight = 56

const overlayPadding = '12px'

export const SOverlayInput = styled.div``

export const SOverlayMenu = styled.div<{ hasSearch: boolean }>`
  margin-top: ${({ hasSearch }) =>
    hasSearch ? `${inputHeight - 1}px` : '-1px'};
`

export const SOverlayIcon = styled(Icon)``

export const SOverlayEmpty = styled.div``

export const SOverlayWrapper = styled.div`
  &.wind-selector-overlay {
    max-height: ${maxHeightOfOverlay} !important;
    overflow: auto;
    overflow-x: hidden;
    border: 1px solid #c3c5c6;
    min-width: 180px;
    min-height: 110px;
    background: white;

    ${SOverlayInput} {
      &.wind-selector-overlay-input {
        height: ${inputHeight}px !important;
        padding: ${overlayPadding};
        position: absolute;
        z-index: 10;
        background: white;
        box-shadow: #eee 0px 2px 4px 0px;
        border-bottom: 1px solid #d7d8d9;

        .next-input {
          width: 100%;
        }

        .wind-selector-overlay-input-icon {
          position: absolute;
          right: 16px;
          top: 16px;
          padding: 0 3px;
          background: white;
          color: #999;
        }
      }
    }

    ${SOverlayMenu} {
      &.wind-selector-overlay-menu {
        .next-menu {
          border: none;
          box-shadow: none;
        }
      }
    }

    ${SOverlayIcon} {
      &.wind-selector-overlay-icon {
        position: absolute;
        bottom: 5px;
        right: 15px;
      }
    }

    ${SOverlayEmpty} {
      &.wind-selector-overlay-empty {
        border-top: 1px solid #dedede;
        margin-top: ${inputHeight - 1}px !important;

        .wind-selector-overlay-empty-tip {
          background: #fbfbfb;
          padding: ${overlayPadding};
          border-bottom: 1px solid #d7d8d9;
        }
        .wind-selector-overlay-empty-guide {
          padding: ${overlayPadding};
        }
      }
    }
  }
`
