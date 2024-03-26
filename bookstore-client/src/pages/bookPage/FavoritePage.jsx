import React from 'react';
import { useTheme } from '../../hooks/ThemeContext';

const FavoritePage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className={`bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? "dark" : ""}`}>
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Your Favorite <span className="text-mainBG"> Books</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePage;
