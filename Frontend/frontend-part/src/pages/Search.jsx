import React, { useState } from 'react';
import { DeletePropertyService, GetAllPropertySearchService } from '../API/PropertyService';
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
    
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState([]);

  const HandleSearch = async () => {
    try {
      const searchData = {Location: locationName, MinPrice: minPrice, MaxPrice: maxPrice};
      const properties = await GetAllPropertySearchService(searchData);
      setResults(properties);
    } catch (error) {
      setResults([]);
    }
  };

  const DeleteHandler = async (id) => {
    const confirm = window.confirm("Are you sure you want to property delete ?");
    if(!confirm) return;
    await DeletePropertyService(id);
    navigate("/property/allsearch")
  }

  return (
    <div className='min-h-screen bg-zinc-100 px-6 py-10 mt-30'>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        <div className="heading flex items-center gap-30">
          <Link to="/"><i className="ri-close-large-line text-zinc-800 cursor-pointer active:scale-95 hover:bg-zinc-400 rounded-full px-1 py-1"></i></Link>
          <h1 className="text-center font-bold text-lg text-zinc-800">Searching Location <i className="ri-search-2-line text-xl"></i></h1>
        </div>
        <input
          type="text"
          placeholder="Search by location..."
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-lg"
          required
        />

        <div className="flex flex-col gap-4 my-2">
            <h1 className="text-lg font-bold">Price Range <span className="text-sm text-zinc-500">(INR)</span></h1>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Min Price"
                className="border p-2 rounded-md w-full"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Max Price"
                className="border p-2 rounded-md w-full"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                required
              />
            </div>
          </div>

        <button onClick={HandleSearch} className="text-white bg-[#b17f44] px-4 py-3 w-full rounded-lg hover:bg-[rgb(233,140,33)] cursor-pointer active:scale-95">Searching...</button>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {results.map((property) => (
          <div key={property._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
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
        ))}
      </div>
    </div>
  );
};

export default Search;
