import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { asynLogout } from '../../store/action/UserAction';
import SignUp from '../SignUp';
import Login from '../Login';

const Nav = () => {

  const dispatch = useDispatch();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);


  const LoginHandler = function(){
    setIsLoginVisible(!isLoginVisible);
  };
  const SignupHandler = function(){
    setIsSignupVisible(!isSignupVisible);
  };
  const ToogleMenu = function(){
    setIsMenuVisible(!isMenuVisible);
  };

  const LogOutHandler = async function(){
    const res = dispatch(asynLogout());
  };


  const handleOutsideClick = function(e){
    if(!document.querySelector(".menu").contains(e.target) && !document.querySelector(".menu-handler").contains(e.target)){
      setIsMenuVisible(false);
    }
  };

  useEffect(function(){
    document.addEventListener("click", handleOutsideClick);
    return function(){
      document.removeEventListener("click", handleOutsideClick);
    }
  },[]);

  const { pathname } = useLocation();



  return (
    <>
      <nav className='fixed top-0 w-full z-[1] text-[#555]'>
        <div className="nav-p1 w-full h-30 px-20 flex items-center justify-between border-b border-[#dfdfdf] bg-zinc-50">
          <Link to={"/"} className='logo h-8'>
            <img draggable="false" className='h-full object-cover red-filter' src="/images/nav-png.svg" alt="" />
          </Link>
          <div className="flex gap-8 w-fit items-center">
            <Link to={"/property/allsearch"} className='font-[600] text-sm active:scale-95'>Search</Link>
            <Link to={"/property/create"} className='font-[600] text-sm active:scale-95'>Add Your Property</Link>
            <Link to={"/admin"} className="font-[600] text-sm active:scale-95">Admin panel</Link>
            <div><i className="ri-global-line text-lg"></i></div>
            <div onClick={ToogleMenu} className="menu-handler flex cursor-pointer relative items-center border-2 border[#666] py-1 px-3 rounded-full gap-3 active:scale-95"><i className="ri-menu-line font-bold"></i>
              <div className="bg-[#666] h-8 aspect-square flex items-end justify-center rounded-full">
                <div className="rounded-full text-white text-lg overflow-hidden"><i className="ri-user-3-fill text-white"></i></div>
              </div>
              <div className={`menu absolute ${isMenuVisible ? "initial": "hidden"} top-[110%] w-[280%] shadow-[0_4px_20px_3px_rgba(0,0,0,0.1)] overflow-hidden z-[2] right-0 bg-zinc-50 rounded-xl`}>
                <Link to={"/"}><h3 className="text-sm px-4 hover:bg-zinc-200/[.5] cursor-pointer transition-all ease-in-out duration-[.5s] py-6 active:scale-95">My profile</h3></Link>
                <h3 onClick={SignupHandler} className="text-sm px-4 hover:bg-zinc-200/[.5] cursor-pointer transition-all ease-in-out duration-[.5s] py-6 active:scale-95">Sign up</h3>
                <h3 onClick={LoginHandler} className="text-sm px-4 hover:bg-zinc-200/[.5] cursor-pointer transition-all ease-in-out duration-[.5s] py-6 border-b border-zinc-300">Log in</h3>
                <h3 className="text-sm px-4 hover:bg-zinc-200/[.5] cursor-pointer transition-all ease-in-out duration-[.5s] py-6">Host an experience</h3>
                <h3 className="text-sm px-4 hover:bg-zinc-200/[.5] cursor-pointer transition-all ease-in-out duration-[.5s] py-6">Help Center</h3>
                <h3 onClick={LogOutHandler} className="text-sm px-4 hover:bg-zinc-200/[.5] cursor-pointer transition-all ease-in-out duration-[.5s] py-6 active:scale-95">Logout</h3>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isLoginVisible && (
        <Login display={isLoginVisible} setDisplay={setIsLoginVisible} />
      )}
      {isSignupVisible && (
        <SignUp display={isSignupVisible} setDisplay={setIsSignupVisible} />
      )}
      
    </>
  )
}

export default Nav
