import React from "react";
import style from "./style.module.css";
import Link from "next/link";
export default function OrderCard({ order }) {
  return (
    <div className="order-card-container">
      {!order || order.length === 0 ? (
        <>
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-3xl ">{`YOU DON'T HAVE ANY PURCHASES YET. ORDER TODAY!`}</h1>
            <Link className="underline" href="/product">
              Continue Shopping
            </Link>
          </div>
        </>
      ) : (
        <>
          {order.map((item) => (
            <div key={item.orderId} className={style.orderCard}>
              <img
                src={item.productImageSrc}
                alt={item.productImageAlt}
                className="product-image"
              />
              <div className={style.orderDetails}>
                <div>
                  <h2>{item.productName}</h2>
                  <p>Price: {item.productPrice}</p>
                  <p>Color: {item.productColor}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: {item.totalPrice}</p>
                  <p>Status: {item.deliveryStatus}</p>
                  <p>Payment: {item.payment}</p>
                </div>
                <div className={style.address}>
                  <h3>Delivery Address:</h3>
                  <p>{item.deliveryAddressStreet}</p>
                  <p>
                    {item.deliveryAddressCity}, {item.deliveryAddressState}{" "}
                    {item.deliveryAddressZip}
                  </p>
                  <p>{item.deliveryAddressCountry}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
