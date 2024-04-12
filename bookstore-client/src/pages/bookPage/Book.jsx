import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";
import { useTheme } from "../../hooks/ThemeContext";
import { Link } from "react-router-dom";

const Book = () => {
  const { isDarkMode } = useTheme();
  const [book, setBook] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items to display per page

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/book");
        const data = await response.json();
        setBook(data);
        setFilteredItems(data); // Initially, display all items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(book)

  const filterItems = (category) => {
    const filtered = book.filter((item) =>
      category === "all" || item.category.includes(category));

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(book);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //   console.log(filteredItems);
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
      {/* book banner */}
      <div className={`max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? "dark" : ""}`}>
        <div className="py-24 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Dành cho những người đam mê <span className="text-mainBG">Sách</span>
            </h2>
            <p className="text-[#4A4A4A]  text-xl md:w-4/5 mx-auto">

              Khám phá thế giới mênh mông của văn học tại cửa hàng sách của chúng tôi, nơi bạn có thể bắt đầu những hành trình quyến rũ qua những trang sách của cả tiểu thuyết và phi tiểu thuyết. Đắm mình trong những câu chuyện phiêu lưu, kiến thức và cảm hứng, từ những tác phẩm kinh điển đến những kiệt tác đương đại.
            </p>
            <Link to="/cart-page">
              <button className="mt-2 bg-mainBG font-semibold btn text-white px-8 py-3 rounded-full">
                Giỏ hàng
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* book shop  */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">

          {/* all category buttons */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4  flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              Tất cả
            </button>
            <button
              onClick={() => filterItems("Non-fiction")}
              className={selectedCategory === "Non-fiction" ? "active" : ""}
            >
              Non-fiction
            </button>
            <button
              onClick={() => filterItems("Economic")}
              className={selectedCategory === "Economic" ? "active" : ""}
            >
              Kinh Tế
            </button>
            <button
              onClick={() => filterItems("Literature")}
              className={selectedCategory === "Literature" ? "active" : ""}
            >
              Ngữ văn
            </button>
            <button
              onClick={() => filterItems("Political")}
              className={selectedCategory === "Political" ? "active" : ""}
            >
              Chính trị
            </button>
            <button
              onClick={() => filterItems("Language")}
              className={selectedCategory === "Language" ? "active" : ""}
            >
              Ngoại ngữ
            </button>
            <button
              onClick={() => filterItems("Self-help")}
              className={selectedCategory === "Self-help" ? "active" : ""}
            >
              Phát triển bản thân
            </button>
            <button
              onClick={() => filterItems("TextBook")}
              className={selectedCategory === "TextBook" ? "active" : ""}
            >
              Sách giáo khoa
            </button>
            {/* <button
              onClick={() => filterItems("Popular")}
              className={selectedCategory === "Popular" ? "active" : ""}
            >
              Phổ biến
            </button> */}
          </div>

          {/* filter options */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2 ">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default"> Mặc định</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Thấp tới cao</option>
              <option value="high-to-low">Cao tới thấp</option>
            </select>
          </div>
        </div>

        {/* product card */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
          {currentItems.map((item, index) => (
            <Cards key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-8 flex-wrap gap-2">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-mainBG text-white" : "bg-gray-200"
              }  ${isDarkMode ? "dark border" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Book;
