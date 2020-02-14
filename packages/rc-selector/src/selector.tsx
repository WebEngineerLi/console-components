import React, { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { Select } from '@alicloud/console-components'
// import withRcIntl from '@alicloud/console-components-intl'
import { mapToDetail, mapToPrimitive, noop, withTip } from './utils'
import SelectOverlay from './overlay'
import { mainClassName, popupClassName } from './constants'

/**
 * @public
 */
export interface ISelectorDataSourceItem {
  /**
   * 展示的内容
   */
  label: React.ReactNode
  /**
   * 值
   */
  value?: any
  /**
   * 是否禁用
   * @defaultValue `false`
   */
  disabled?: boolean
}

/**
 * @public
 */
export interface ISelectorProps {
  /**
   * 选择器的宽度
   * @defaultValue `300px`
   */
  width?: string
  /**
   * 数据源
   */
  dataSource: ISelectorDataSourceItem[]
  /**
   * 当前页码
   * @defaultValue `0`
   */
  pageNumber: number
  /**
   * 数据总量
   * @defaultValue `0`
   */
  totalCount: number
  /**
   * 值
   */
  value?: any
  /**
   * 是否禁用
   * @defaultValue `false`
   */
  disabled?: boolean
  /**
   * 是否显示搜索框
   * @defaultValue `true`
   */
  showSearch?: boolean
  /**
   * 是否多选
   * @defaultValue `false`
   */
  multiple?: boolean
  /**
   * 用作搜索的关键字段
   */
  searchIndex?: string
  /**
   * 选择器占位文本
   */
  placeholder?: string
  /**
   * 搜索框占位文本
   */
  searchPlaceholder?: string
  /**
   * 无数据提示信息
   */
  noDataTip?: React.ReactNode
  /**
   * 无数据创建引导
   */
  noDataGuide?: React.ReactNode
  /**
   * 使用本地过滤
   * @defaultValue `false`
   */
  filterLocal?: boolean
  /**
   * 过滤方法
   * @defaultValue `false`
   */
  filterBy?: (searchStr: string, option: ISelectorDataSourceItem) => boolean
  /**
   * 选择发生变化时触发回调
   * @public
   */
  onChange?: (value: string | string[]) => void
  /**
   * 请求数据时触发回调
   * @public
   */
  onLoad?: (
    param: { PageNumber: number; [`searchIndex`]?: string },
    extra?: { clear: boolean }
  ) => void
  /**
   * 是否终止加载数据，每次触发 onLoad 前执行，如果返回该函数 true 则不触发 onLoad
   * @public
   */
  onAbortLoad?: (params: ISelectorProps) => boolean
  /**
   * 输入关键字搜索时触发回调，一般情况下使用 onLoad，如果默认情况不能满足业务，可以自行定义 onSearch 覆盖默认行为
   * @defaultValue `onLoad`
   */
  onSearch?: (searchText: string) => void
  /**
   * 弹层显示时触发的回调，默认使用 `onLoad`，可自定义覆盖
   * @defaultValue `onLoad`
   */
  onOpen?: () => void
  /**
   * 弹层关闭时触发的回调
   * @defaultValue `() => {}`
   */
  onClose?: () => void
  /**
   * 子节点
   */
  children?: React.ReactNode
  /**
   * 使用Field的时候传入的标识
   * @internal
   */
  id?: string
}

// fusion@1.x changes its behavior of the `Select` component,
// force using the `useDetailValue` API when
// it detects the presence of the `popupContent` API.
// if fusion fixes this issue later, then the functions defined below
// may be deleted in the future.

// store any dataSource ever come from above
// may contain some redundant data as the name advertised.
// const redundantDataSource = []

const Selector: React.FC<ISelectorProps> = props => {
  const {
    dataSource,
    filterLocal,
    onSearch,
    onChange,
    totalCount,
    onAbortLoad,
    onLoad,
    searchIndex,
    pageNumber,
    width,
    value,
    multiple,
    placeholder,
    searchPlaceholder,
    noDataGuide,
    noDataTip,
    // intl,
    filterBy,
    disabled,
    showSearch,
  } = props

  const [prevDataSource, setPrevDataSource] = useState(dataSource)
  const [visible, setVisible] = useState(false)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (dataSource !== prevDataSource) {
      setPrevDataSource(dataSource)
    }
  }, [dataSource, prevDataSource])

  const handleSearch = (): void => {
    if (onSearch) {
      // if specified onSearch call onSearch
      onSearch(searchText)
    } else if (searchText) {
      // if specified onSearch call onLoad & reset PageNumber and clear
      onLoad &&
        onLoad(
          { [searchIndex as string]: searchText, PageNumber: 1 },
          { clear: true }
        )
    } else {
      onLoad && onLoad({ PageNumber: 1 }, { clear: true })
    }
  }

  const onSearchDebounced = debounce(handleSearch, 500)

  const handleSearchInputChange = (val: string): void => {
    // first update state of the `searchText`
    setSearchText(val)
    // when not use `filterLocal`, then send a request to server,
    // if user has specified `onLoad` or `onSearch`.
    // filterLocal === false时，启用外部搜索
    // filterLocal === true时，启用本地搜索
    if (!filterLocal) {
      onSearchDebounced()
    }
  }

  const onOverlayChange = (val: string | string[]): void => {
    if (onChange) onChange(val) // 调用的可能是filed的onChange也可能是传入的onChange
  }

  const handleSelectChange = (
    val: ISelectorDataSourceItem | ISelectorDataSourceItem[]
  ): void => {
    // 调用onChange的参数就是string[] 或者 string
    if (onChange) onChange(mapToPrimitive(val))
  }

  const onAbort = (): boolean => {
    return dataSource.length >= totalCount
  }

  const handleAbortLoad = (): boolean => {
    if (onAbortLoad) {
      return onAbortLoad(props)
    }
    return onAbort()
  }

  const handleOpen = (): void => {
    const { onOpen } = props
    if (onOpen) {
      onOpen()
    } else if (onLoad) onLoad({ PageNumber: 1 })
  }

  const handleClose = (): void => {
    const { onClose } = props
    onClose && onClose()
    // reset `searchText`
    setSearchText('')
  }

  const handleLoad = (): void => {
    if (onLoad) {
      if (searchText) {
        onLoad({
          [searchIndex as string]: searchText,
          PageNumber: pageNumber + 1,
        })
      } else {
        onLoad({ PageNumber: pageNumber + 1 })
      }
    }
  }

  const handleVisibleChange = (vis: boolean): void => {
    setVisible(vis)
    if (vis) {
      handleOpen()
    } else {
      handleClose()
    }
  }

  const getSelectedKeysForOverlay = (): string[] | [] | string => {
    if (value) return value
    if (multiple) return []
    return ''
  }
  return (
    <div className={mainClassName}>
      <Select
        popupClassName={popupClassName}
        style={{ width }}
        visible={visible}
        disabled={disabled}
        hasClear
        mode={multiple ? 'multiple' : 'single'}
        value={mapToDetail(value, dataSource) as any} // this line may change in the future
        // placeholder={placeholder || intl('placeholder')}
        placeholder={placeholder}
        onChange={val => handleSelectChange(val)}
        onVisibleChange={handleVisibleChange}
        popupContent={
          <div>
            <SelectOverlay
              overlayWidth={width as string}
              filterLocal={!!filterLocal}
              dataSource={dataSource}
              // searchPlaceholder={searchPlaceholder || intl('searchPlaceholder')} // eslint-disable-line
              searchPlaceholder={searchPlaceholder} // eslint-disable-line
              guide={noDataGuide}
              // noDataTip={noDataTip || <span>{intl('noDataTip')}</span>}
              noDataTip={noDataTip}
              hasSearch={!!showSearch}
              searchText={searchText}
              multiple={multiple}
              selectedKeys={getSelectedKeysForOverlay()} // 默认为value值
              onReachBottom={handleLoad}
              onChange={onOverlayChange}
              onSearch={handleSearch}
              onAbortLoad={handleAbortLoad}
              filterBy={filterBy}
              onVisibleChange={handleVisibleChange}
              onSearchInputChange={handleSearchInputChange}
              hasLoadBeenFired={pageNumber > 0}
            />
          </div>
        }
      />
    </div>
  )
  // }
}

