import React from 'react'
import classNames from 'classnames'
import Modal from 'react-modal'
import CloseButton from '../CloseButton'
import { motion } from 'framer-motion'

interface DrawerProps {
  className?: string
  children: string | JSX.Element
  footer?: string | JSX.Element
  onClose?: (e: React.MouseEvent<HTMLElement>) => void
  placement?: string
  width?: number
  height?: number
  overlayClassName?: string
  showBackdrop?: boolean
  portalClassName?: string
  lockScroll?: boolean
  bodyOpenClassName?: string
  isOpen?: boolean
  closeTimeoutMS?: number
  title: string
  closable?: boolean
  headerClass?: string
  bodyClass?: string
  footerClass?: string
  rest?: any
}
function Drawer(props: DrawerProps) {

  const {
    className,
    children,
    onClose,
    placement,
    width,
    height,
    overlayClassName,
    showBackdrop,
    portalClassName,
    lockScroll,
    bodyOpenClassName,
    isOpen,
    closeTimeoutMS,
    title,
    closable,
    bodyClass,
    footer,
    footerClass,
    headerClass,
    rest
  } = props

  const onCloseClick = (e: React.MouseEvent<HTMLElement>) => {
    onClose?.(e)
  }

  const renderCloseButton = (
    <CloseButton onClick={onCloseClick} />
  )

  const getStyle = (): any => {
    if(placement === 'left' ||  placement === 'right') {
      return {
				dimensionClass: 'vertical',
				contentStyle: { width },
				motionStyle: {
					[placement]: `-${width}${typeof width === 'number' && 'px'}`
				}
			}
    }
    if(placement === 'bottom' ||  placement === 'top') {
      return {
				dimensionClass: 'horizontal',
				contentStyle: { height },
				motionStyle: {
					[placement]: `-${height}${typeof height === 'number' && 'px'}`
				}
			}
    }
  }

  const { dimensionClass, contentStyle, motionStyle } = getStyle()

  return (
    <>
      <Modal
        className={{
          base: classNames('drawer', className),
          afterOpen: 'drawer-after-open',
				  beforeClose: 'drawer-before-close'
        }}
        overlayClassName={{
          base: classNames('drawer-overlay', overlayClassName, !showBackdrop && 'bg-transparent'),
          afterOpen: 'drawer-overlay-after-open',
          beforeClose: 'drawer-overlay-before-close'
        }}
        portalClassName={classNames('drawer-portal', portalClassName)}
        bodyOpenClassName={classNames('drawer-open', lockScroll && 'drawer-lock-scroll', bodyOpenClassName)}
        ariaHideApp={false}
        isOpen={isOpen}
        closeTimeoutMS={closeTimeoutMS}
        {...rest}
      >
        <motion.div
          className={classNames('drawer-content', dimensionClass)}
          style={contentStyle}
          initial={motionStyle}
          animate={{
            [placement as string]: isOpen ? 0 : motionStyle[placement as string]
          }}
        >
          { title || closable ?
            <div className={classNames('drawer-header', headerClass)}>
                {typeof title === 'string' ? <h4>{title}</h4> : <span>{title}</span>}
                {closable && renderCloseButton}
            </div>
            :
            null
          }
          <div className={classNames('drawer-body', bodyClass)}>
            {children}
          </div>
          {footer && <div className={classNames('drawer-footer', footerClass)}>{footer}</div>}
        </motion.div>
      </Modal>
    </>
  )
}

Drawer.defaultProps = {
	closable: true,
	width: 400,
	height: 400,
	closeTimeoutMS: 300,
	placement: 'right',
	showBackdrop: true,
	lockScroll: true
}

export default Drawer
