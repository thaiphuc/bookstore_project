import React from 'react';
import { useTheme } from '../../../hooks/ThemeContext';
const RewardsPage = () => {
    const { isDarkMode } = useTheme();

    return (
        <div >
            <div className={`${isDarkMode ? "dark" : ""}`}>
                {/* content */}
                <div className="text-center py-28 px-8 space-y-7 ml-5 mr-5">
                    <h2 className=" md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                        Chi tiết <span className="text-mainBG">Phần thưởng !!</span>
                    </h2>
                    <div className='mr-10'>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardsPage;
