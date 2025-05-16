const STORAGE_KEY = "orders";

export function getOrders() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveOrder(order) {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function deleteOrder(index) {
  const orders = getOrders();
  orders.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function updateOrder(index, updatedOrder) {
  const orders = getOrders();
  orders[index] = updatedOrder;
  localStorage.setItem("orders", JSON.stringify(orders));
}
