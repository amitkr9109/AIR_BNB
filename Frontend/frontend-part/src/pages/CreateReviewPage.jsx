import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CreateReviewService } from "../API/ReviewService";
import { toast } from "react-toastify";

const CreateReviewPage = () => {

  const navigate = useNavigate();
  const { id: propertyId } = useParams();
  const [Ratings, setRatings] = useState("");
  const [Comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await CreateReviewService({
        Ratings,
        Comment,
        Property_id: propertyId,
      });

      if (res?.data?.ReviewCreatedata) {
        const reviewData = res.data.ReviewCreatedata
        console.log(reviewData);
        navigate(`/property/read/${propertyId}`, {
          state: {newReview: reviewData}
        });
        toast.success("Review created successfully!");
      }
    } catch (error) {
      console.log("error", err);
      toast.error(error?.response?.data?.message || "Review creation failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-100 p-6 rounded-xl shadow-md flex flex-col gap-4 mt-40">
      <div className="heading flex items-center gap-30">
        <Link to={`/property/read/${propertyId}`}><i className="ri-close-large-line text-zinc-800 cursor-pointer active:scale-95 hover:bg-zinc-400 rounded-full px-1 py-1"></i></Link>
        <h1 className="text-center font-bold text-lg text-zinc-800">Create Review</h1>
      </div>
        <label>Rating (0 to 5)</label>
          <input
            type="number"
            min="0"
            max="5"
            value={Ratings}
            onChange={(e) => setRatings(Number(e.target.value))}
            className="border p-2 rounded"
          />  
        <label>Comment</label>
        <textarea
          value={Comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded"
        ></textarea>
        <button onClick={handleSubmit} className="text-white bg-[#b17f44] px-4 py-3 w-full rounded-lg hover:bg-[rgb(233,140,33)] cursor-pointer active:scale-95">Submit</button>
    </div>
  );
};

export default CreateReviewPage;
