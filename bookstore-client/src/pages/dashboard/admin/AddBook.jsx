import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";

const AddBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [quantity, setQuantity] = useState(0);
  const [publishYearError, setPublishYearError] = useState("");
  const [priceError, setPriceError] = useState("");

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };




  // image hosting keys
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // on submit form
  const onSubmit = async (data) => {
    // check publish year
    // delete '-' 
    const value = data.publishYear.toString().replace(/[^0-9]/g, "");
    const year = parseInt(value);
    // check year
    if (isNaN(year) || value.length !== 4) {
      setPublishYearError("Publish year must be a valid 4-digit number.");
      return;
    } else {
      setPublishYearError("");
    }
    // set maximum price
    if (parseFloat(data.price) > 1000000000) {
      setPriceError("Price cannot exceed 1,000,000,000.");
      return;
    } else {
      setPriceError("");
    }

    // console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const authorArray = data.author.split(",").map((item) => item.trim());
    const publisherArray = data.publisher.split(",").map((item) => item.trim());
    data.quantity = quantity;

    // console.log(hostingImg.data);
    if (data.quantity < 0 || data.price < 0 || data.publishYear < 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Input data is invalid. (Numerical data are not allowed to be negative numbers.)`,
        showConfirmButton: false,
        timer: 1500
      });
    }
    if (hostingImg.data.success) {
      // now send the book item data to the server with the image url
      const bookItem = {
        name: data.name,
        description: data.description,
        category: data.category,
        author: authorArray,
        publisher: publisherArray,
        publishYear: data.publishYear,
        price: parseFloat(data.price),
        quantity: data.quantity,
        image: hostingImg.data.data.display_url
      }
      // 
      const bookRes = await axiosSecure.post('/book', bookItem);
      console.log(bookRes)
      if (bookRes.status === 200) {
        setQuantity(0);
        // show success popup
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${data.name} is added to the book.`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }

  };

  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-mainBG">Book</span>
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* form1 */}
          <div className="form-control w-full my-2">
            <label className="label">
              <span className="label-text">Book Title
                <span className="text-red">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Book Name"
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          {/* form2 */}
          <div className=" flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category
                  <span className="text-red">*</span>
                </span>
              </label>
              <select
                defaultValue="default"
                {...register("category", {
                  required: true,
                  validate: (value) => value !== "default",
                })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Non-fiction</option>
                <option value="pizza">Economic</option>
                <option value="soup">Literature</option>
                <option value="dessert">Political</option>
                <option value="drinks">Language</option>
                <option value="drinks">TextBook</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
              {priceError && (
                <p className="text-red text-sm mt-1">{priceError}</p>
              )}
            </div>
          </div>
          {/* form3 */}
          <div className="flex gap-6">
            {/* publisher */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Publisher
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Publisher name"
                {...register("publisher", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* author */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Author
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Author name"
                {...register("author", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* form4 */}
          <div className="flex gap-6">
            {/* publish year */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Publish year
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="number"
                placeholder="Publish year"
                {...register("publishYear", { required: true })}
                className="input input-bordered w-full"
              />
              {publishYearError && (
                <p className="text-red text-sm mt-1">{publishYearError}</p>
              )}
            </div>

            {/* quantity */}
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
                    // Loại bỏ dấu '-' nếu có
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    // Chuyển đổi giá trị thành số nguyên
                    setQuantity(value === "" ? 0 : parseInt(value));
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
          {/* form5 */}
          {/* description details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Book Details</span>
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-24"
              placeholder="Type here..."
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-mainBG text-white px-6">
            Add Book <FaUpload></FaUpload>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
