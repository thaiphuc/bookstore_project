import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase.config";

const Login = () => {
  const { login, signUpWithGmail } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();



  const onSubmit = (data) => {
    const { email, password } = data;
  
    login(email, password)
      .then((result) => {
        console.log("User logged in:", result.user);
        alert("Đăng nhập thành công!");
        reset();
        navigate(from || "/");
      })
      .catch((error) => {
        console.error("Error during login:", error.message);
        setErrorMessage("Vui lòng nhập email và mật khẩu hợp lệ!");
      });
  };
  


  const handleGoogleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        console.log("Google login successful:", result.user);
        alert("Đăng nhập bằng Google thành công!");
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Google login error:", error.message);
        setErrorMessage("Đăng nhập bằng Google thất bại!");
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-lg">Vui lòng đăng nhập!</h3>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email", { required: "Vui lòng nhập email" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Mật khẩu</span>
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="input input-bordered"
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Hiển thị lỗi */}
          {errorMessage && (
            <p className="text-red-500 text-xs italic">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <div className="form-control mt-4">
            <input
              type="submit"
              className="btn bg-mainBG text-white"
              value="Đăng nhập"
            />
          </div>

          <p className="text-center my-2">
            Bạn chưa có tài khoản?
            <Link to="/signup" className="underline text-red ml-1">
              Đăng ký ngay
            </Link>
          </p>
        </form>

        {/* Login với Google */}
        <div className="text-center space-x-3">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-circle hover:bg-mainBG hover:text-white"
          >
            <FaGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
