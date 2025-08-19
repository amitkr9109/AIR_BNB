import React from 'react'
import Nav from './pages/partials/Nav'
import { Route, Routes } from 'react-router-dom'
import CreateProperty from './pages/CreateProperty'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { asynCurrentUser } from './store/action/UserAction'
import SingleProperty from './pages/SingleProperty'
import EditProperty from './pages/EditProperty'
import Search from './pages/Search'
import BookingPage from './pages/BookingPage'
import AllBookings from './pages/partials/AllBookings'
import CreateReviewPage from './pages/CreateReviewPage'
import EditReviewPage from './pages/EditReviewPage'
import AllUser from './pages/partials/AllUser'
import AllProperties from './pages/partials/AllProperties'


const App = () => {

  const dispatch = useDispatch();

  const CurrentUser = useSelector((store) => store.users);

  useEffect(function(){
    dispatch(asynCurrentUser());
  },[dispatch]);

  return (
    <>
      <main>
        <Nav/>
        <Routes>
          <Route path='/admin' element={<ProtectedRoute><AdminPanel/></ProtectedRoute>}>
            <Route path='users' element={<AllUser />}/>
            <Route path='properties' element={<AllProperties />}/>
            <Route path='bookings' element={<AllBookings />}/>
          </Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/property/create' element={<CreateProperty/>}></Route>
          <Route path='/property/read/:id' element={<SingleProperty/>}></Route>
          <Route path='/property/edit/:id' element={<EditProperty/>}></Route>
          <Route path='/property/allsearch' element={<ProtectedRoute><Search/></ProtectedRoute>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/Booking/:id' element={<BookingPage/>}></Route>
          <Route path='/bookings' element={<AllBookings />}></Route>
          <Route path='/review/create/:id' element={<CreateReviewPage />}></Route>
          <Route path='/review/edit/:id' element={<EditReviewPage />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App;