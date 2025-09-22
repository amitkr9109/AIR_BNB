import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ReadReviewService, UpdateReviewService } from "../API/ReviewService";
import { toast } from "react-toastify";

const EditReviewPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [Ratings, setRatings] = useState("");
  const [Comment, setComment] = useState("");



  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await ReadReviewService(id);
        setRatings(res.data.ReviewShowingdata.Ratings);
        setComment(res.data.ReviewShowingdata.Comment);

      } catch (error) {
        toast.error("Failed to load review");
      }
    }
    fetchReview();
  }, [id]);

  const handleUpdateSubmit = async () => {
  if (Ratings < 0 || Ratings > 5) {
    return toast.error("Rating must be between 0 and 5");
  }

  try {
    const updatedData = { Ratings, Comment };
    const res = await UpdateReviewService(id, updatedData);

    const propertyId = res?.data?.data?.Property?._id;
    if (propertyId) {
      toast.success("Review updated successfully!");
      navigate(`/property/read/${propertyId}`);
    } else {
      toast.error("Property ID not found in response");
    }

  } catch (err) {
    toast.error("Failed to update review");
  }
};






  return (
    <div className="max-w-xl mx-auto bg-gray-100 p-6 rounded-xl shadow-md flex flex-col gap-4 mt-40">
      <div className="heading flex items-center gap-30">
        <Link to={`/property/read/${id}`}><i className="ri-close-large-line text-zinc-800 cursor-pointer active:scale-95 hover:bg-zinc-400 rounded-full px-1 py-1"></i></Link>
        <h1 className="text-center font-bold text-lg text-zinc-800">Update Review</h1>
      </div>
        <label>Rating (0 to 5)</label>
          <input
            type="number"
            min="0"
            max="5"
            value={Ratings}
            onChange={(e) => setRatings(Number(e.target.value))}
            className="border p-2 rounded"
            required
          />  
        <label>Comment</label>
        <textarea
          value={Comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded"
          required
        ></textarea>
        <button onClick={handleUpdateSubmit} className="text-white bg-[#b17f44] px-4 py-3 w-full rounded-lg hover:bg-[rgb(233,140,33)] cursor-pointer active:scale-95">Update</button>
    </div>
  );
};

export default EditReviewPage;

