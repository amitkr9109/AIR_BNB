import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { asyncLogin } from '../store/action/UserAction';

const Login = ({ display, setDisplay }) => {

  const dispatch = useDispatch();

  const {register, handleSubmit, formState: {errors}} = useForm();

  if(!display) return null;

  const FormSubmit = async function(data){
    const result = await dispatch(asyncLogin(data));
    if(result){
      setDisplay(false);
    }
  };

  return (
    <div className="loginPage flex fixed z-[2] top-0 left-0 w-full bg-zinc-800/[.4] h-screen items-center justify-center ">
      <div className="w-[35%] bg-zinc-50 py-1 rounded-md">
        <div className="w-full relative border-b border-[#dfdfdf] py-4">
          <div className="absolute top-1/2 left-[3%] -translate-y-1/2">
            <i onClick={function(){
              setDisplay(false)
            }} className="ri-close-large-line text-zinc-800 cursor-pointer active:scale-95 hover:bg-zinc-400 rounded-full px-1 py-1"></i>
          </div>
          <h1 className='text-center font-bold text-lg text-zinc-800'>Sign Up</h1>
        </div>
        <div className="px-5 py-5">
          <form onSubmit={handleSubmit(FormSubmit)}>
            <div className="w-full border border-zinc-500 rounded-md">
              <div className="w-full p-4 text-md relative border-b border-zinc-500 flex items-center justify-center gap-3">
                <label>Email:- </label>
                <input type="email" className="w-full h-full focus:outline-none text-xl" {...register("email",{required: "Email is required"})}/>
                {errors.email && (<p className='absolute w-full bottom-0 left-[3%] text-red-800 text-sm'>{" "} <i className="ri-information-fill text-[red]"></i>{" "} {errors.email.message}</p>)}
              </div>
              <div className="w-full p-4 text-md relative border-b border-zinc-500 flex items-center justify-center gap-3">
                <label>Password:- </label>
                <input type="password" className="w-full h-full focus:outline-none text-xl" {...register("password", {required: "Password is required"})}/>
                {errors.password && (<p className='absolute w-full bottom-0 left-[3%] text-red-800 text-sm'>{" "} <i className="ri-information-fill text-[red]"></i>{" "} {errors.password.message}</p>)}
              </div>
            </div>
            <button type="submit" className="w-full text-center bg-[#b17f44] mt-4 text-white rounded-md py-3 cursor-pointer active:scale-95 hover:bg-[rgb(233,140,33)]">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Login
