import React, { useEffect, useState } from "react";
import Footer from "./partials/Footer";
import BookingCard from "./partials/BookingCard";
import { useParams, Link, useLocation } from "react-router-dom";
import { GetPropertyDetailsService } from "../API/PropertyService";
import { AllReadReviewService, DeleteReviewService } from "../API/ReviewService";

const SingleProperty = () => {

  const { id } = useParams();
  const location = useLocation();

  const { newReview } = location.state || {};

  const [propertyDetails, setPropertyDetails] = useState(null);
  const [createdReview, setCreatedReview] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handlePropertyDetails = async () => {
    try {
      const res = await GetPropertyDetailsService(id);
      setPropertyDetails(res?.data?.Viewdata);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchedAllReview = async () => {
    try {
      const res = await AllReadReviewService(id);
      setReviews(res?.data?.AllReviwData || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handlePropertyDetails();
    fetchedAllReview();
  }, [id]);

  
  useEffect(() => {
    if(newReview) {
      setCreatedReview(newReview);
      setReviews((prev) => [newReview, ...prev]);
    }
  }, [newReview]);
  

  
  if (!propertyDetails) return <div className="p-4">Loading...</div>;


  const ratings = [
    { label: "Cleanliness", value: "5.0", icon: "ri-sparkling-line" },
    { label: "Accuracy", value: "5.0", icon: "ri-checkbox-circle-line" },
    { label: "Check-in", value: "5.0", icon: "ri-key-line" },
    { label: "Communication", value: "4.9", icon: "ri-chat-4-line" },
    { label: "Location", value: "5.0", icon: "ri-map-pin-line" },
    { label: "Value", value: "4.9", icon: "ri-price-tag-3-line" },
  ]; 

  const averageRating = reviews.length ? (reviews.reduce((acc, curr) => acc + curr.Ratings, 0) / reviews.length).toFixed(1) : "0";


  const DeleteReviewHandler = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this review?");
    if (!confirm) return;

    try {
      await DeleteReviewService(id);
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error(err);
      alert("Failed to delete property.");
    }

  };

  return (
    <>
      <div className="h-full w-full bg-zinc-50 pt-35 px-30">
        <div className="w-full h-[60vh] flex gap-2 rounded-2xl overflow-hidden">
          <div className="w-1/2 h-full relative">
            <div className="w-full h-full absolute top-0 left-0 hover:bg-black/[.2] cursor-pointer duration-[.2s]"></div>
            <img src={propertyDetails?.Images[0]} alt="" className="w-full h-full object-cover"/>
          </div>
          <div className="w-1/2 h-full flex flex-wrap gap-2">
            <div className="w-[20.4vw] h-[29.4vh] relative">
              <img src={propertyDetails?.Images[1]} alt="" className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"></div>  
            </div>
            <div className="w-[20.4vw] h-[29.4vh] relative">
              <img src={propertyDetails?.Images[2]} alt="" className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"></div>  
            </div>
            <div className="w-[20.4vw] h-[29.4vh] relative">
              <img src={propertyDetails?.Images[3]} alt="" className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"></div>  
            </div>
            <div className="w-[20.4vw] h-[29.4vh] relative">
              <img src={propertyDetails?.Images[4]} alt="" className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"></div>  
            </div>
          </div>
        </div>
        
        <div className="flex justify-between w-full px-2 items-end mb-4">
          <div className="w-[50%]">
            <div className="flex justify-between items-center w-full ">
              <div className="my-6">
                <h1 className="text-2xl text-black ">{propertyDetails?.Title}</h1>
                <p className="text-lg font-thin">{propertyDetails?.Description}</p>
                <h1 className="text-lg">₹{propertyDetails?.Price}</h1>
              </div>
              <div className="my-6 h-full w-[20%] flex items-center justify-between ">
                <div>
                  <h3 className="flex relative">
                    <i className="ri-star-fill text-5xl text-[#b17f44]"></i>
                    <p className="absolute text-xs font-bold text-zinc-200 top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2">{averageRating}</p>
                  </h3>
                </div>
                <div className="h-[40px] bg-zinc-300 w-[1px] "></div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-black">{reviews.length}</h3>
                  <p className="text-xs underline">Reviews</p>
                </div>
              </div>
            </div>

            <div className="amenities w-full mt-2">
              <h1 className="text-2xl text-black ">What this place offers</h1>
              <div className="grid grid-cols-2 gap-10 p-5 text-md">
                {propertyDetails?.Amenities
                  .slice(0, 10)
                  .map((amenity, index) => (
                    <h4 key={index} className="col-span-1 text-zinc-800">
                      ~ {amenity}
                    </h4>
                  ))}
                {propertyDetails?.Amenities.length > 5 ? (
                  <button className="flex flex-start w-[15vw] px-5 py-2 text-zinc-800 border-zinc-800 border rounded-md cursor-pointer"type="submit">Show all {propertyDetails.Amenities.length} amenities</button>) : ("")}
              </div>
            </div>
          </div>

          <div className="booking-card-page w-fit mb-4">
            <BookingCard
              TotalPrice={propertyDetails?.Price}
              propertyShow_id={propertyDetails?._id}
            />
          </div>
          
        </div>

        <Link to={`/review/create/${id}`}>
          <button className="bg-[#b17e44eb] text-white font-bold py-2 px-4 w-fit rounded-lg mb-4 cursor-pointer active:scale-95 hover:bg-[#b17e44] mt-10">Review Property</button>
        </Link>

        <div className="text-center mb-8 mt-20">
          <div className="flex items-start justify-center">
            <img className="h-32" src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png" alt="" />
            <h1 className="text-8xl text-zinc-800 font-bold">{averageRating}</h1>
            <img className="h-32" src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png" alt="" />
          </div>
          <p className="text-2xl text-zinc-800 font-bold ">Guest favourite</p>
          <p className="text-gray-600 text-lg w-[30%] text-center mx-auto">One of the most loved homes on Airbnb based on ratings, reviews and reliability</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8">
          {ratings.map((rating) => (
            <div key={rating.label} className="text-center">
              <p className="text-xl font-semibold">{rating.value}</p>
              <div className="flex justify-center items-center mt-1">
                <i className={`${rating.icon} text-2xl`} />
              </div>
              <p className="text-gray-500 text-sm">{rating.label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto py-4 relative">
          <h2 className="text-2xl font-semibold mb-10">All User Reviews Here...</h2>
          <div className="mt-6 flex flex-wrap items-center gap-15">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-gray-100 px-10 py-4 rounded-md w-fit hover:bg-gray-200">
                      <p className="text-gray-500 mb-1"><span className="font-semibold text-gray-800">Rating </span>⭐️⭐️⭐️⭐️⭐️ :- {review.Ratings}</p>
                      <p className="text-gray-500 max-w-96"><span className="font-semibold text-gray-800">Comment :- </span>{review.Comment}</p>
                      <p className="text-gray-500"><span className="font-semibold text-gray-800">Date:- </span> {new Date(review.createdAt || Date.now()).toLocaleDateString()}</p>
                      <div className="logocontainer flex items-center justify-between p-2">    
                        <Link to={`/review/edit/${review._id}`}>
                          <div className="flex items-center text-blue-700 active:scale-95">
                            <i class="ri-refresh-line"></i> 
                            <h1>Update</h1>
                          </div>
                        </Link>
                        <button onClick={() => {DeleteReviewHandler(review._id)}} className="flex items-center text-red-700 cursor-pointer active:scale-95">
                          <i className="ri-delete-bin-6-line"></i>
                          <h1>Delete</h1>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>    
        </div>
      </div>

      <Footer />

    </>
  );
};

export default SingleProperty;