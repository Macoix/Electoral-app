import React from 'react'
import classNames from 'classnames'
import { CgSpinner } from 'react-icons/cg'
import { IconType } from 'react-icons'

interface SpinnerProps {
  className?: string
  color?: string
  isSpining?: boolean;
  size?: number | string
  style?: Object
  indicator: IconType
}

function Spinner(props: SpinnerProps) {

  const {
    className,
    color,
    size,
    style,
    isSpining,
    indicator: Component,
    ...rest
  } = props

  const spinnerColor = color

  const spinnerStyle = {
    height: size,
    width: size,
    ...style
  }

  const spinnerClass = classNames(
    isSpining && 'animate-spin',
    spinnerColor && `text-${spinnerColor}`,
    className
  )

  return (
    <>
      <Component style={spinnerStyle} className={spinnerClass} {...rest} />
    </>
  )
}

Spinner.defaultProps = {
  indicator: CgSpinner,
  isSpining: true,
  size: 20,
  enableTheme: true
}

export default Spinner
