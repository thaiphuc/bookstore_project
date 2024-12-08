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
import ManageItems from "../pages/dashboard/admin/ManageBooks";
import UpdateBook from "../pages/dashboard/admin/UpdateBook";
import ManageOrders from "../pages/dashboard/admin/ManageOrders";
import FavoritePage from "../pages/bookPage/FavoritePage";
import ProductDetails from "../pages/bookPage/ProductDetails";
import ContactPage from "../pages/bookPage/ContactPage";
import AboutUsPage from "../pages/bookPage/AboutUsPage";
import ManageComment from "../pages/dashboard/admin/ManageComment";
import UpdatePassword from "../pages/dashboard/user/UpdatePassword";
import ServicePage from "../pages/bookPage/ServicePage";
import ManagePromotion from "../pages/dashboard/admin/ManagePromotions";
import RewardsPage from "../pages/dashboard/user/Rewards";
import GamePage from "../pages/dashboard/user/Game";
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
      },
      {
        path: "/order",
        element: <PrivateRoute><Order /></PrivateRoute>
      },
      {
        path: "/update-profile/:id",
        element: <UserProfile />
      },
      {
        path: "/update-password/:id",
        element: <UpdatePassword />
      },
      {
        path: "/cart-page",
        element: <CartPage />
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
      {
        path: "/service-page",
        element: <ServicePage/>,
      },
      {
        path: "/reward-page",
        element: <RewardsPage />,
      },
      {
        path: "/game-page",
        element: <GamePage />,
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
        path: 'manage-comments',
        element: <ManageComment />
      },
      {
        path: 'update-book/:id',
        element: <UpdateBook />,
        loader: ({ params }) => fetch(`http://localhost:5000/book/${params.id}`)
      },
      {
        path: 'orders',
        element: <ManageOrders />
      },
      {
        path: 'promotions',
        element: <ManagePromotion />
      }
    ]
  }
]);

export default router;