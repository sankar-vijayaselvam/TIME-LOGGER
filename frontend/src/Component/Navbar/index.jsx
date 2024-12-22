import React from 'react'
import useAuth from "../../Hooks/auth"
import RouteLink from "./RouteLink"
import {Link} from "react-router-dom"

export default function Navbar() {
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        window.location.href = '/login';
      };
      useAuth();
      const role = localStorage.getItem('role');
  return (
    <> 
       <div>
            <nav className='bg-[#112d5b] p-5'>
                <div className='container flex max-auto justify-between items-center'>
                <div className="flex space-x-10">
                {
                    role === 'user' &&
                    RouteLink.user.map((user, index) => (
                    <Link to={user.link} className="text-white hover:text-gray-300 text-lg font-bold">
                        {user.name}
                    </Link>
                    ))
                }
                {
                    role === 'admin' &&
                    RouteLink.admin.map((admin, index) => (
                    <Link to={admin.link} className="text-white hover:text-gray-300 text-lg font-bold">
                        {admin.name}
                    </Link>
                    ))
                }

                    <div className="text-white hover:text-gray-300 text-lg font-bold cursor-pointer" onClick={logout}>
                        LOG OUT
                    </div>
                </div>
                </div>

            </nav>
       </div>
    </>
  )
}
