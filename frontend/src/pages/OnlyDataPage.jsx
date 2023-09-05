import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OnlyDataPage = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Link to={"/"}>клиенты</Link>
      <table className="w-3/4 h-full m-5 border rounded">
        <thead className="border text-center">
          <tr>
            <th>id</th>
            <th>сумма покупок</th>
            <th>текущий счёт</th>
            <th>потолок кредита</th>
            <th>текщий долг</th>
            <th>остаток кредита</th>
            <th>комментарий</th>
          </tr>
        </thead>
        <tbody className="border text-center">
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td className="w-10">{user.id}</td>
                <td>{user.sumbuy}</td>
                <td>{user.current_money}</td>
                <td>{user.max_duty}</td>
                <td
                  style={{
                    backgroundColor:
                      (user.max_duty - user.current_duty) / user.max_duty <= 0.1
                        ? "#f75151"
                        : "white",
                  }}
                >
                  {user.current_duty === null ? "0" : user.current_duty}
                </td>
                <td>{user.loan_balance}</td>
                <td>{user.comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OnlyDataPage;
