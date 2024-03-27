import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // image hosting keys
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // on submit form
  const onSubmit = async (data) => {
    // console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    // console.log(hostingImg.data);

    if (hostingImg.data.success) {
      // now send the book item data to the server with the image url
      const bookItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        description: data.description,
        image: hostingImg.data.data.display_url
      }
      // 
      const bookRes = await axiosSecure.post('/book', bookItem);
      console.log(bookRes)
      if (bookRes.status === 200) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
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
                {...register("category", { required: true })}
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
                {...register("price", { required: true })}
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
                {...register("price", { required: true })}
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
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* quantity */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Quantity
                  <span className="text-red">*</span>
                </span>
              </label>
              <input
                type="number"
                placeholder="Total books"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
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
