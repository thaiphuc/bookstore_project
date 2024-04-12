import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const [errorMessage, seterrorMessage] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //react hook form
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;

        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo)
          .then(res => {
            console.log(res.data);
            navigate('/');
          })
        // console.log(user);
        alert("Đăng nhập thành công!");
        navigate('/');
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage("Vui lòng đăng nhập email & mật khẩu hợp lệ!");
      });
    reset()

  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail().then(result => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName
      }
      axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data);
          alert("Đăng nhập thành công!");

        })
      navigate('/');
    })
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

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("Email")}
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Mật khẩu</span>
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover mt-2">
                Quên mật khẩu?
              </a>
            </label>
          </div>

          {/* show errors */}
          {errorMessage ? (
            <p className="text-red text-xs italic">
              Vui lòng đăng nhập email & mật khẩu hợp lệ!
            </p>
          ) : (
            ""
          )}

          {/* submit btn */}
          <div className="form-control mt-4">
            <input
              type="submit"
              className="btn bg-mainBG text-white"
              value="Login"
            />
          </div>

          <p className="text-center my-2">
            Bạn chưa có tài khoản?
            <Link to="/signup" className="underline text-red ml-1">
              Đăng ký ngay
            </Link>
          </p>
        </form>
        <div className="text-center space-x-3">
          <button onClick={handleRegister} className="btn btn-circle hover:bg-mainBG hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-mainBG hover:text-white">
            <FaFacebookF />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login