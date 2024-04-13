import React, { useState } from "react";
import useBook from "../../../hooks/useBook";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageItems = () => {
  const [book, , refetch] = useBook();
  //   console.log(book)
  const axiosSecure = useAxiosSecure();

  //   pagination
  const [currentPage, setCurrentPage] = useState(1);
  const items_Per_Page = 10;
  const indexOfLastItem = currentPage * items_Per_Page;
  const indexOfFirstItem = indexOfLastItem - items_Per_Page;
  const currentItems = book.slice(indexOfFirstItem, indexOfLastItem);
  const formatPrice = (price) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Rút gọn tên sách
  const shortenName = (name, maxLength) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  // delete item
  const handleDeleteItem = (item) => {
    console.log(item._id)
    Swal.fire({
      title: "Bạn muốn xóa?",
      text: "Bạn sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, tôi đồng ý!",
      cancelButtonText: "Hủy"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/book/${item._id}`);
        // console.log(res.data);
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${item.name} đã bị xóa`,
          showConfirmButton: false,
          timer: 1500
        });

      }
    });
  }

  return (
    <div className="w-full md:w-[870px] mx-auto px-4 ">
      <h2 className="text-2xl font-semibold my-4">
        Quản lý <span className="text-mainBG">Sách!</span>
      </h2>

      {/* book items table  */}
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-mainBG text-white">
              <tr>
                <th>#</th>
                <th>Ảnh</th>
                <th>Tên sách</th>
                <th>Thể loại</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Cập nhật</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{shortenName(item.name, 20)}</td> {/* Giới hạn độ dài tên sách tối đa là 30 ký tự */}
                  <td>{item.category}</td>
                  <td>{formatPrice(item.price)} ₫</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Link to={`/dashboard/update-book/${item._id}`}>
                      <button className="btn btn-ghost btn-xs bg-blue-500">
                        <FaEdit
                          className="text-white 
                                        "
                        ></FaEdit>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrashAlt className="text-red"></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm mr-2 btn-warning"
        >
          <FaArrowLeft /> Quay lại
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= book.length}
          className="btn btn-sm bg-mainBG text-white"
        >
          Tiếp tục  <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ManageItems;
