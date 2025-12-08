import React from "react";
import { Link } from "react-router-dom";

const sampleOrders = [
  { id: 101, customer: "Alice", total: 2500 },
  { id: 102, customer: "Bob", total: 1200 },
];

const OrderList = () => {
  return (
    <div className="container mt-4">
      <h3>Order List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total (₱)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sampleOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.total}</td>
              <td>
                <Link to={`/admin/orders/${order.id}`} className="btn btn-sm btn-primary">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
