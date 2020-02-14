import { ISelectorDataSourceItem, ISelectorProps } from './selector'

export const mapToDetail = (
  value: ISelectorProps['value'],
  dataSource: ISelectorDataSourceItem[]
): ISelectorDataSourceItem | ISelectorDataSourceItem[] => {
  const dataSourceMap: {
    [propName: string]: ISelectorDataSourceItem
  } = dataSource.reduce(
    (prev, next) => ({
      ...prev,
      [next.value]: next,
    }),
    {}
  )
  if (Array.isArray(value)) {
    return value.map((item: string) => dataSourceMap[item])
  }
  return dataSourceMap[value as string]
}

// may be deleted in the future.
export const mapToPrimitive = (
  value: ISelectorDataSourceItem | ISelectorDataSourceItem[]
): string | string[] => {
  if (Array.isArray(value)) {
    return value.map(item => `${item.value}`)
  }
  return value && `${value.value}`
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = (): void => {} // no op function

export const withTip = (label: string, tip: string): string => {
  const regexp = /\s\([^)]+\)$/
  if (regexp.test(label)) {
    return label.replace(regexp, ` ( ${tip} )`)
  }
  return `${label} ( ${tip} )`
}
