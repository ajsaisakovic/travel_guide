import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Outlet,
} from "react-router-dom";

import Footer from "./layouts/Footer";
import UserNavbar from "./layouts/UserNavbar";
import AdminNavbar from "./layouts/AdminNavbar";
import LandingPage from "./pages/LandingPage";
import DestinationDetails from "./pages/DestinationDetails";
import Destinations from "./pages/Destinations";


const Layout = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', width: '100%'}}>
      <UserNavbar />
      <div style={{
        flex: 1,
      }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/details/:id",
        element: <DestinationDetails/>
      },
      {
        path: "/destinations",
        element: <Destinations/>
      },
    ],
  },
  /*
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user/add_user",
    element: <AddUser />,
  },
  */
]);

function App() {
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;