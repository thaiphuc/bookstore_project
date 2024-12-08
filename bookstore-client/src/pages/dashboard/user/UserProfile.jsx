import React from 'react'
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
    const info = {
      name: data.name,
      address: data.address,
      phone: data.telephone,
    }
  
    try {
      const userRes = await axiosSecure.patch(`users/${id}`, info);

      if (userRes.status === 200) { 
        // show success popup
        reset(); 
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Cập nhật thông tin thành công!`, // Cập nhật tiêu đề phù hợp
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error('Error:', error);
      // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi
    }
  
  }
  return (
    <div className='h-screen max-w-md mx-auto flex items-center justify-center '>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <h2 className='text-lg font-bold text-center'>Thông tin cá nhân</h2>
            <label className="label">
              <span className="label-text">Tên</span>
            </label>
            <input type="text" {...register("name")} placeholder="Nhập tên" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Địa chỉ</span>
            </label>
            <input type="text" {...register("address")} placeholder="Nhập địa chỉ" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Số điện thoại</span>
            </label>
            <input type="tel" {...register("telephone")} placeholder="Nhập số điện thoại" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tải ảnh lên</span>
            </label>
            <input type="file" {...register("photoURL")} className="file-input w-full mt-1" />
            {/* <input type="text" {...register("photoURL")} placeholder="photo url" className="input input-bordered" required /> */}
          </div>
          <div className="form-control mt-6">
            <input type='submit' value={"Cập nhật"} className="btn bg-mainBG text-white" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserProfile
