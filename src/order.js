const timeElapsed = (startTime, endTime = Date.now()) => {
  return ((endTime - startTime) / 1000).toFixed(2);
};

const generateOrderId = () => Math.floor(Math.random() * 1000);

const display = (time, ...args) => {
  console.log(`[${time}s]`, ...args);
};

const currentTime = () => {
  const time = new Date();
  const h = time.getHours();
  const m = time.getMinutes();
  return h < 12 ? `${h}:${m} AM` : `${h - 12}:${m} PM`;
};

const deliverOrder = (startTime, elapsedTime, details) => {
  display(elapsedTime, "Delivering order...");
  setTimeout(() => {
    const time = timeElapsed(startTime);
    const deliveredTime = currentTime();
    const deliveryDetails = `Delivered by John at ${deliveredTime}`;
    display(time, "Order delivered: ", { ...details, deliveryDetails });
  }, 5000);
};

const packOrder = (startTime, elapsedTime, details) => {
  display(elapsedTime, "Packing order...");
  setTimeout(() => {
    const time = timeElapsed(startTime);
    const packageDetails = `packed in ecofriendly box`;
    display(time, "Order packed: ", { ...details, packageDetails });
    deliverOrder(startTime, time, details);
  }, 2000);
};

const prepareFood = (startTime, elapsedTime, details) => {
  display(elapsedTime, "Preparing food...");
  setTimeout(() => {
    const time = timeElapsed(startTime);
    display(time, "Food is ready: ", details);
    packOrder(startTime, time, details);
  }, 3000);
};

export const orderReceived = (startTime, item) => {
  const time = timeElapsed(startTime);
  const orderId = generateOrderId();
  const details = { orderId };
  display(time, "Order received: ", details);
  prepareFood(startTime, time, { ...details, foodDetails: item });
};
