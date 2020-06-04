import React from "react";
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { FcHome, FcSms, FcFilm } from 'react-icons/fc';


const SideMenu = (props) => {

  const listMenu = [
    {
      image: <AccountCircleSharpIcon />,
      label: 'Quan Nguyen',
      onClick: () => {}
    },
    {
      image: <FcHome />,
      label: 'Home',
      onClick: () => {}
    },
    {
      image: <FcSms />,
      label: 'Messenger',
      onClick: () => {}
    },
    {
      image: <FcFilm />,
      label: 'Watch',
      onClick: () => {}
    },
  ]

  return (
    <div className="side-menu-container">
      {listMenu.map(menu => (
        <div className="side-menu-item" key={menu.label} onClick={menu.onClick}>
          <div className="side-menu__logo">
            {menu.image}
          </div>
          <div className="side-menu__label">
            {menu.label}
          </div>
        </div>
      ))}
    </div>
  )
}
export default SideMenu;