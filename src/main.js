import { orderReceived } from "./order.js";

const main = () => {
  const orderDetails = { orderId: 123, foodDetails: "Burger" };
  orderReceived(Date.now(), orderDetails);
};

main();
