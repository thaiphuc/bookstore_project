import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useTheme } from '../../../hooks/ThemeContext';
import Snowfall from 'react-snowfall';

const RewardsPage = () => {
    const { isDarkMode } = useTheme();

    // State quản lý điểm
    const [points, setPoints] = useState(50); // Giả sử bạn có 50 điểm ban đầu
    const [unlockedVoucher, setUnlockedVoucher] = useState([false, false, false, false, false]);

    // Danh sách nội dung voucher và số điểm cần để mở khóa
    const vouchers = [
        { text: "Giảm 5.000đ cho đơn 0đ", requiredPoints: 10 },
        { text: "Giảm 10.000đ cho đơn 0đ", requiredPoints: 20 },
        { text: "Giảm 15.000đ cho đơn 0đ", requiredPoints: 30 },
        { text: "Giảm 20.000đ cho đơn 0đ", requiredPoints: 40 },
        { text: "Giảm 25.000đ cho đơn 0đ", requiredPoints: 50 }
    ];

    // Hàm xử lý khi nhấn nút đổi điểm
    const handleUnlock = (index) => {
        const requiredPoints = vouchers[index].requiredPoints; // Lấy số điểm cần thiết cho voucher

        if (points >= requiredPoints) {
            // Nếu đủ điểm, mở khóa voucher
            const newUnlockedVoucher = [...unlockedVoucher];
            newUnlockedVoucher[index] = true;
            setUnlockedVoucher(newUnlockedVoucher);

            // Trừ điểm
            setPoints(points - requiredPoints);

            // Hiển thị thông báo thành công
            Swal.fire({
                icon: 'success',
                title: 'Mở khóa thành công!',
                text: `Bạn đã mở khóa voucher: ${vouchers[index].text}`,
                confirmButtonText: 'OK',
            });
        } else {
            // Nếu không đủ điểm, hiển thị thông báo lỗi
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
                    <div className="mr-10">
                        <p className="text-left font-medium text-lg">
                            Điểm của bạn: <span className="text-mainBG font-bold">{points}</span>
                        </p>
                    </div>
                </div>

                {/* Vouchers in a single column */}
                <div className="flex flex-col items-center space-y-6 px-5">
                    {vouchers.map((voucher, index) => (
                        <div
                            key={index}
                            className="w-full max-w-md border rounded-lg shadow-lg p-6 text-center space-y-4 bg-white dark:bg-gray-800 christmas-frame"
                        >
                            <p className="text-lg font-semibold">{voucher.text}</p>
                            {unlockedVoucher[index] ? (
                                <p className="text-green-500 font-bold">Mã: VOUCHER-{index + 1}</p>
                            ) : (
                                <button
                                    onClick={() => handleUnlock(index)}
                                    className="px-4 py-2 bg-mainBG text-white font-medium rounded-lg hover:bg-mainBG-dark"
                                >
                                    Đổi {voucher.requiredPoints} điểm để mở khóa
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
