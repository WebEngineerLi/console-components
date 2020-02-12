import React from 'react'
import Link from '@alicloud/console-components-link'

const ButtonLink: React.FC<{}> = () => {
  return (
    <div style={{ margin: '30px' }}>
      <div>站内链接</div>
      <p>
        <Link to="/normal" shape="button">
          Normal Button Link
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/primary" shape="button" type="primary">
          Primary Link Button
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/small" shape="button" size="small">
          Small Link Button
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/large" shape="button" size="large">
          Large Link Button
        </Link>
      </p>
      <br />
      <br />
      <div>站外链接</div>
      <p>
        <Link href="http://www.taobao.com" shape="button">
          Normal Button Link
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="http://www.taobao.com" shape="button" type="primary">
          Primary Link Button
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="http://www.taobao.com" shape="button" size="small">
          Small Link Button
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="http://www.taobao.com" shape="button" size="large">
          Large Link Button
        </Link>
      </p>
    </div>
  )
}

export default ButtonLink
