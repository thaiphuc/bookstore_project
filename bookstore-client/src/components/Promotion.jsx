import React, { useState, useEffect } from 'react';

const PromotionCountdown = () => {
    const calculateTimeLeft = () => {
        const endDate = new Date("2025-01-31T00:00:00");
        const now = new Date();
        const difference = endDate - now;

        if (difference < 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-center text-3xl font-bold mb-4">GIẢM NGAY 30% CHO LẦN ĐẦU TIÊN MUA HÀNG KHI NHẬP MÃ DƯỚI ĐÂY </h2>
            <div className=" grid grid-flow-col gap-5 mt-4 text-center auto-cols-max">
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content w-32">
                    <span className="countdown font-mono text-5xl">{timeLeft.days}</span>
                    <span>ngày</span>
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content w-32">
                    <span className="countdown font-mono text-5xl">{timeLeft.hours}</span>
                    <span>giờ</span>
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content w-32">
                    <span className="countdown font-mono text-5xl">{timeLeft.minutes}</span>
                    <span>phút</span>
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content w-32">
                    <span className="countdown font-mono text-5xl">{timeLeft.seconds}</span>
                    <span>giây</span>
                </div>
            </div>
            <form className="mt-10">
                <h6 className="footer-title text-center">Sao chép mã bên dưới đã nhận giảm giá cho lần đầu tiên !!!</h6>
             <p className="text-center text-xl">NEWCUS2024</p>
            </form>
        </div>
    );
}

export default PromotionCountdown;
