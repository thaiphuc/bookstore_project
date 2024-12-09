import React, { useState, useEffect, useContext } from "react";
import Swal from 'sweetalert2';
import { useTheme } from '../../../hooks/ThemeContext';
import Snowfall from 'react-snowfall';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthProvider";

const RewardsPage = () => {
    const { isDarkMode } = useTheme();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [promotions, setPromotions] = useState([]);
  
    const [points, setPoints] = useState(0); 
    const [unlockedVoucher, setUnlockedVoucher] = useState([false, false, false, false, false, false]);

    const fetchPoints = async () => {
        try {
            const response = await axiosSecure.get("/game", {
                params: { userEmail: user.email },
            });
            setPoints(response.data.point);

            const unlockedCodes = response.data.voucher || [];
            const updatedUnlockedVoucher = promotions.map((voucher) =>
                unlockedCodes.includes(voucher.code)
            );
            setUnlockedVoucher(updatedUnlockedVoucher);

        } catch (error) {
            console.error("Error fetching points:", error);
        }
    };

    useEffect(() => {
        if (promotions.length > 0) {
            fetchPoints();
        }
    }, [promotions]);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await axiosSecure.get("/orders/voucher");
                if (response.status === 200) {
                    const filteredVouchers = response.data
                        .filter(voucher => voucher.usageLimit === 1)
                        .sort((a, b) => a.usedCount - b.usedCount);
                    setPromotions(filteredVouchers);
                    console.log(promotions);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách voucher:", error);
            }
        };

        fetchVouchers();
    }, [axiosSecure]); 

    const savePoints = async (points) => {
        try {
          await axiosSecure.post("/game/save", {
            userEmail: user.email,
            point: points,
          });
        } catch (error) {
          console.error("Error saving points:", error);
        }
    };

    const updateVoucher = async (vouchers) => {
        try {
          await axiosSecure.post("/game/voucher", {
            userEmail: user.email,
            voucher: vouchers,
          });
        } catch (error) {
          console.error("Error saving voucher:", error);
        }
    };


    const formatPrice = (price) => {
        return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleUnlock = async (index) => {
        const requiredPoints = promotions[index].usedCount;
    
        if (points >= requiredPoints) {
            const newPoint = points - requiredPoints;
    

            const newUnlockedVoucher = [...unlockedVoucher];
            newUnlockedVoucher[index] = true;
            setUnlockedVoucher(newUnlockedVoucher);
    
            try {
                await savePoints(newPoint);
                await updateVoucher(promotions[index].code);
                fetchPoints();
    
                Swal.fire({
                    icon: 'success',
                    title: 'Mở khóa thành công!',
                    text: `Bạn đã mở khóa voucher: ${promotions[index].code}`,
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                console.error("Error during unlocking voucher:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể mở khóa voucher, vui lòng thử lại.',
                    confirmButtonText: 'OK',
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Không đủ điểm',
                text: `Bạn cần ${requiredPoints - points} điểm nữa để mở khóa voucher này.`,
                confirmButtonText: 'OK',
            });
        }
    };
    

    return (
        <div>
            <Snowfall />
            <div className={`${isDarkMode ? "dark" : ""}`}>
                <div className="text-center py-28 px-8 space-y-7 ml-5 mr-5">
                    <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                        Chi tiết <span className="text-mainBG">Phần thưởng !!</span>
                    </h2>
                    <div className="mt-8">
                        <img src="christmasbanner.jpg" alt="Banner" className="w-full h-auto max-h-80 rounded-lg shadow-lg" />
                    </div>

                    <div className="mr-10">
                        <p className="text-left mt-5 font-bold text-2xl">
                            Điểm của bạn: <span className="text-mainBG">{points}</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 px-5">
                    {promotions.map((voucher, index) => (
                        <div
                            key={index}
                            className="w-full max-w-xs border rounded-lg shadow-lg p-6 text-center space-y-4 bg-white dark:bg-gray-800 christmas-frame"
                        >
                            <p className="text-lg font-semibold">
                                {voucher.description}
                            </p>
                            <p className="text-lg font-semibold"> Giảm {formatPrice(voucher.discountAmount)}đ cho đơn từ {formatPrice(voucher.minOrderValue)}đ</p>
                            <p className="text-sm text-gray-500">
                                Thời gian hết hạn:{" "}
                                {new Date(voucher.validUntil).toLocaleDateString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </p>
                            {unlockedVoucher[index] ? (
                                 <p className="text-green-500 font-bold">MÃ GIẢM: {voucher.code}</p>
                            ) : (
                                <button
                                    onClick={() => handleUnlock(index)}
                                    className="px-4 py-2 bg-mainBG text-white font-medium rounded-lg hover:bg-mainBG-dark"
                                >
                                    Dùng {voucher.usedCount} điểm để mở khóa
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RewardsPage;
