import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaGithub,
  FaGoogle,
  FaRegUser
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const { signUpWithGmail, createUser, updateUserProfile } =
    useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    if (data.password.length < 6) {
      // Show error message for password length less than 6
      alert("Password should be at least 6 characters long.");
      return;
    }

    const email = data.email;
    const password = data.password;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email
            };

            axiosPublic.post("/users", userInfo)
              .then((response) => {
                alert("Signin successful!");
                navigate(from || "/");
              })
              .catch((error) => {
                console.error("Error creating user:", error);
              });
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  const handleRegister = () => {
    signUpWithGmail().then(result => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName
      }
      axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data);
          navigate('/');
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    })
      .catch((error) => {
        console.error("Error signing up with Gmail:", error);
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please Create An Account!</h3>
          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-red italic text-sm ">Please enter your name!</p>}
          </div>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red italic text-sm">Please enter your email!</p>}
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Your password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            {errors.password && <p className="text-red italic text-sm">Please enter your password!</p>}
          </div>

          {/* confirm password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="input input-bordered"
              {...register("confirmPassword", { required: true })}
            />
            {passwordMismatch && <p className="text-red italic text-sm">Passwords do not match!</p>}
          </div>

          {/* submit btn */}
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-mainBG text-white"
              value="Sign up"
              disabled={isSubmitting}
            />
          </div>

          <div className="text-center my-2">
            Have an account?
            <Link to="/login">
              <button className="ml-2 underline text-blue-700">Login here</button>
            </Link>
          </div>
        </form>
        <div className="text-center space-x-3">
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-mainBG hover:text-white"
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-mainBG hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-mainBG hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
