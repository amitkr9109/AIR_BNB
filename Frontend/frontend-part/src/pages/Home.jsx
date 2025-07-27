import React from 'react'
import Card from './partials/Card'
import Footer from './partials/Footer'
import { useState } from 'react'
import { GetAllPropertyService } from '../API/PropertyService'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Home = () => {

  const [allproperty, setAllproperty] = useState(null);

  const fetchAllProperty = async () => {
    try {
      const res = await GetAllPropertyService();
      setAllproperty(res?.data?.AllViewdata);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllProperty();
  }, []);

  return (
    <div className='w-full h-full bg-zinc-50 pt-32 relative text-[#555]'>
      <h1 className='text-center mt-10 text-[4.5vw] font-medium leading-20'>Experience the <span className='text-[#b17f44]'>Aura</span> <br/> of Elegance.</h1>
      {allproperty?.length > 0 ? (
      <Card AllPropertyData={allproperty} />) : (<p className='font-thin text-2xl p-20'>No Properties Found...</p>)}
      <Footer/>
    </div>
  )
}

export default Home;