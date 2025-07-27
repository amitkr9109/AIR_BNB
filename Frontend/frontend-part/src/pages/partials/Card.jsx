import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DeletePropertyService } from "../../API/PropertyService";

const Card = ({ AllPropertyData }) => {

  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(AllPropertyData) {
      setProperties(AllPropertyData)
    }
  }, [AllPropertyData]);

  const DeleteHandler = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this property?");
    if (!confirm) return;

    try {
      await DeletePropertyService(id);
      setProperties((prev) => prev.filter((property) => property._id !== id));
    } catch (error) {
      console.error(err);
      alert("Failed to delete property.");
    }
    
  };

  return (
    <div className="w-full px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
        {properties.map(function(property, idx){
          return(
            <div key={idx} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
              <div className="w-full h-52 relative">
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center overflow-x-auto overflow-y-hidden no-scrollBar">
                  {property.Images && property.Images.map((image, index) => (
                    <img key={index} src={image} alt={property.location} className="w-full object-cover"/>
                  ))}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg">{property.Location}</h2>
                <p className="text-gray-500 text-sm">{new Date(property.createdAt).toLocaleString("en-In", {dateStyle: "medium", timeStyle: "short"})}</p>
                <p className="text-black font-bold mt-2">₹{property.Price}</p>
                {property.rating && (
                  <p className="text-yellow-500 text-sm mt-1">⭐ {property.rating.toFixed(2)}</p>
                )}
              </div>
              <div className="linkdivcontainer flex items-center justify-between p-2">
                <Link key={property.id} to={`/property/read/${property._id}`}>
                  <div className="flex items-center">
                    <i class="ri-eye-line"></i> 
                    <h1>View</h1>
                  </div>
                </Link>
                <Link to={`/property/edit/${property._id}`}>
                  <div className="flex items-center text-blue-700">
                    <i class="ri-refresh-line"></i> 
                    <h1>Update</h1>
                  </div>
                </Link>
                <button onClick={() => DeleteHandler(property._id)} className="flex items-center text-red-700 cursor-pointer">
                <i className="ri-delete-bin-6-line"></i>
                <h1>Delete</h1>
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="explore-more w-full text-center my-12 space-y-2 ">
        <h2 className="font-bold text-lg text-zinc-900">Continue exploring farms</h2>
        <button className="bg-[#111] text-[#fff] py-3 px-5 font-bold rounded-lg cursor-pointer">Show more</button>
      </div>
    </div>
  );
};

export default Card;