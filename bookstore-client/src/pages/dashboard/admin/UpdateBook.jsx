import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUpload } from "react-icons/fa";

const UpdateBook = () => {
  const item = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(item.quantity || 0);
  const [priceError, setPriceError] = useState("");

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const onSubmit = async (data) => {
    if (parseFloat(data.price) < 0) {
      setPriceError("Price cannot be negative.");
      return;
    } else if (parseFloat(data.price) > 1000000000) {
      setPriceError("Price cannot exceed 1,000,000,000.");
      return;
    } else {
      setPriceError("");
    }

    const authorArray = data.author.split(",").map((item) => item.trim());
    const publisherArray = data.publisher.split(",").map((item) => item.trim());

    const bookItem = {
      name: data?.name,
      description: data.description,
      category: data.category,
      author: authorArray,
      publisher: publisherArray,
      publishYear: data.publishYear,
      price: parseFloat(data.price),
      quantity: data.quantity,
    };


    const bookRes = await axiosSecure.patch(`book/${item._id}`, bookItem);
    console.log(bookRes);
    if (bookRes.status === 200) {
      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Book is updated successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/manage-items");
    }
  };

  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">
        Update <span className="text-mainBG">Book</span>
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Book Name
                <span className="text-red">*</span></span>
            </label>
            <input
              type="text"
              placeholder="Description Name"
              defaultValue={item.name}
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category
                  <span className="text-red">*</span>
                </span>
              </label>
              <select
                defaultValue={item.category}
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Economic">Economic</option>
                <option value="Literature">Literature</option>
                <option value="Political">Political</option>
                <option value="Language">Language</option>
                <option value="Self-help">Self-Help</option>
                <option value="TextBook">TextBook</option>
                <option value="Popular">Popular</option>
              </select>
            </div>

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="number"
                placeholder="Price"
                defaultValue={item.price}
                {...register("price", {
                  required: true,
                })}
                step="1"
                className="input input-bordered w-full"
              />
              {priceError && (
                <p className="text-red text-sm mt-1">{priceError}</p>
              )}
          
            </div>
          </div>

          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Publisher
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Publisher name"
                defaultValue={item.publisher}
                {...register("publisher", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Author
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Author name"
                defaultValue={item.author}
                {...register("author", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Publish year
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="number"
                placeholder="Publish year"
                defaultValue={item.publishYear}
                {...register("publishYear", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleDecrease}
                  className="bg-gray-200 text-gray-600 px-3 py-1 rounded-l"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(parseInt(e.target.value));
                  }}
                  className="ml-2 mr-2 input input-bordered w-1/4 text-center"
                />
                <button
                  type="button"
                  onClick={handleIncrease}
                  className="bg-gray-200 text-gray-600 px-3 py-1 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description Details</span>
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-24"
              placeholder="description details"
              defaultValue={item.description}
            ></textarea>
          </div>

          <button className="btn bg-mainBG text-white px-6 mt-8">
            Update Book <FaUpload></FaUpload>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
