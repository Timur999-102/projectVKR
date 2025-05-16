// Инициализация при первом запуске
const defaultInventory = [
  { item: "Пластик ПНД", stock: 3, min: 5 },
  { item: "Сталь 20", stock: 10, min: 5 },
  { item: "Кабель ВВГ", stock: 8, min: 7 },
];

// Получение склада из localStorage (или установка дефолтного)
export function getInventory() {
  const stored = localStorage.getItem("inventory");
  if (!stored) {
    localStorage.setItem("inventory", JSON.stringify(defaultInventory));
    return defaultInventory;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Ошибка чтения склада:", e);
    localStorage.removeItem("inventory");
    localStorage.setItem("inventory", JSON.stringify(defaultInventory));
    return defaultInventory;
  }
}

// Обновление склада
export function updateInventory(newInventory) {
  localStorage.setItem("inventory", JSON.stringify(newInventory));
}

// Добавление товара на склад
export function addToStock(itemName, quantity) {
  const inventory = getInventory();
  const qty = parseInt(quantity || 0);

  // Проверка: товар уже есть?
  const existing = inventory.find((item) => item.item === itemName);

  let updated;

  if (existing) {
    updated = inventory.map((item) => {
      if (item.item === itemName) {
        const stock = parseInt(item.stock || 0);
        return {
          ...item,
          stock: stock + qty,
        };
      }
      return item;
    });
  } else {
    // если товара нет — добавим его
    updated = [...inventory, { item: itemName, stock: qty, min: 5 }];
  }

  updateInventory(updated);
}

/*1.2.
export function addToStock(itemName, quantity) {
  const inventory = getInventory();
  const updated = inventory.map((item) => {
    if (item.item === itemName) {
      const stock = parseInt(item.stock || 0);
      const qty = parseInt(quantity || 0);
      return {
        ...item,
        stock: stock + qty,
      };
    }
    return item;
  });
  updateInventory(updated);
}*/

/*1.1.
export function addToStock(itemName, quantity) {
  const inventory = getInventory();
  const updated = inventory.map((item) => {
    if (item.item === itemName) {
      return {
        ...item,
        stock: item.stock + parseInt(quantity),
      };
    }
    return item;
  });
  updateInventory(updated);
}*/

