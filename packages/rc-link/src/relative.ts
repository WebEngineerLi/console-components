import resolvePathname from 'resolve-pathname'
import { compose, branch, withProps, mapProps } from 'recompose'
import { omit } from 'lodash'
import { withRouter } from 'dva/router'
import { ILinkProps } from './Link'

const transRelativeUrl = withProps(
  (props: { to: string; location: { pathname: string } }) => {
    const { to, location } = props
    const { pathname } = location
    const exactPathname =
      pathname[pathname.length - 1] === '/' ? pathname : `${pathname}/`
    let combinedProps = {}

    if (to) {
      combinedProps = {
        ...combinedProps,
        to: resolvePathname(to, exactPathname),
      }
    }

    return combinedProps
  }
)

const cleanProps = mapProps((props: ILinkProps) => {
  const restProps = omit(props, [
    'history',
    'match',
    'location',
    'staticContext',
    'relative',
  ])

  return restProps
})

const withRelativeUrl = compose(withRouter, transRelativeUrl, cleanProps)

const isRelative = (props: ILinkProps): boolean => !!props.relative

const relative = branch(isRelative, withRelativeUrl)

export default relative
