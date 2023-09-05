import axios from "axios";
import React from "react";
import { useNavigate, Form, Link, useRevalidator } from "react-router-dom";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState("");
  const [newproducts, setNewproducts] = React.useState([]);
  const [newproducts1, setNewproducts1] = React.useState([]);

  const [modal, setModal] = React.useState(false);
  const [createModal, setCreateModal] = React.useState(false);

  const [search, setSearch] = React.useState("");

  const [changeid, setChangeid] = React.useState(0);
  const [changename, setChangeName] = React.useState("");
  const [changequantity, setChangeQuantity] = React.useState(0);
  const [changeprice, setChangePrice] = React.useState(0);

  const [createname, setCreateName] = React.useState("");
  const [createquantity, setCreateQuantity] = React.useState(0);
  const [createprice, setCreatePrice] = React.useState(0);

  const handleSubmitChange = (e) => {
    axios.put("http://localhost:8080/product", {
      id: changeid,
      product: changename,
      quantity_product: changequantity,
      price: changeprice,
    });
    navigate(0);
    e.preventDefault();
  };

  const handleSubmitCreate = (e) => {
    if (createprice <= 0 || createquantity <= 0) {
      setError("некоректное значение");
      e.preventDefault();
    } else {
      axios.post("http://localhost:8080/product", {
        product: createname,
        quantity_product: createquantity,
        price: createprice,
      });
      navigate(0);
      e.preventDefault();
    }
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/product")
      .then((response) => {
        setProducts(response.data);
        setNewproducts1(response.data);
        let prod = [];
        products.forEach((i, ind) => (prod[ind] = i.id));
        setNewproducts(prod);
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    let prod = products.filter((item) => String(item.id).includes(search));
    setNewproducts1(prod);
  }, [search]);
  return (
    <div>
      <Link to={"/"}>клиенты</Link>
      <input
        className="border h-6 flex"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-3/4 h-full m-5 border rounded">
        <thead className="border text-center">
          <tr>
            <th className="w-10">id</th>
            <th>продукт</th>
            <th>колличество</th>
            <th>цена</th>
            <th>действия</th>
          </tr>
        </thead>
        <tbody className="border text-center">
          {newproducts1.map((product) => {
            return (
              <tr key={product.id}>
                <td className="w-10">{product.id}</td>
                <td>{product.product}</td>
                <td>{product.quantity_product}</td>
                <td>{product.price}</td>
                <td className="text-2xl cursor-pointer text-center flex w-full">
                  <p
                    className="w-1/2 text-2xl text-center"
                    onClick={() => {
                      setModal((prev) => !prev);
                      setChangeid(product.id);
                      setChangeName(product.product);
                      setChangeQuantity(product.quantity_product);
                      setChangePrice(product.price);
                    }}
                  >
                    &#10009;
                  </p>
                  <p
                    className="w-1/2 text-lg text-center"
                    onClick={async (e) => {
                      axios.delete(
                        `http://localhost:8080/product/${product.id}`
                      );
                      navigate(0);
                      e.preventDefault();
                    }}
                  >
                    &#10005;
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <span
        className="cursor-pointer"
        onClick={() => setCreateModal((prev) => !prev)}
      >
        &#10009; добавить продукт
      </span>

      {modal && (
        <div className="absolute bg-white border backdrop w-[80%] h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="absolute top-1 right-2 cursor-pointer"
            onClick={() => setModal(false)}
          >
            &#10005;
          </span>
          <span className="border w-full h-1/6 flex justify-center items-center gap-5">
            <p className="text-center">изменить продукт</p>
          </span>
          <Form
            id="client"
            method="put"
            action="/products"
            onSubmit={handleSubmitChange}
            className="w-full h-4/6 flex justify-center items-center gap-5"
          >
            <input
              className="border"
              defaultValue="ноутбук"
              value={changename}
              onChange={(e) => setChangeName(e.target.value)}
            />
            <input
              className="border"
              defaultValue="100"
              value={changequantity}
              onChange={(e) => setChangeQuantity(e.target.value)}
            />
            <input
              className="border"
              defaultValue="300"
              value={changeprice}
              onChange={(e) => setChangePrice(e.target.value)}
            />
          </Form>
          <span className="border w-full h-1/6 flex justify-center items-center gap-5">
            <button type="submit" form="client" className="text-center">
              отправить
            </button>
          </span>
        </div>
      )}

      {createModal && (
        <div className="absolute bg-white border backdrop w-[80%] h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="absolute top-1 right-2 cursor-pointer"
            onClick={() => setCreateModal(false)}
          >
            &#10005;
          </span>
          <span className="border w-full h-1/6 flex justify-center items-center gap-5">
            <p className="text-center">создать продукт</p>
          </span>
          <Form
            id="client"
            method="post"
            action="/products"
            onSubmit={handleSubmitCreate}
            className="w-full h-4/6 flex justify-center items-center gap-5"
          >
            <input
              className="border"
              defaultValue="ноутбук"
              value={createname}
              onChange={(e) => setCreateName(e.target.value)}
            />
            <input
              className="border"
              defaultValue="100"
              value={createquantity}
              onChange={(e) => setCreateQuantity(e.target.value)}
            />
            <input
              className="border"
              defaultValue="300"
              value={createprice}
              onChange={(e) => setCreatePrice(e.target.value)}
            />
          </Form>
          <span className="border w-full h-1/6 flex justify-center items-center gap-5">
            <label>{error}</label>
            <button type="submit" form="client" className="text-center">
              отправить
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
