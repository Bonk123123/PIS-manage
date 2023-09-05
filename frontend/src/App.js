import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import ClientPage from "./pages/ClientPage";
import OnlyDataPage from "./pages/OnlyDataPage";
import OrderPage from "./pages/OrderPage";
import ProductsPage from "./pages/ProductsPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route index element={<ClientPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/onlyData" element={<OnlyDataPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
