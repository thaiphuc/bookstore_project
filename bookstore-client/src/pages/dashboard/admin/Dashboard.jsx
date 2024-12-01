import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaBook, FaShoppingBag, FaUsers } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [modalData, setModalData] = useState(null); // State for modal data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [books, setBooks] = useState([]);

  const formatPrice = (price) => {
    if (!price) {
      return '';
    }
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleStartDateChange = (date) => {
    if (endDate && date > endDate) {
      setDateError("Ngày bắt đầu không thể sau ngày kết thúc.");
    } else {
      setDateError(null);
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (startDate && date < startDate) {
      setDateError("Ngày kết thúc không thể trước ngày bắt đầu.");
    } else {
      setDateError(null);
      setEndDate(date);
    }
  };



  useEffect(() => {
    const fetchTopSellingBooks = async () => {
      try {
        const response = await axiosSecure.get('/order-stats/top-books');
        const data =  response.data;
        const sortedBooks = [...data].sort((a, b) => b.quantity - a.quantity);
        setBooks([sortedBooks[0], sortedBooks[1], sortedBooks[2]]);
      } catch (error) {
        console.error('Error fetching top selling books:', error);
      }
    };

    fetchTopSellingBooks();
  }, []);

  const datachart = {
    labels: ['1', '2', '3'],
    datasets: [
      {
        label: 'Số lượng',
        data: books.map(book => book.quantity),
        backgroundColor: ['blue', 'orange', 'green'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 14, 
            weight: 'bold', 
          },
          generateLabels: () =>
            books.map((book, index) => ({
              text: book.book,
              fillStyle: ['blue', 'orange', 'green'][index],
            })),
        },
      },
      tooltip: {
        callbacks: {
          label: context => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số lượng đã bán',
          font: {
            size: 16, 
            weight: 'bold', 
          },
          padding: { right: 10 },
        },
        ticks: {
          font: {
            size: 14, 
            weight: 'bold', 
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Xếp hạng',
          font: {
            size: 16, 
            weight: 'bold', 
          },
          padding: { top: 10 },
        },
        ticks: {
          font: {
            size: 14, 
            weight: 'bold', 
          },
        },
      },
    },
  };


  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats", { startDate, endDate }],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats", {
        params: {
          startDate,
          endDate,
        },
      });
      return res.data;
    },
    enabled: !!startDate && !!endDate && !dateError,
  });

  const calculateDailyRevenue = (data) => {
    const dailyRevenue = {};

    data.forEach((item) => {
      const { date, revenue } = item;

      if (dailyRevenue[date]) {
        dailyRevenue[date] += revenue;
      } else {
        dailyRevenue[date] = revenue;
      }
    });

    return Object.entries(dailyRevenue).map(([date, revenue]) => ({ date, revenue }));
  };

  const dayRevenue = calculateDailyRevenue(chartData);

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const formattedDay = day.padStart(2, "0");
    const formattedMonth = month.padStart(2, "0");
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const handleDetailClick = (data) => {
    const details = chartData.filter(item => item.date === data.date);
    console.log(details);
    if (details) {
      setModalData(details); 
      setIsModalOpen(true); 
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">Xin chào, {user.displayName}!</h2>

      {/* stats */}
      <div className="stats shadow flex flex-col md:flex-row">
        <div className="stat bg-cl1">
          <div className="stat-figure text-secondary">
          </div>
          <div className="stat-title">Doanh thu</div>
          <div className="stat-value">{formatPrice(stats.revenue)} ₫</div>
          {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
        </div>

        <div className="stat bg-cl2">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl"></FaUsers>
          </div>
          <div className="stat-title">Người dùng</div>
          <div className="stat-value">{stats.users}</div>
          {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
        </div>

        <div className="stat bg-cl3">
          <div className="stat-figure text-secondary">
            <FaBook className="text-3xl"></FaBook>
          </div>
          <div className="stat-title">Sách</div>
          <div className="stat-value">{stats.bookItems}</div>
          {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
        </div>

        <div className="stat bg-cl4">
          <div className="stat-figure text-secondary">
            <FaShoppingBag className="text-3xl"></FaShoppingBag>
          </div>
          <div className="stat-title">Đơn hàng</div>
          <div className="stat-value">{stats.orders}</div>
          {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
        </div>
      </div>

      <div style={{ width: '800px', height: '450px' }}>
        <h3 className="font-bold text-center text-xl p-4">Top 3 sách bán chạy nhất </h3>
        <Bar data={datachart} options={options} />
     </div>

      {/* bar & pie chart */}
      {/* <div className="mt-16 flex flex-col sm:flex-row"> */}
      {/* bar chart */}
      {/* <div className="sm:w-1/2 w-full">
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="book" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div> */}

      {/* pie chart */}
      {/* <div className="sm:w-1/2 w-full">
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div> */}

      {/* Revenue Stats Table */}
      <div className="mt-8 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Bảng thống kê doanh thu</h3>

        {/* Date picker inputs */}
        <div className="flex justify-center mb-4">
          <div className="mr-4">
            <label>Ngày bắt đầu: </label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
              className="p-2 border border-gray-300 rounded"
              placeholderText="Chọn ngày bắt đầu"
            />
          </div>
          <div>
            <label>Ngày kết thúc: </label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
              className="p-2 border border-gray-300 rounded"
              placeholderText="Chọn ngày kết thúc"
            />
          </div>
        </div>

        {dateError && (
          <div className="text-red-500 font-bold text-center mb-4">{dateError}</div>
        )}

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-mainBG">
              <th className="border border-gray-300 px-4 py-2 text-white text-center">STT</th>
              <th className="border border-gray-300 px-4 py-2 text-white text-center">Ngày</th>
              <th className="border border-gray-300 px-4 py-2 text-white text-center">Chi tiết</th>
              <th className="border border-gray-300 px-4 py-2 text-white text-center">Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {dayRevenue
              .slice()
              .sort(
                (a, b) =>
                  new Date(a.date.split("/").reverse().join("/")) -
                  new Date(b.date.split("/").reverse().join("/"))
              )
              .map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{formatDate(data.date)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDetailClick(data)}
                    >
                      Chi tiết
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{formatPrice(data.revenue)}₫</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && modalData && (
        <div className="fixed inset-0 flex items-center ml-80 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg ml-40 max-w-xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              &times;
            </button>

            <h3 className="text-xl text-center font-semibold mb-4">Chi tiết doanh thu</h3>

            {/* Bảng chi tiết sách */}
            <div className="max-h-48 overflow-y-auto"> {/* Limit height to 12rem (48px * 3 rows) */}
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Sách</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Số lượng</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {modalData.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{item.book}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2">{formatPrice(item.revenue)} ₫</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="bg-red text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
