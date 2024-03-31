import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Book from "../pages/bookPage/Book";
import Signup from "../components/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CartPage from "../pages/bookPage/CartPage";
import Login from "../components/Login";
import Order from "../pages/dashboard/user/Order";
import UserProfile from "../pages/dashboard/user/UserProfile";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddBook from "../pages/dashboard/admin/AddBook";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateBook from "../pages/dashboard/admin/UpdateBook";
import Payment from "../pages/bookPage/Payment";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import FavoritePage from "../pages/bookPage/FavoritePage";
import ProductDetails from "../pages/bookPage/ProductDetails";
import ContactPage from "../pages/bookPage/ContactPage";
import AboutUsPage from "../pages/bookPage/AboutUsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/book",
        element: <Book />,
        // children:[
        //   {
        //     path: ":id",
        //     element: <ProductDetails />
        //   }
        // ]
      },
      {
        path: "/order",
        element: <PrivateRoute><Order /></PrivateRoute>
      },
      {
        path: "/update-profile",
        element: <UserProfile />
      },
      {
        path: "/cart-page",
        element: <CartPage />
      },
      {
        path: "/process-checkout",
        element: <Payment />
      },
      {
        path: "/favorite-page",
        element: <FavoritePage />
      },
      {
        path: "/book/:id",
        element: <ProductDetails />,
      },
      {
        path: "/contact-page",
        element: <ContactPage />,
      },
      {
        path: "/about-page",
        element: <AboutUsPage />,
      },
    ]
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'add-book',
        element: <AddBook />
      },
      {
        path: 'manage-items',
        element: <ManageItems />
      },
      {
        path: 'update-book/:id',
        element: <UpdateBook />,
        loader: ({ params }) => fetch(`http://localhost:5000/book/${params.id}`)
      },
      {
        path: 'bookings',
        element: <ManageBookings />
      }
    ]
  }
]);

export default router;