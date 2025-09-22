import React, { useEffect, useState } from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { PropertyBookingCanceledService } from "../API/BookingService";
import { VerifyPaymentService } from "../API/PaymentService";
import axios from "../API/AxiosConfig";

const BookingPage = () => {

  const navigate = useNavigate();
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const title = params.get("title");
  const location = params.get("location");
  const images = JSON.parse(decodeURIComponent(params.get("images")));
  const bookingId = params.get("bookingId");

  const [paymentDetails, setPaymentDetails] = useState({
    Razorpay_Order_Id: "",
    Razorpay_Payment_Id: "",
    Razorpay_Signature: "",
  });

  const verifyPayment = async (paymentData) => {
  try {
    const res = await VerifyPaymentService(paymentData);

    if (res && !res.error) {
      // alert("Payment verified successfully");
      console.log("res after success ->", res);
      navigate("/");
    } else {
      throw new Error(res.message || "Payment verification failed");
    }

    return res;
  } catch (error) {
    console.error("Payment verification failed:", error);
    alert("Payment verification failed");
  }
};


  useEffect(() => {
    if (
      paymentDetails &&
      paymentDetails.Razorpay_Order_Id &&
      paymentDetails.Razorpay_Order_Id.trim() !== "" &&
      paymentDetails.Razorpay_Payment_Id &&
      paymentDetails.Razorpay_Payment_Id.trim() !== "" &&
      paymentDetails.Razorpay_Signature &&
      paymentDetails.Razorpay_Signature.trim() !== ""
    ) {
      verifyPayment(paymentDetails);
    }
  }, [paymentDetails]);

  const data = decodeURIComponent(search)
    .split("?")[1]
    .split("&")
    .reduce((acc, item) => {
      const [key, value] = item.split("=");
      acc[key] = value.replace(/^"|"$/g, "");
      return acc;
    }, {});



  const handlePayment = async () => {

    const res = await axios.post("/payment/process", {
      Amount: data.price * data.days * data.guests,
      Currency: "INR",
      bookingId: bookingId,
    });
    const orderData = res.data.data;
    const order_id = orderData.id;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data?.price * 100, 
      currency: "INR",
      name: "Test Corp",
      description: "Test Transaction",
 
      Order_id: order_id,

      handler: function (response) {
        alert(`Payment successful!
        Payment ID: ${response.razorpay_payment_id}
        Order ID: ${response.razorpay_order_id}
        Signature: ${response.razorpay_signature}`);
      const paymentData = {
        Razorpay_Order_Id: response.razorpay_order_id,
        Razorpay_Payment_Id: response.razorpay_payment_id,
        Razorpay_Signature: response.razorpay_signature,
      };

      verifyPayment(paymentData);

      setPaymentDetails(paymentData);
      },
      prefill: {
        name: "amit",
        email: "a@example.com",
        contact: import.meta.env.NUMBER,
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        upi: true,
        card: false,
        netbanking: false,
        wallet: false,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleCancel = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel booking?");
    if(!confirm) return;

    const res = await PropertyBookingCanceledService(id);
    
    const propertyId = res?.data?.bookingCancelData?.Property?._id;
    if (propertyId) {
      navigate(`/property/read/${propertyId}`);
      toast.success("Booking cancel successfully!");
    } else {
      toast.error("Property ID not found in response");
    }
    
  }

  return (
    <div className="h-screen w-full bg-zinc-100 px-40 flex flex-col justify-center items-center mt-15">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-[15vw]">
        <div className="left w-[28vw]">
          <h1 className="text-2xl font-bold mb-6">Request to book</h1>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-5">Your trip details :-</h2>
            <p className="text-xl font-semibold text-black">Dates</p>
              <div className="flex items-center justify-around mt-1">
                  <div className="checkin">
                    <p className="text-lg font-medium text-gray-600">CheckinDates</p>
                    <p className="text-lg text-gray-600 font-thin">
                      {new Date(data.checkinDate).getDate() + " " + new Date(data.checkinDate).toLocaleString("default", { month: "short", }) + " " + new Date(data.checkinDate).getFullYear()}{" "}
                    </p>
                  </div>
                  <div className="checkout">
                    <p className="text-lg font-medium text-gray-600">CheckOutDates</p>
                    <p className="text-lg text-gray-600 font-thin">
                      {" "} {new Date(data.checkoutDate).getDate() + " " + new Date(data.checkoutDate).toLocaleString("default", { month: "short",}) + " " + new Date(data.checkoutDate).getFullYear()}
                    </p>
                  </div>
              </div>
              <div className="guest flex justify-between items-center text-center mt-2">
                <div>
                  <p className="text-xl font-semibold text-black">Guests</p>
                  <p className="text-lg text-gray-600 font-thin">{data.guests}</p>
                </div>
              </div>
              <div className="btn flex items-center justify-around mt-38">
                <button onClick={handlePayment} className="bg-[#b17e44f4] text-white w-fit font-bold px-4 py-2 rounded-lg cursor-pointer active:scale-95 hover:bg-[#b17e44]">Book Now</button>
                <button onClick={() => {handleCancel(bookingId)}} className="bg-red-800 text-white w-fit font-bold px-4 py-2 rounded-lg cursor-pointer active:scale-95 hover:bg-red-900">Cancel Booking</button>
              </div>
          </section>
        </div>
        <div>
          <div className="right w-[40vw] border rounded-lg p-4">
            <div className="image-container flex flex-wrap gap-2">
              {images?.slice(0,6).map((img) => {
                return <img src={img} className="w-46 h-25 rounded-lg object-cover object-center" />
              })}
            </div>
            <div className="flex gap-4 mb-6">
              <div className="name mt-5">
                <p className="font-semibold text-lg">Title :- <span className="text-sm text-gray-600">{title}</span></p>
                <p className="font-semibold text-lg">Location :- <span className="text-sm text-gray-600">{location}</span></p>
              </div>
            </div>
            <h2 className="text-lg font-semibold mb-4">Price details</h2>
            <div className="flex justify-between text-sm mb-2">
              <p>₹{data.price} x {data.days} days X {data.guests} guests</p>
              <p>₹{data.price * data.days * data.guests}</p>
            </div>
            <div className="flex justify-between font-semibold text-md mt-4 border-t pt-4">
              <p>Total (INR)</p>
              <p>₹{data.price * data.days * data.guests}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;