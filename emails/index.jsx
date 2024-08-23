
import React from 'react';

function Email({}) {
  const orderItems = [
    { name: 'Chicken Burger', quantity: 2, price: 10.00 },
    { name: 'Pizza Margherita', quantity: 1, price: 12.00 },
  ];

  const calculateTotalPrice = () => {
    return orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div className="order-confirmation">
      <h2>Order Confirmation</h2>
      <p>Thank you for your order! Your order has been confirmed and will be delivered shortly.</p>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p><strong>Total:</strong> ${calculateTotalPrice().toFixed(2)}</p>

      <h3>Delivery Information</h3>
      <p><strong>Address:</strong> 123 Main St, City, State, ZIP</p>
      <p><strong>Contact:</strong> (123) 456-7890</p>

      <p>Thank you for choosing our service!</p>
    </div>
  );
}

export default Email;