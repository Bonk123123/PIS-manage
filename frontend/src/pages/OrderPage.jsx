import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [orders, setOrders] = React.useState([]);
  const [sum, setSum] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [newOrders, setNewOrders] = React.useState([]);
  const ref = React.useRef();

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/order")
      .then((response) => {
        setOrders(response.data);
        setNewOrders(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const ss = () => {
    let s = 0;
    orders.forEach((item) => {
      s += item.price;
    });
    setSum(s);
  };

  React.useEffect(() => {
    let users = orders.filter((item) => item.id === parseInt(search));

    setNewOrders(users);
    let s = 0;
    users.forEach((item) => {
      s += item.price;
    });
    setSum(s);
  }, [search]);

  return (
    <div>
      <input
        className=" border"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Link to={"/"}>клиенты</Link>
      <p>sum: {sum}</p>
      <table>
        <thead>
          <tr>
            <th>user Id</th>
            <th>product</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {newOrders?.map((order) => {
            return (
              <tr>
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td>{order.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderPage;
