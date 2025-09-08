import React, { useState } from "react";
import "./Myaccount.scss";
import logo from "../../assest/Purple-Rose-Close-Shoot.webp";

const Orderhistory = () => {
  // Mock Orders (replace with API later)
  const [orders, setOrders] = useState([
    {
      id: 1,
      product: "Purple T-Shirt",
      discount: 15,
      price: 12,
      total: 12,
      date: "12/05/2023",
      status: "Delivered",
      image: logo,
    },
    {
      id: 2,
      product: "Blue Jeans",
      discount: 10,
      price: 25,
      total: 25,
      date: "18/06/2023",
      status: "Processing",
      image: logo,
    },
    {
      id: 3,
      product: "Sneakers",
      discount: 20,
      price: 40,
      total: 40,
      date: "01/08/2023",
      status: "Shipped",
      image: logo,
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Cancel Order
  const cancelOrder = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Canceled" } : order
      )
    );
  };

  return (
    <div className="bg-[#f6f6f8] min-h-screen p-6">
      <h1 className="font-bold text-2xl mb-6">Your Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row items-center gap-4"
          >
            {/* Product Image */}
            <img
              src={order.image}
              alt={order.product}
              className="w-24 h-24 rounded-lg object-cover"
            />

            {/* Order Details */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{order.product}</h2>
              <p>
                Discount: <span className="font-medium">{order.discount}%</span>
              </p>
              <p>
                Price: <span className="font-medium">${order.price}</span>
              </p>
              <p>
                Order Date: <span className="font-medium">{order.date}</span>
              </p>
              <p>
                Status:{" "}
                <span
                  className={`font-medium ${
                    order.status === "Canceled"
                      ? "text-red-500"
                      : order.status === "Delivered"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="mt-2">
                Total:{" "}
                <span className="font-bold text-lg">${order.total}</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSelectedOrder(order)}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                View Details
              </button>
              <button
                onClick={() => cancelOrder(order.id)}
                disabled={order.status === "Canceled"}
                className={`px-4 py-2 rounded text-white transition ${
                  order.status === "Canceled"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[500px] p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>

            {/* Modal Content */}
            <h2 className="text-xl font-bold mb-4">
              Order Details - #{selectedOrder.id}
            </h2>
            <img
              src={selectedOrder.image}
              alt={selectedOrder.product}
              className="w-32 h-32 rounded-lg object-cover mx-auto mb-4"
            />
            <p>
              <strong>Product:</strong> {selectedOrder.product}
            </p>
            <p>
              <strong>Discount:</strong> {selectedOrder.discount}%
            </p>
            <p>
              <strong>Price:</strong> ${selectedOrder.price}
            </p>
            <p>
              <strong>Order Date:</strong> {selectedOrder.date}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  selectedOrder.status === "Canceled"
                    ? "text-red-500"
                    : selectedOrder.status === "Delivered"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {selectedOrder.status}
              </span>
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.total}
            </p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orderhistory;
