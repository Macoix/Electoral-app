import React from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { checkIsActive } from '../../../../_helpers'
import routes from '../../../../../routes'

export function HeaderMenu ({ layoutProps }) {
  const location = useLocation()
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? 'menu-item-active' : ''
  }

  return (
    <div
      id='kt_header_menu'
      className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/* begin::Header Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/* begin::1 Level */}
        {routes.map((route, i) => {
          if (!route.children) {
            return (
              <li key={route.path} className={`menu-item menu-item-rel ${getMenuItemActive(route.path)}`}>
                <NavLink key={i} className='menu-link' to={route.path}>
                  {/* <span className='svg-icon menu-icon'>
                      <Icon>add_circle</Icon>
                  </span> */}
                  <span className='menu-text'>{route.title}</span>
                </NavLink>
              </li>
            )
          } else {
            return (
              <li
                key={route.path}
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup='true'
                className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(route.path)}`}
              >
                <NavLink key={i} className='menu-link menu-toggle' to={route.path}>
                  <span className='menu-text'>{route.title}</span>
                  <i className='menu-arrow' />
                </NavLink>
                <div className='menu-submenu menu-submenu-classic menu-submenu-left'>
                  <ul className='menu-subnav'>
                    {/* begin::2 Level */}
                    {
                      route.children.map((child, i) => {
                        if (!child.children) {
                          return (
                            <li key={child.path} className={`menu-item menu-item-rel ${getMenuItemActive(child.path)}`}>
                              <NavLink key={i} className='menu-link' to={child.path}>
                                {/* <span className='svg-icon menu-icon'>
                                    <Icon>add_circle</Icon>
                                </span> */}
                                <span className='menu-text'>{child.title}</span>
                              </NavLink>
                            </li>
                          )
                        } else {
                          return (
                            <li
                              key={child.path}
                              className={`menu-item menu-item-submenu ${getMenuItemActive(child.path)}`}
                              data-menu-toggle='hover'
                              aria-haspopup='true'
                            >
                              <NavLink key={i} className='menu-link menu-toggle' to={child.path}>
                                {/* <span className='svg-icon menu-icon'>
                                    <SVG src={toAbsoluteUrl('/media/svg/icons/Design/PenAndRuller.svg')} />
                                </span> */}
                                <span className='menu-text'>
                                  {child.title}
                                </span>
                                <i className='menu-arrow' />
                              </NavLink>
                              <div className='menu-submenu menu-submenu-classic menu-submenu-right'>
                                <ul className='menu-subnav'>
                                  {/* begin::3 Level */}
                                  {child.children.map((childT, i) => {
                                    return (
                                      <li key={childT.path} className={`menu-item ${getMenuItemActive(childT.path)}`}>
                                        <NavLink key={i} className='menu-link' to={childT.path}>
                                          <i className='menu-bullet menu-bullet-dot'><span /></i>
                                          <span className='menu-text'>{childT.title}</span>
                                        </NavLink>
                                      </li>
                                    )
                                  })}
                                  {/* end::3 Level */}
                                </ul>
                              </div>
                            </li>
                          )
                        }
                      })
                    }
                    {/* end::2 Leve l */}
                  </ul>
                </div>
              </li>
            )
          }
        })}
      </ul>
      {/* end::Header Nav */}
    </div>
  )
}
