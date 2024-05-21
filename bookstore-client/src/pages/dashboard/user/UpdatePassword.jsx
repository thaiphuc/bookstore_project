import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdatePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [otpSent, setOtpSent] = useState(false);
    const [countdown, setCountdown] = useState(30);
    // send otp function
    const handleSendOTP = () => {

        setOtpSent(true);

        // countdown
        const interval = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        // settime xx seconds 
        setTimeout(() => {
            clearInterval(interval);
            setOtpSent(false); // Resend OTP
            setCountdown(30); // Reset 
        }, 30000);
    };

    const onSubmit = async (data) => {
        const info = {
            name: data.name,
            address: data.address,
            phone: data.telephone,
        }

        try {
            const userRes = await axiosSecure.patch(`users/${id}`, info);

            if (userRes.status === 200) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `User is updated successfully!`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='h-screen max-w-md mx-auto flex items-center justify-center '>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <h2 className='text-lg font-bold text-center text-black '>Đổi mật khẩu</h2>
                        <div className='flex mt-5'>
                            <button
                                className={`btn bg-mainBG w-1/3 mr-5 text-white ${otpSent ? 'pointer-events-none' : ''}`}
                                onClick={handleSendOTP}
                                disabled={otpSent}
                            >
                                {otpSent ? `Gửi lại OTP (${countdown}s)` : 'Gửi OTP'}
                            </button>
                            <input type="text" {...register("name")} placeholder="OTP" className="input input-bordered w-full " disabled />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Mật khẩu mới</span>
                        </label>
                        <input type="text" {...register("address")} placeholder="Nhập mật khẩu mới" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Xác nhận mật khẩu</span>
                        </label>
                        <input type="tel" {...register("telephone")} placeholder="Xác nhận mật khẩu" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <input type='submit' value={"Cập nhật"} className="btn bg-mainBG text-white" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword;
