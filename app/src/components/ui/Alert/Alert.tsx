import React, { useState } from 'react'
import classNames from 'classnames'
import { HiCheckCircle, HiInformationCircle, HiExclamation, HiXCircle } from 'react-icons/hi'
import { motion } from 'framer-motion'
import useTimeout from '../hooks/useTimeOut'
import CloseButton from '../CloseButton'

interface AlertProps {
  type?: string
  title?: string
  closable?: boolean
  className?: string
  showIcon?: boolean
  children?: string | JSX.Element
  onClose?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  duration: number
  triggerByToast?: boolean
  customClose?: JSX.Element
}

function Alert(props: AlertProps) {
  const { type, title, closable, className, showIcon, children, onClose, duration, triggerByToast, customClose } = props
  const [display, setDisplay] = useState<string>('show')
  const { clear } = useTimeout(onClose, duration, duration > 0)

  const alertDefaultClass = 'p-4 relative flex'

  const ALERT_TYPE = {
    success: {
      backgroundColor: 'bg-emerald-50 dark:bg-emerald-500',
      titleColor: 'text-emerald-700 dark:text-emerald-50',
      textColor: 'text-emerald-500 dark:text-emerald-50',
      iconColor: 'text-emerald-400 dark:text-emerald-50',
      icon: <HiCheckCircle />
    },
    info: {
      backgroundColor: 'bg-blue-50 dark:bg-blue-500',
      titleColor: 'text-blue-700 dark:text-blue-100',
      textColor: 'text-blue-500 dark:text-blue-100',
      iconColor: 'text-blue-400 dark:text-blue-100',
      icon: <HiInformationCircle />
    },
    warning: {
      backgroundColor: 'bg-yellow-50 dark:bg-yellow-500',
      titleColor: 'text-yellow-700 dark:text-yellow-50',
      textColor: 'text-yellow-500 dark:text-yellow-50',
      iconColor: 'text-yellow-400 dark:text-yellow-50',
      icon: <HiExclamation />
    },
    danger: {
      backgroundColor: 'bg-red-50 dark:bg-red-500',
      titleColor: 'text-red-700 dark:text-red-100',
      textColor: 'text-red-500 dark:text-red-100',
      iconColor: 'text-red-400 dark:text-red-100',
      icon: <HiXCircle />
    }
  }

  const getAlertColor = () => {
    const { backgroundColor, titleColor, textColor, iconColor } = ALERT_TYPE[type as keyof typeof ALERT_TYPE]
    return `${backgroundColor} ${titleColor} ${textColor} ${iconColor}`
  }

  const alertClass = classNames(
    'alert',
    alertDefaultClass,
    getAlertColor(),
    !title ? 'font-semibold' : '',
    closable ? 'justify-between' : '',
    closable && !title ? 'items-center' : '',
    'rounded-lg',
    className
  )

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDisplay('hiding')
    onClose?.(e)
    if (!triggerByToast) {
			setTimeout(() => {
				setDisplay('hide')
			}, 400)
		}
  }

  if (display === 'hide') {
		return null
	}

  const renderClose = () => {
		return (
			<div className="cursor-pointer" onClick={e => handleClose(e)}>
				{customClose || <CloseButton defaultStyle={false} />}
			</div>
		)
	}



  return (
    <>
      <motion.div
        className={alertClass}
        initial={{ opacity: 1 }}
        animate={display === 'hiding' ? 'exit' : 'animate'}
        transition={{ duration: 0.25, type: 'tween' }}
        variants={{
          animate: {
            opacity: 1
          },
          exit: {
            opacity: 0,
          }
        }}
      >
        <div className={`flex ${title ? '' : 'items-center'}`}>
          {showIcon && (
            <div className="text-xl">{ALERT_TYPE[type as keyof typeof ALERT_TYPE].icon}</div>
          )}
          <div className={showIcon ? 'ml-2' : ''}>
            {title ? <div className={`font-semibold mb-1 ${ALERT_TYPE[type as keyof typeof ALERT_TYPE].titleColor}`}>{title}</div> : null}
            {children}
          </div>
        </div>
        {closable ? renderClose() : null }
      </motion.div>
    </>
  )
}

Alert.defaultProps = {
  type: 'info',
  showIcon: false,
  triggerByToast: false,
  closable: false,
  duration: 3000,
  title: null,
  rounded: true
}

export default Alert
