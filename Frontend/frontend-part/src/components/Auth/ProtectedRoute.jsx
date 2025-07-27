import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  useEffect(() => {
    if(!isLoggedIn){
      navigate("/");
    }
  },[isLoggedIn, navigate]);

  return isLoggedIn ? children: null
};

export default ProtectedRoute;
