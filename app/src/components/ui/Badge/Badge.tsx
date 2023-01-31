import classNames from 'classnames'
import React from 'react'

interface BadgeProps {
  content?: string | number
  maxCount?: number
  children?: JSX.Element
  className?: string
  innerClass?: string
}

function Badge(props: BadgeProps) {

  const { content, maxCount, children, className, innerClass } = props

  const classes = classNames(
    'badge',
    children ? `badge-inner` : '',
    innerClass
  )

  const getContent = () => {
    if(typeof content === 'number' && content > maxCount!) {
      return `${maxCount}+`
    }
    return content
  }

  const getChildren = () => {
    if(children){
      return(
        <span className={`badge-wrapper ${className}`}>
          <span className={classes}>
            {getContent()}
          </span>
          {children}
        </span>
      )
    } else {
      return (
        <span className={classes}>
          {getContent()}
        </span>
      )
    }
  }

  return (
    <>
      {getChildren()}
    </>
  )
}


Badge.defaultProps = {
  maxCount: 99
}

export default Badge
