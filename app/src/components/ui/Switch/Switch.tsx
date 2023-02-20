import { useState } from 'react'
import classNames from 'classnames'

interface SwitchProps {
  defaultChecked?: boolean
  onChange?: Function
  className?: string
  disabled?: boolean
  color?: string
  checkedContent?: string | JSX.Element
  unCheckedContent?: string | JSX.Element
  checkedClassContent?: string,
  unCheckedClassContent?: string,
}

export default function Switch (props: SwitchProps) {

  const {
    defaultChecked,
    onChange,
    className,
    disabled,
    color,
    checkedContent,
    unCheckedContent,
    checkedClassContent,
    unCheckedClassContent
  } = props

  const [isToggled, setToggled] = useState(defaultChecked)

  const colorToggled = color || 'bg-blue-600 dark:bg-blue-600'

  const classes = classNames(
    'switcher',
    isToggled ? `switcher-checked ${colorToggled}`: '',
    disabled ? 'switcher-disabled' : '',
    className
  )

  const handleChange = (event: React.ChangeEvent<HTMLLabelElement>) => {
    setToggled(!isToggled);
    (onChange)?.(isToggled, event)
  }

  return (
    <>
      <label className={classes} onChange={!disabled ? handleChange : undefined}>
        <input type="checkbox" defaultValue={isToggled ? 'true' : 'false'} defaultChecked={isToggled ? true : false}/>
        <div className="switcher-toggle"></div>
        <div className={`switcher-content ${isToggled ? checkedClassContent : unCheckedClassContent}`}>
          {isToggled ? checkedContent : unCheckedContent}
        </div>
      </label>
    </>
  )
}

Switch.defaultProps = {
  defaultChecked: false
}
