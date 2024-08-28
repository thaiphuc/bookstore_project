import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUpload } from "react-icons/fa";

const UpdateBook = () => {
  const item = useLoaderData();
  const { register, handleSubmit, reset} = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(item.quantity || 0);
  const [publishYearError, setPublishYearError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [negativePriceError, setNegativePriceError] = useState("");

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };


  const onSubmit = async (data) => {
    if (data.publishYear < 0)
    {
      setPublishYearError("Năm xuất bản không âm!");
      return;
    }
    const value = data.publishYear.toString().replace(/[^0-9]/g, "");
    const year = parseInt(value);
    if (isNaN(year) || value.length !== 4) {
      setPublishYearError("Năm phải là số có 4 chữ số");
      return;
    } else {
      setPublishYearError("");
    }

    if (parseFloat(data.price) > 1000000000) {
      setPriceError("Giá không vượt quá 1,000,000,000.");
      return;
    }
    if (parseFloat(data.price) < 0) {
      setNegativePriceError("Giá không là số âm");
      return;
    }

    let imageURL = item.image;


    if (data.image && data.image.length > 0) {
        const imageFile = { image: data.image[0] };
        const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        if (hostingImg.data.success) {
            imageURL = hostingImg.data.data.display_url; 
        }
    }
    const authorArray = data.author.split(",").map((item) => item.trim());
    const publisherArray = data.publisher.split(",").map((item) => item.trim());
    data.quantity = quantity;

    const bookItem = {
      name: data?.name,
      description: data.description,
      category: data.category,
      author: authorArray,
      publisher: publisherArray,
      publishYear: data.publishYear,
      price: data.price,
      quantity: data.quantity,
      image: imageURL
    };


    const bookRes = await axiosSecure.patch(`book/${item._id}`, bookItem);
    console.log(bookRes);
    if (bookRes.status === 200) {
      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Sách đã được cập nhật thành công!`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/manage-items");
    }
  };

  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">
        Cập nhật <span className="text-mainBG">Sách</span>
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Tên sách
                <span className="text-red">*</span></span>
            </label>
            <input
              type="text"
              placeholder="Tên sách"
              defaultValue={item.name}
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Thể loại
                  <span className="text-red">*</span>
                </span>
              </label>
              <select
                defaultValue={item.category}
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Chọn thể loại
                </option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Kinh tế">Kinh tế</option>
                <option value="Ngữ văn">Ngữ văn</option>
                <option value="Chính trị">Chính trị</option>
                <option value="Ngoại ngữ">Ngoại ngữ</option>
                <option value="Phát triển bản thân">Phát triển bản thân</option>
                <option value="Sách giáo khoa">Sách giáo khoa</option>
                <option value="Phổ biến">Phổ biến</option>
              </select>
            </div>

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Giá
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="number"
                placeholder="Giá"
                defaultValue={item.price}
                {...register("price", {
                  required: true,
                })}
                className="input input-bordered w-full"
              />
              {priceError && (
                <p className="text-red text-sm mt-1">{priceError}</p>
              )}
              {negativePriceError && (
                <p className="text-red text-sm mt-1">{negativePriceError}</p>
              )}
            </div>
          </div>

          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Nhà xuất bản
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Nhà xuất bản"
                defaultValue={item.publisher}
                {...register("publisher", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Tác giả
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Tác giả"
                defaultValue={item.author}
                {...register("author", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Năm sản xuất
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="number"
                placeholder="Năm sản xuất"
                defaultValue={item.publishYear}
                {...register("publishYear", { required: true })}
                className="input input-bordered w-full"
              />
              {publishYearError && (
                <p className="text-red text-sm mt-1">{publishYearError}</p>
              )}
            </div>

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Số lượng</span>
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
              <span className="label-text">Mô tả sách</span>
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-24"
              placeholder="Mô tả sách..."
              defaultValue={item.description}
            ></textarea>
          </div>
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: false })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-mainBG text-white px-6 mt-8">
            Cập nhật <FaUpload></FaUpload>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
