import classNames from 'classnames'
import React from 'react'

interface TagProps {
  children: string
  prefix?: JSX.Element | true
  prefixClass?: string
  suffix?: JSX.Element | true
  suffixClass?: string
}

function Tag(props: TagProps) {

  const { children, prefix, prefixClass, suffix, suffixClass, ...rest } = props

  return (
    <>
      <div className="tag" {...rest}>
        { prefix && <span className={classNames(`${typeof prefix !== 'object' ? 'tag-affix' : ''} tag-prefix`, prefixClass)}>{prefix}</span> }
          {children}
        { suffix && <span className={classNames(`${typeof suffix !== 'object' ? 'tag-affix' : ''} tag-suffix`, suffixClass)}>{suffix}</span> }
      </div>
    </>
  )
}

export default Tag
