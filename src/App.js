import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import PageNotFound from "./components/page-not-found/PageNotFound";
import Header from "./components/Layout/Header";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProdectsCard from "./components/prodect-card/ProdectsCard";
import ProtectRout from "./components/Protect Rout/ProtectRout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "",
          element: (
            <ProtectRout>
              <ProdectsCard />
            </ProtectRout>
          ),
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/ProductDetails/:Product_id",
          element: <ProductDetails />,
        },
      ],
      errorElement: <PageNotFound />,
    },
  ]);
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
