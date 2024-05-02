import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { FaBook, FaShoppingBag, FaUsers } from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Tooltip,
  Area,
  Line,
  AreaChart,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const formatPrice = (price) => {
    if (!price) {
      return '';
    }
    else {
      return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  };

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
      
    },
    
  });
console.log(chartData)
  // custom shape for the bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2
      },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width
      }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // custom shape for the pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map((data) => {
    return { name: data.book, value: data.revenue };
  });

  return (
    <div className="w-full md:w-[870px] mx-auto px-4 ">
      <h2 className="text-2xl font-semibold my-4">
        Xin chào, {user.displayName} !
      </h2>
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


      {/* bar & pie chart */}
      <div className="mt-16 flex flex-col sm:flex-row">
        {/* bar chart */}
        <div className="sm:w-1/2 w-full">
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
        </div>

        {/* pie chart */}
        <div className="sm:w-1/2 w-full">
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
      </div>
      {/* revenue stats table */}
      <div className="mt-8 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Bảng thống kê doanh thu sách</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-mainBG">
              <th className="border border-gray-300 px-4 py-2 text-white text-center">STT</th>
              <th className="border border-gray-300 px-4 py-2 text-white text-center">Tên sách</th>
              <th className="border border-gray-300 px-4 py-2 text-white text-center">Số lượng</th>
              <th className="border border-gray-300 px-4 py-2 text-white text-center">Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {chartData
              .slice() // create a copy of the original array
              .sort((a, b) => b.revenue - a.revenue) // sort in descending order based on revenue
              .map((data, index) => (
                <tr key={index} className={(index % 2 === 0) ? "bg-gray-100" : ""}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{data.book}</td>
                  {/* <td className="border border-gray-300 px-4 py-2">{data.book.length > 20 ? `${data.book.substring(0, 20)}...` : data.book}</td> */}
                  <td className="border border-gray-300 px-4 py-2 text-center">{data.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{formatPrice(data.revenue * data.quantity)}₫</td>
                </tr>
              ))} 
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;
