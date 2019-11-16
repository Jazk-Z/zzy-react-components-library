import React, { FunctionComponent, ReactNode, MouseEventHandler } from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'
// type Props = {
//   name?: string
// }
// FunctionComponent === FC
const prefixCls = 'zbtn'
export interface ButtonProps {
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLElement>
  type?: string
  size?: string
  shape?: string
  className?: string
}
const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick: handleClick,
  type = 'primary',
  size = 'default',
  shape = 'circle',
  className
}) => {
  const classNames = classnames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-${size}`]: size
  })
  return (
    <button onClick={handleClick} className={classNames} type="button">
      {children}
    </button>
  )
}
// Button.propTypes = {
//   onClick: PropTypes.func,
//   type: PropTypes.string,
//   size: PropTypes.string,
//   shape: PropTypes.string
// }
Button.defaultProps = {}
export default Button
