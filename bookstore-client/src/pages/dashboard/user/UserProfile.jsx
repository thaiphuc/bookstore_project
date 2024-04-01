import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const infor = {
      name: data.name,
      address: data.address,
      phone: data.telephone,
    }
  
    try {
      const userRes = await axiosSecure.patch(`users/${id}`, infor);
      console.log(userRes);
      if (userRes.status === 200) {
        // show success popup
        reset(); // Đảm bảo bạn đã khai báo và sử dụng `reset` từ react-hook-form nếu cần
        Swal.fire({
          position: "center",
          icon: "success",
          title: `User is updated successfully!`, // Cập nhật tiêu đề phù hợp
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error('Error:', error);
      // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi
    }
  
    
    // updateUserProfile(name, photoURL).then(() => {
    //   // Profile updated!
    //   alert("Profile updated successfully")
    // }).catch((error) => {
    //   // An error occurred
    //   // ...
    // });
  }
  return (
    <div className='h-screen max-w-md mx-auto flex items-center justify-center '>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <h2 className='text-lg font-bold text-center'>Your Profile</h2>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" {...register("name")} placeholder="Your name" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input type="text" {...register("address")} placeholder="Your address" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Telephone</span>
            </label>
            <input type="tel" {...register("telephone")} placeholder="Your telephone number" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input type="file" {...register("photoURL")} className="file-input w-full mt-1" />
            {/* <input type="text" {...register("photoURL")} placeholder="photo url" className="input input-bordered" required /> */}
          </div>
          <div className="form-control mt-6">
            <input type='submit' value={"Update"} className="btn bg-mainBG text-white" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserProfile
