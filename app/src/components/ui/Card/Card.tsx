import classNames from 'classnames'
import React from 'react'

interface CardProps {
  children: JSX.Element | JSX.Element[] | string
  header?: string | JSX.Element
  headerExtra?: string | JSX.Element
  headerClass?: string
  headerBorder?: boolean
  bodyClass?: string
  footer?: JSX.Element
  footerBorder?: boolean
  footerClass?: string
  className?: string
  clickable?: boolean
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

function Card(props: CardProps) {

  const { children, header, headerExtra, headerBorder, headerClass, footer, footerBorder, footerClass, bodyClass, className, clickable, onClick } = props

  const classes = classNames(
    'card card-bordered',
    className,
    clickable ? 'card-clickable' : ''
  )

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    (onClick)?.(event)
  }

  return (
    <div
      className={classes}
      onClick={handleClick}
    >
      {header &&
        <div className={classNames(
          'card-header',
          headerBorder ? 'card-header-border' : '',
          headerExtra ? 'card-header-extra' : '',
          headerClass
        )}>
          <h4>{header}</h4>
          {headerExtra && <span>{headerExtra}</span>}
        </div>}
      <div className={classNames('card-body', bodyClass)}>
        {children}
      </div>
      { footer &&
        <div className={classNames(
          'card-footer',
          footerBorder ? 'card-footer-border' : '',
          footerClass
        )}>
          {footer}
        </div>
      }
    </div>
  )
}

Card.defaultProps = {
  headerBorder: true,
  footerBorder: true,
  clickable: false
}

export default Card
