/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Logo from '../../../assets/logo.svg';
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const Navbar = () => {


    const {logOut, user} = useContext(AuthContext);
    console.log(user);

    const handleLogOut = () => {
        logOut()
        .then(() => {})
        .catch(err => alert(err.message));
    }

    const navItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/services'>Services</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
        <li><Link to='/login'>Login</Link></li>
        {
            user && 
            <>
            <li><Link to={`/bookings`}>My Bookings</Link></li>
            <li className="text-rose-500 font-bold mr-2">{user.email}</li>
            </>
        }
        {
            user ?
            <>
            <li><button className='btn btn-error mr-2 text-white' onClick={handleLogOut}>Log Out</button></li>
            </>
            :
            <Link to='/login'>
                <button className='btn btn-error  text-white' >Log In</button>
            </Link>
        }
    </>

    return (
        <div className="navbar bg-base-100 h-28 mb-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 items-center">
                        {navItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">
                    <img src={Logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 items-center">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-outline btn-error">Appointment</button>
            </div>
        </div>
    );
};

export default Navbar;
