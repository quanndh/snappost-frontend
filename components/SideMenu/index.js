import React from "react";
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { FcHome, FcSms, FcFilm, FcBinoculars } from 'react-icons/fc';
import Router from 'next/router';


const SideMenu = ({ user }) => {
  if (!user) return null
  const listMenu = [
    {
      image: <AccountCircleSharpIcon />,
      label: user.firstName + " " + user.lastName,
      onClick: () => {
        Router.push(`/profile/${user?.id}`)
      }
    },
    {
      image: <FcHome />,
      label: 'Home',
      onClick: () => {
        Router.push("/")
      }
    },
    {
      image: <FcBinoculars />,
      label: "Friend requests",
      onClick: () => {
        Router.push("/friend-request")
      }
    },
    {
      image: <FcSms />,
      label: 'Messenger',
      onClick: () => { }
    },
    {
      image: <FcFilm />,
      label: 'Watch',
      onClick: () => { }
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