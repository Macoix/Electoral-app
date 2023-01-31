import React from 'react'
import classNames from 'classnames'

import {SIZES, CONTROL_SIZES} from '../utils/contants'
import Spinner from '../Spinner'

interface ButtonProps {
  children: string | JSX.Element
  size: string
  icon?: JSX.Element
  active?: boolean
  disabled?: boolean
  loading?: boolean
  variant: string
  shape?: string
  className?: string
  block?: boolean
  color: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

interface getButtonColorProps {
  bgColor: string
  hoverColor: string
  activeColor: string
  textColor: string
}

function Button(props: ButtonProps) {

  const { children, size, icon, active, disabled, loading, variant, shape, className, block, color, onClick, ...rest } = props

  const defaultClass = 'button'
  const buttonSize = size;
  const sizeIconClass = 'inline-flex items-center justify-center'
  const disabledClass = 'opacity-50 cursor-not-allowed'
  const splitedColor = color.split('-')
  const buttonColor = splitedColor[0] || 'indigo'
	const buttonColorLevel = splitedColor[1] || 600

  const BUTTON_SIZE_CLASSES = {
    lg: classNames(
      `h-${CONTROL_SIZES.lg}`,
      (!icon && !children) ? `w-${CONTROL_SIZES.lg} ${sizeIconClass} text-2xl` : 'px-8 py-2 text-base'
    ),
    sm: classNames(
      `h-${CONTROL_SIZES.sm}`,
      (!icon && !children) ? `w-${CONTROL_SIZES.sm} ${sizeIconClass} text-lg` : 'px-3 py-2 text-sm'
    ),
    xs: classNames(
      `h-${CONTROL_SIZES.xs}`,
      (!icon && !children) ? `w-${CONTROL_SIZES.xs} ${sizeIconClass} text-base` : 'px-3 py-1 text-xs'
    ),
    default: classNames(`h-${CONTROL_SIZES.md}`, (!icon && !children) ? `w-${CONTROL_SIZES.md} ${sizeIconClass} text-xl` : 'px-8 py-2'),
  }

  const BUTTON_COLORS = {
    solid: {
      bgColor: active ? `bg-${buttonColor}-700` : `bg-${buttonColor}-${buttonColorLevel}`,
			textColor: 'text-white',
			hoverColor: active ? '' : `hover:bg-${buttonColor}-500`,
			activeColor: `active:bg-${buttonColor}-700`
    },
    plain: {
      bgColor: active ? `bg-gray-100 dark:bg-gray-500` : 'bg-transparent border border-transparent',
			textColor: `text-gray-600 dark:text-gray-100`,
			hoverColor: active ? '' : `hover:bg-gray-50 dark:hover:bg-gray-600`,
			activeColor: `active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500`
    },
    default: {
      bgColor: active ? `bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:border-gray-500` : `bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700`,
			textColor: `text-gray-600 dark:text-gray-100`,
			hoverColor: active ? '' : `hover:bg-gray-50 dark:hover:bg-gray-600`,
			activeColor: `active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500`
    }
  }

  const getButtonSize = BUTTON_SIZE_CLASSES[buttonSize as keyof typeof BUTTON_SIZE_CLASSES]

  const getBtnColor = () => {
    const {activeColor, bgColor, textColor, hoverColor} = BUTTON_COLORS[variant as keyof typeof BUTTON_COLORS]
    return `${activeColor} ${bgColor} ${textColor} ${hoverColor}`
  }

  const classes = classNames(
		defaultClass,
		getBtnColor(),
		`radius-${shape}`,
		getButtonSize,
		className,
		block ? 'w-full' : ''
	)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const { onClick } = props
		if (disabled || loading) {
			event.preventDefault()
			return
		}
		(onClick)?.(event)
	}

  const renderChildren = () => {
		if(loading && children) {
			return (
				<span className="flex items-center justify-center">
					<Spinner className="mr-1" />
					{children}
				</span>
			)
		}

		if((!icon && !children) && loading) {
			return <Spinner />
		}

		if((icon && !children) && !loading) {
			return <>{icon}</>
		}

		if((icon && !children) && loading) {
			return <Spinner />
		}

		if((icon && children) && !loading) {
			return (
			<span className="flex items-center justify-center">
				<span className="text-lg">{icon}</span>
				<span className="ltr:ml-1 rtl:mr-1">{children}</span>
			</span>
			)
		}

		return <>{children}</>

	}

  return (
      <button
        className={classes}
        {...rest}
        onClick={handleClick}
      >
        {renderChildren()}
      </button>
  )
}

Button.defaultProps = {
	variant: 'default',
	shape: 'round',
  size: 'default',
	active: false,
	loading: false,
	disabled: false,
	color: ''
}

export default Button
