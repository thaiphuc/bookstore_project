import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Import FaEdit
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManagePromotion = () => {
    const [promotions, setPromotions] = useState([]);
    const axiosSecure = useAxiosSecure();

    const formatPrice = (price) => {
        return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';

        const date = new Date(dateString);
        if (isNaN(date)) return 'N/A';

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };


    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await axiosSecure.get("/orders/voucher");
                if (response.status === 200) {
                    setPromotions(response.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách voucher:", error);
            }
        };

        fetchVouchers();
    }, [axiosSecure]); // Thêm axiosSecure vào dependency

    // Trạng thái cho modal tạo mới
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPromotion, setNewPromotion] = useState({
        code: '',
        expiryDate: '',
        discount: '',
        minOrderValue: '',
        description: ''
    });

    // Trạng thái cho modal chỉnh sửa
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [promotionToEdit, setPromotionToEdit] = useState(null);

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
                        // Tải lại danh sách voucher
                        fetchVouchers();
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Lỗi!",
                            text: "Xóa mã giảm giá thất bại!",
                            icon: "error"
                        });
                        console.error("Error deleting promotion:", error);
                    });
            }
        });
    };

    const handleCreatePromotion = () => {
        setIsModalOpen(true);
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
            setIsModalOpen(false);
            setNewPromotion({
                code: '',
                expiryDate: '',
                discount: '',
                minOrderValue: '',
                description: ''
            });
            fetchVouchers();
        } catch (error) {
            Swal.fire({
                title: "Lỗi!",
                text: "Tạo mã giảm giá thất bại!",
                icon: "error"
            });
            console.error("Error creating promotion:", error);
        }
    };

    // Hàm mở modal chỉnh sửa
    const handleEditPromotion = promotion => {
        setPromotionToEdit(promotion);
        setIsEditModalOpen(true);
    };

    // Xử lý thay đổi input trong modal chỉnh sửa
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setPromotionToEdit(prevState => ({ ...prevState, [name]: value }));
    };

    // Xử lý submit chỉnh sửa
    const handleEditSubmit = async () => {
        try {
            const { _id, ...updatedData } = promotionToEdit;
            await axiosSecure.put(`/promotions/${_id}`, updatedData);
            Swal.fire({
                title: "Thành công!",
                text: "Mã giảm giá đã được cập nhật!",
                icon: "success"
            });
            setIsEditModalOpen(false);
            setPromotionToEdit(null);
            fetchVouchers();
        } catch (error) {
            Swal.fire({
                title: "Lỗi!",
                text: "Cập nhật mã giảm giá thất bại!",
                icon: "error"
            });
            console.error("Error updating promotion:", error);
        }
    };

    // Hàm tải lại danh sách voucher
    const fetchVouchers = async () => {
        try {
            const response = await axiosSecure.get("/orders/voucher");
            if (response.status === 200) {
                setPromotions(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách voucher:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between mx-4 my-4">
                <h2 className="text-2xl font-semibold">Quản lý <span className="text-mainBG">Mã giảm giá!</span></h2>
                <h2 className="text-2xl mr-4">Tổng số mã giảm: {promotions.length}</h2>
            </div>

            {/* Bảng danh sách mã giảm giá */}
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table table-zebra w-full">
                        {/* Tiêu đề bảng */}
                        <thead className="bg-mainBG text-white">
                            <tr>
                                <th>#</th>
                                <th>Tên mã giảm</th>
                                <th>Chi tiết mã</th>
                                <th>Ngày hết hạn</th>
                                <th>Thao tác</th>
                                <th>Chỉnh sửa</th> {/* Thêm cột chỉnh sửa */}
                            </tr>
                        </thead>
                        <tbody>
                            {promotions.map((promotion, index) => (
                                <tr key={promotion._id}>
                                    <th>{index + 1}</th>
                                    <td>{promotion.code}</td>
                                    <td>{formatPrice(promotion.discountAmount)} đ</td>
                                    <td>{formatDate(promotion.validUntil)}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDeletePromotion(promotion)}
                                            className="btn bg-orange-500 btn-xs"
                                        >
                                            <FaTrashAlt className="text-white" />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleEditPromotion(promotion)}
                                            className="btn bg-blue-500 btn-xs"
                                        >
                                            <FaEdit className="text-white" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Nút tạo mã giảm giá */}
            <div className="flex justify-start mt-4">
                <button
                    onClick={handleCreatePromotion}
                    className="btn bg-mainBG text-white px-4 py-2 rounded-lg"
                >
                    Tạo mã giảm giá
                </button>
            </div>

            {/* Modal tạo mã giảm giá mới */}
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

            {/* Modal chỉnh sửa mã giảm giá */}
            {isEditModalOpen && promotionToEdit && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl text-center font-semibold mb-4">Chỉnh sửa mã giảm giá</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Mã giảm:</label>
                            <input
                                type="text"
                                name="code"
                                value={promotionToEdit.code}
                                onChange={handleEditInputChange}
                                className="w-full border p-2 rounded-lg"
                                placeholder="Nhập mã giảm giá"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Thời hạn:</label>
                            <input
                                type="date"
                                name="expiryDate"
                                value={promotionToEdit.expiryDate ? promotionToEdit.expiryDate.split('T')[0] : ''}
                                onChange={handleEditInputChange}
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Tiền giảm:</label>
                            <input
                                type="number"
                                name="discount"
                                value={promotionToEdit.discount}
                                onChange={handleEditInputChange}
                                className="w-full border p-2 rounded-lg"
                                placeholder="Nhập tiền giảm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Giá trị tối thiểu đơn:</label>
                            <input
                                type="number"
                                name="minOrderValue"
                                value={promotionToEdit.minOrderValue}
                                onChange={handleEditInputChange}
                                className="w-full border p-2 rounded-lg"
                                placeholder="Nhập giá trị tối thiểu đơn"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Mô tả (Không bắt buộc):</label>
                            <textarea
                                name="description"
                                value={promotionToEdit.description}
                                onChange={handleEditInputChange}
                                className="w-full border p-2 rounded-lg"
                                placeholder="Nhập mô tả nếu có"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => { setIsEditModalOpen(false); setPromotionToEdit(null); }}
                                className="btn bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                className="btn bg-mainBG text-white px-4 py-2 rounded-lg"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePromotion;
