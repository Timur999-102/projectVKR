import { updateInventory, getInventory } from "./inventoryService";

const STORAGE_KEY = "sales";

// Получить все продажи
export function getSales() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Добавить новую продажу и списать товар
export function addSale(sale) {
  const sales = getSales();
  sales.push(sale);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));

  // Списываем со склада
  const inventory = getInventory();
  const updated = inventory.map((item) => {
    if (item.item === sale.item) {
      return {
        ...item,
        stock: Math.max(0, item.stock - parseInt(sale.quantity || 0)),
      };
    }
    return item;
  });
  updateInventory(updated);
}
