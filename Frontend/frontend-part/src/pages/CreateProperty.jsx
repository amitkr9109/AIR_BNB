import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CreatePropertyService } from "../API/PropertyService";

const CreateProperty = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = async (data) => {
    data.Images = data.Images.split(" ");
    data.Amenities = data.Amenities.split(" ");

    const propertyCreation = await CreatePropertyService(data);
    navigate("/");
  };

  return (
    <div className="loginPage flex z-[2] top-0 left-0 w-full bg-zinc-100 h-screen items-center justify-center mt-15 ">
      <div className=" py-1 w-[35%] bg-zinc-50 rounded-xl shadow-xl ">
        <div className="w-full py-4 relative">
          <div className="absolute left-[3%] top-1/2 -translate-y-1/2"></div>
          <div className="heading flex items-center gap-30 px-4">
            <Link to="/"><i className="ri-close-large-line text-zinc-800 cursor-pointer active:scale-95 hover:bg-zinc-400 rounded-full px-1 py-1"></i></Link>
            <h1 className="text-center font-bold text-lg text-zinc-800">Create Property</h1>
          </div>
        </div>
        <div className="py-5 px-5 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full border border-zinc-500 rounded-lg">
              <div className="w-full p-4 text-md relative  flex justify-center items-center gap-3 border-b border-zinc-500">
                <label>Title:</label>
                <input className="w-full h-full focus:outline-none text-xl" type="text" {...register("Title", { required: "Title is required" })}/>
                {errors.Title && (<p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs ">{" "} <i className="ri-information-fill text-[red]"></i>{" "} {errors.Title.message}</p>)}
              </div>
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3  border-b border-zinc-500">
                <label>Description:</label>
                <input className="w-full h-full focus:outline-none text-xl " type="text" {...register("Description", { required: "Description is required", })}/>
                {errors.Description && (<p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs ">{" "}<i className="ri-information-fill text-[red]"></i>{" "}{errors.Description.message}</p>)}
              </div>
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3  border-b border-zinc-500">
                <label>Location:</label>
                <input className="w-full h-full focus:outline-none text-xl "type="text" {...register("Location", {required: "Location is required",})}/>
                {errors.Location && (<p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs "> {" "}<i className="ri-information-fill text-[red]"></i>{" "}{errors.Location.message}</p>)}
              </div>
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3  border-b border-zinc-500">
                <label>Price (INR per night):</label>
                <input className="w-[65%] h-full focus:outline-none text-xl " type="number" {...register("Price", {required: "Price is required",})}/>
                {errors.Price && (<p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs ">{" "}<i className="ri-information-fill text-[red]"></i>{" "}{errors.Price.message}</p>)}
              </div>
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3  border-b border-zinc-500">
                <label>Amenities:</label>
                <input className="w-full h-full focus:outline-none text-xl " type="text" {...register("Amenities", {required: "Amenities are required",})}/>
                {errors.Amenities && (<p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs ">{" "} <i className="ri-information-fill text-[red]"></i>{" "} {errors.Amenities.message} </p>)}
              </div>
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3 ">
                <label>Images:</label>
                <input className="w-full h-full focus:outline-none text-xl" type="url"
                  {...register("Images", {required: "Images are required", pattern: {value: /(^\s*(https?:\/\/.*)\s*$)/i,message: "Invalid image URL"}})}/>
                {errors.Images && (<p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs ">{" "} <i className="ri-information-fill text-[red]"></i>{" "}{errors.Images.message}</p>)}
              </div>
            </div>
            <button className="w-full text-center bg-[#b17f44] mt-4 text-white rounded-md py-3 active:scale-95 cursor-pointer hover:bg-[rgb(233,140,33)]"type="submit">Create Property</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProperty;