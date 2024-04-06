import React from 'react';
import { useTheme } from '../../hooks/ThemeContext';
import FavoriteBook from '../../components/FavoriteBook';

const FavoritePage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div >
      <div className={`${isDarkMode ? "dark" : ""}`}>
          {/* content */}
          <div className="text-center py-28 px-8 space-y-7 ml-5 mr-5">
            <h2 className=" md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Your Favorite <span className="text-mainBG">Books</span>
            </h2>
            <div className='mr-10'>
              <FavoriteBook />
            </div>
          </div>
      </div>
    </div>
  );
};

export default FavoritePage;
