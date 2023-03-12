import React from 'react'
import { HiX } from 'react-icons/hi'
import classNames from 'classnames'

interface CloseButtonProps {
  absolute?: boolean
  className?: string
  defaultStyle?: boolean
  svgClass?: string
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  res?: any
}

const CloseButton = React.forwardRef((props: CloseButtonProps, ref: React.ForwardedRef<HTMLSpanElement>) => {

	const { absolute, className, defaultStyle, svgClass, onClick,...rest } = props
	const closeButtonAbsoluteClass = 'absolute z-10'

	const closeButtonClass = classNames(
		'close-btn',
		defaultStyle && 'close-btn-default',
		absolute && closeButtonAbsoluteClass,
		className
	)

	return (
		<span
			className={closeButtonClass}
			role="button"
      onClick={onClick}
			{...rest}
			ref={ref}
		>
			<HiX />
		</span>
	)
})

CloseButton.defaultProps = {
	defaultStyle: true
}

export default CloseButton
