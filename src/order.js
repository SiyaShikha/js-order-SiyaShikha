const task = (begin, finish, timeTaken, next) => (startTime, orderDetails) => {
  const begun = begin(startTime, orderDetails);
  setTimeout(() => {
    const finished = finish(startTime, begun);
    next(startTime, finished);
  }, timeTaken);
};

const timeElapsed = (startTime, endTime = Date.now()) => {
  return ((endTime - startTime) / 1000).toFixed(2);
};

const currentTime = () => {
  const time = new Date();
  const h = time.getHours();
  const m = time.getMinutes();
  return h < 12 ? `${h}:${m} AM` : `${h - 12}:${m} PM`;
};

const deliverOrder = task(
  (startTime, orderDetails) => {
    const time = timeElapsed(startTime);
    console.log(`[${time}s] Delivering order...`);
    return orderDetails;
  },
  (startTime, orderDetails) => {
    const time = timeElapsed(startTime);
    const deliveryTime = currentTime();
    orderDetails.deliveryDetails = `Delivered by John at ${deliveryTime}`;
    console.log(`[${time}s] Order delivered`, orderDetails);
  },
  5000,
  () => {},
);

const packOrder = task(
  (startTime, orderDetails) => {
    const time = timeElapsed(startTime);
    console.log(`[${time}s] Packing order...`);
    return orderDetails;
  },
  (startTime, orderDetails) => {
    const time = timeElapsed(startTime);
    orderDetails.packingDetails = `Packed in eco-friendly box`;
    console.log(`[${time}s] Order packed`, orderDetails);
    return orderDetails;
  },
  2000,
  deliverOrder, 
);

const prepareFood = task(
  (startTime, orderDetails) => {
    const time = timeElapsed(startTime);
    console.log(`[${time}s] Preparing food...`);
    return orderDetails;
  },
  (startTime, orderDetails) => {
    const time = timeElapsed(startTime);
    console.log(`[${time}s] Food is ready`, orderDetails);
    return orderDetails;
  },
  3000,
  packOrder,
);

const orderReceived = (startTime, orderDetails) => {
  const time = timeElapsed(startTime);
  const { orderId } = orderDetails;
  console.log(`[${time}s] Order received: `, { orderId });
  prepareFood(startTime, orderDetails);
};

export { orderReceived };
