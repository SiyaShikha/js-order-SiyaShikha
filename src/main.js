import { orderReceived } from "./order.js";

const main = () => {
  orderReceived(Date.now(), "burger");
};

main();
