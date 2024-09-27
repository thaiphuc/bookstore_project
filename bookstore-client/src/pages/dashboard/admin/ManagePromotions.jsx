import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManagePromotion = () => {
    const axiosSecure = useAxiosSecure();
    const { data: promotions = [], refetch } = useQuery({
        queryKey: ['promotions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/promotions');
            return res.data;
        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [newPromotion, setNewPromotion] = useState({
        code: '',
        expiryDate: '',
        discount: '',
        minOrderValue: '', // New field for Minimum Order Value
        description: '' // New field for Description (optional)
    });

    const handleDeletePromotion = promotion => {
        Swal.fire({
            title: "Bạn muốn xóa mã giảm giá?",
            text: "Bạn sẽ không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vâng, tôi đồng ý!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/promotions/${promotion._id}`)
                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Xóa mã giảm giá thành công!",
                            icon: "success"
                        });
                        refetch();
                    });
            }
        });
    };

    const handleCreatePromotion = () => {
        setIsModalOpen(true); // Open modal when the button is clicked
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPromotion(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await axiosSecure.post('/promotions', newPromotion);
            Swal.fire({
                title: "Thành công!",
                text: "Mã giảm giá mới đã được tạo!",
                icon: "success"
            });
            setIsModalOpen(false); // Close modal after creation
            refetch(); // Refetch promotions to include the new promotion
        } catch (error) {
            Swal.fire({
                title: "Lỗi!",
                text: "Tạo mã giảm giá thất bại!",
                icon: "error"
            });
        }
    };

    return (
        <div>
            <div className="flex justify-between mx-4 my-4">
                <h2 className="text-2xl font-semibold">Quản lý <span className="text-mainBG">Mã giảm giá!</span></h2>
                <h2 className="text-2xl mr-4">Tổng số mã giảm: {promotions.length}</h2>
            </div>

            {/* table */}
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead className="bg-mainBG text-white">
                            <tr>
                                <th>#</th>
                                <th>Tên mã giảm</th>
                                <th>Chi tiết mã</th>
                                <th>Ngày hết hạn</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promotions.map((promotion, index) => (
                                <tr key={promotion._id}>
                                    <th>{index + 1}</th>
                                    <td>{promotion.code}</td>
                                    <td>{promotion.discount}%</td>
                                    <td>{promotion.expiryDate}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDeletePromotion(promotion)}
                                            className="btn bg-orange-500 btn-xs"
                                        >
                                            <FaTrashAlt className="text-white" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Promotion Button */}
            <div className="flex justify-start mt-4">
                <button
                    onClick={handleCreatePromotion}
                    className="btn bg-mainBG text-white px-4 py-2 rounded-lg"
                >
                    Tạo mã giảm giá
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl text-center font-semibold mb-4">Tạo mã giảm giá mới</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Mã giảm:</label>
                            <input
                                type="text"
                                name="code"
                                value={newPromotion.code}
                                onChange={handleInputChange}
                                className="w-full border p-2 rounded-lg"
                                placeholder="Nhập mã giảm giá"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Thời hạn:</label>
                            <input
                                type="date"
                                name="expiryDate"
                                value={newPromotion.expiryDate}
                                onChange={handleInputChange}
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Tiền giảm:</label>
                            <input
                                type="number"
                                name="discount"
                                value={newPromotion.discount}
                                onChange={handleInputChange}
                                className="w-full border p-2 rounded-lg"
                                placeholder="Nhập tiền giảm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Giá trị tối thiểu đơn:</label>
                            <input
                                type="number"
                                name="minOrderValue"
                                value={newPromotion.minOrderValue}
                                onChange={handleInputChange}
                                className="w-full border p-2 rounded-lg"
                                placeholder="Nhập giá trị tối thiểu đơn"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Mô tả (Không bắt buộc):</label>
                            <textarea
                                name="description"
                                value={newPromotion.description}
                                onChange={handleInputChange}
                                className="w-full border p-2 rounded-lg"
                                placeholder="Nhập mô tả nếu có"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="btn bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="btn bg-mainBG text-white px-4 py-2 rounded-lg"
                            >
                                Tạo mã
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePromotion;
