import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManagePromotion = () => {
    const [promotions, setPromotions] = useState([]);
    const axiosSecure = useAxiosSecure();

    const formatPrice = (price) => {
        return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split("/");
        const formattedDay = day.padStart(2, "0");
        const formattedMonth = month.padStart(2, "0");
        return `${formattedDay}/${formattedMonth}/${year}`;
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
    }, []);
    

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
                        console.log(res);
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManagePromotion;
