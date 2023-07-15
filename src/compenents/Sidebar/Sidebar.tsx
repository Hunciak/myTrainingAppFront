import React, {useState} from "react";
import './Sidebar.css'
import {GiHamburgerMenu} from "react-icons/gi";
import {AiOutlineHome} from "react-icons/ai";
import {Link} from "react-router-dom";
import {MdLogout} from "react-icons/md";
import {CgGym, CgProfile} from "react-icons/cg";

export const Sidebar = () => {
    const [show, setShow] = useState(false);
  return(
      <div>
          <div className={show ? "sidebar": 'sidebar1'}>
            <ul>
                <div className='main' onClick={() => setShow(!show)}>
                    <GiHamburgerMenu className='icon'/>
                </div>
                <li>
                    <Link to='/aftersignin'><AiOutlineHome className='icon'/></Link>
                    <Link to='/aftersignin'>{show ? <h2 className='desc'>Home</h2> :""}</Link>

                </li>
                <li>
                    <Link to='/profil'><CgProfile className='icon'/></Link>
                    <Link to='/profil'>{show ? <h2  className='desc'>Mój profil</h2> :""}</Link>
                </li>
                <li>
                    <Link to='/createexercise'><CgGym className='icon'/></Link>
                    <Link to='/createexercise'>{show ? <h2  className='desc'>Mój trening</h2> : ""}</Link>
                </li>
                <li>
                    <Link to='/logout'><MdLogout className='icon'/></Link>
                    <Link to='/logout'>{show ? <h2  className='desc'>Wyloguj</h2> :""}</Link>
                </li>
            </ul>
          </div>
      </div>
  )
};