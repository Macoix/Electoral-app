import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

interface AvatarProps {
  size?: "lg" | "md" | "sm" | number
  src?: string
  srcSet?: string
  shape?: "rounded" | "square" | "circle"
  alt?: string
  className?: string
  icon?: JSX.Element | undefined
  children?: JSX.Element | string
}

function Avatar(props: AvatarProps) {

  const { size, src, shape, alt, className, icon, srcSet, ...rest } = props

  let { children } = props

  const [scale, setScale] = useState<Number>(1)

  const avatarChildren = useRef<HTMLElement>()
  const avatarNode = useRef<HTMLElement>()

  const innerScale = () => {
    if(!avatarChildren.current || !avatarNode.current) return

    const avatarChildrenWidth = avatarChildren.current.offsetWidth
    const avatarNodeWidth = avatarNode.current.offsetWidth

    if ( avatarChildrenWidth === 0 || avatarNodeWidth === 0 ) return

    setScale(avatarNodeWidth - 8 < avatarChildrenWidth ? (avatarNodeWidth - 8) / avatarChildrenWidth : 1)
  }

  useEffect(() => {
		innerScale()
	}, [scale, children])

  const sizeStyle = typeof size === 'number' ? {
    width: size,
    height: size,
    minWidth: size,
    lineHeight: `${size}px`,
    fontSize: icon ? size / 2 : 12,
  } : {}

  const classes = classNames(
    'avatar',
    `avatar-${shape}`,
    typeof size === 'string' ? `avatar-${size}` : '',
    className
  )

  if (src) {
		children = <img className={`avatar-img avatar-${shape}`} src={src} srcSet={srcSet} alt={alt} loading="lazy" />
	} else if (icon) {
		children = (
			<span className={classNames('avatar-icon', `avatar-icon-${size}`)}>{icon}</span>
		)
	} else {
		const childrenSizeStyle = typeof size === 'number' ? {lineHeight: `${size}px`} : {}
		const stringCentralized = { transform: `translateX(-50%) scale(${scale})` }
		children = (
			<span
				className={`avatar-string ${typeof size === 'number' ? '' : `avatar-inner-${size}`}`}
				style={{...childrenSizeStyle, ...stringCentralized, ...typeof size === 'number' ? {height: size} : {}}}
			>
				{children}
			</span>
		)
	}

	return (
		<span className={classes} style={{ ...sizeStyle, ...rest.style }}>
			{children}
		</span>
	)

}


Avatar.defaultProps = {
	shape: 'rounded',
	size: 'md',
}

export default Avatar