// const SelectorWithIntl = withRcIntl({
//   defaultLocaleMessages: {
//     'zh-CN': {
//       placeholder: '请选择',
//       searchPlaceholder: '请输入搜索内容',
//       noDataTip: '当前状态：没有数据',
//     },
//   },
//   namespace: '@wind.component.selector',
// })(Selector)

// SelectorWithIntl.withTip = withTip
// export default SelectorWithIntl

Selector.displayName = 'Selector'

Selector.propTypes = {
  width: PropTypes.string,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  noDataGuide: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  noDataTip: PropTypes.any,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.any.isRequired,
      disabled: PropTypes.bool,
    }).isRequired
  ).isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChange: PropTypes.func,
  onLoad: PropTypes.func,
  onAbortLoad: PropTypes.func,
  onSearch: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  // intl: PropTypes.func,
  searchIndex: PropTypes.string,
  filterLocal: PropTypes.bool,
  filterBy: PropTypes.func,
  disabled: PropTypes.bool,
  showSearch: PropTypes.bool,
}

Selector.defaultProps = {
  width: '300px',
  multiple: false,
  onLoad: noop,
  onClose: noop,
  filterLocal: false,
  disabled: false,
  showSearch: true,
}

/**
 * @public
 */
const ExpSelector = Object.assign(Selector, { withTip })

export default ExpSelector
