import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Menu, Icon, Input } from '@alicloud/console-components'
import { ISelectorDataSourceItem, ISelectorProps } from './selector'
import * as S from './style'

const overlayMaxHeight = 300 // 这个值决定后面算法，谨慎更变，需要同步更变 index.less

const defaultFilterBy = (
  keyword: string,
  option: ISelectorDataSourceItem
): boolean => {
  try {
    const { label } = option
    if (typeof label === 'string') {
      return (label as string).includes(keyword)
    }
    return true
  } catch (error) {
    return true
  }
}

interface ISelectOverlayProps {
  dataSource: ISelectorProps['dataSource']
  hasSearch: boolean
  searchText: string
  overlayWidth: string
  searchPlaceholder: ISelectorProps['searchPlaceholder']
  guide: ISelectorProps['noDataGuide']
  noDataTip: ISelectorProps['noDataGuide']
  multiple: ISelectorProps['multiple']
  selectedKeys: ISelectorProps['value'] | [] | string
  onVisibleChange: (visible: boolean) => void
  onSearchInputChange: (val: string) => void
  hasLoadBeenFired: boolean
  onAbortLoad: () => boolean
  filterLocal: boolean
  onReachBottom: () => void
  onChange: (val: string | string[]) => void
  filterBy: ISelectorProps['filterBy']
  onSearch: ISelectorProps['onSearch']
}

const SelectorOverlay: React.FC<ISelectOverlayProps> = ({
  dataSource,
  onAbortLoad,
  filterLocal,
  onReachBottom,
  multiple,
  onChange,
  overlayWidth,
  searchText,
  filterBy,
  hasSearch,
  searchPlaceholder,
  guide,
  noDataTip,
  selectedKeys,
  onVisibleChange,
  onSearchInputChange,
  hasLoadBeenFired,
}) => {
  const [prevDataSource, setPrevDataSource] = useState(dataSource)
  const [loading, setLoading] = useState(false)
  const [abort, setAbort] = useState(false)

  const overlayRef = useRef(null)
  const menuRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    setAbort(onAbortLoad())
    if (dataSource.length !== prevDataSource.length) {
      setPrevDataSource(dataSource)
      setLoading(false)
    }
  }, [dataSource, onAbortLoad, prevDataSource])

  const onScroll = (e: React.BaseSyntheticEvent): boolean | void => {
    // 如果是开启本地过滤，默认第一次灌进来所有的数据，不开启分页加载功能
    if (filterLocal) {
      return false
    }
    try {
      const { scrollTop } = e.target

      /* eslint-disable */
      const menuDom = ReactDOM.findDOMNode(menuRef.current) as Element;
      const menuHeight = menuDom.getBoundingClientRect().height
      const searchDom = ReactDOM.findDOMNode(searchRef.current) as Element
      const searchHeight = hasSearch ? searchDom.getBoundingClientRect().height : 0;
      
      if (scrollTop + overlayMaxHeight > menuHeight + searchHeight) {
        if (!abort) {
          onReachBottom()
          !loading && setLoading(true)
        }
      } else {
        loading && setLoading(false)
      }
    } catch (error) {
      // do nothing
    }
  }

  const handleChange = (val: string[] | string, item: {}, extra: {}) => {
    if (multiple) {
      onChange(val)
    } else {
      onChange(val && val[0])
    }
  }

  const relativeWithOverlayWidth = (offset = 0) => {
    const _width = parseInt(overlayWidth) // eslint-disable-line
    const width = _width + offset
    return `${width}px`
  }

  const filterDataSource = () => {
    let filteredDataSource = dataSource
    if (searchText && filterLocal) {
      filteredDataSource = dataSource.filter(item => {
        if (filterBy) {
          return filterBy(searchText, item)
        } else {
          return true;
        }
      })
    }
    return filteredDataSource
  }

    const noData = hasLoadBeenFired && dataSource.length <= 0

    return (
      <S.SOverlayWrapper
        style={{ width: overlayWidth }}
        className="wind-selector-overlay"
        ref={overlayRef}
        onScroll={onScroll}
      >
        {hasSearch ? (
          <S.SOverlayInput
            style={{ width: relativeWithOverlayWidth(-2) }}
            className="wind-selector-overlay-input"
            ref={searchRef}
          >
            <Input
              value={searchText}
              placeholder={searchPlaceholder}
              // 搜索的时候调用父级的搜索方法，将搜索的关键字使用state存储起来
              onChange={onSearchInputChange}
            />
            <Icon className="wind-selector-overlay-input-icon" type="search" />
          </S.SOverlayInput>
        ) : null}
        {!noData ? (
          <S.SOverlayMenu
            className="wind-selector-overlay-menu"
            hasSearch={hasSearch}
          >
            <Menu
              ref={menuRef}
              selectMode={multiple ? 'multiple' : 'single'}
              onSelect={handleChange}
              selectedKeys={selectedKeys}
              onItemClick={() => multiple || onVisibleChange(false)}
            >
              {filterDataSource().map((item, index) => (
                <Menu.Item key={item.value || index} disabled={item.disabled}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
            {/* 两个地方控制加载loading, pageNumber === 0 或者是 onScroll调用时，请求数据的时候 */}
            {(!hasLoadBeenFired || loading) && (
              <S.SOverlayIcon type="loading" className="wind-selector-overlay-icon" />
            )}
          </S.SOverlayMenu>
        ) : (
          <S.SOverlayEmpty className="wind-selector-overlay-empty">
            <div className="wind-selector-overlay-empty-tip">{noDataTip}</div>
            {guide && (
              <div
                className="wind-selector-overlay-empty-guide"
                onClick={() => onVisibleChange(false)}
              >
                {guide}
              </div>
            )}
          </S.SOverlayEmpty>
        )}
      </S.SOverlayWrapper>
    )
}

SelectorOverlay.defaultProps = {
  filterBy: defaultFilterBy,
}

SelectorOverlay.propTypes = {
  hasSearch: PropTypes.bool.isRequired,
  searchText: PropTypes.string.isRequired,
  overlayWidth: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.any.isRequired,
      disabled: PropTypes.bool,
    }).isRequired
  ).isRequired,
  guide: PropTypes.node,
  noDataTip: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,
  multiple: PropTypes.bool.isRequired,
  selectedKeys: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  onReachBottom: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  filterBy: PropTypes.func,
  onAbortLoad: PropTypes.func.isRequired, // eslint-disable-line
  filterLocal: PropTypes.bool.isRequired,
  onVisibleChange: PropTypes.func.isRequired,
  onSearchInputChange: PropTypes.func.isRequired,
  hasLoadBeenFired: PropTypes.bool.isRequired,
}

/**
 * @public
 */
export default SelectorOverlay
