const STORAGE_KEY = "suppliers";

export function getSuppliers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveSupplier(supplier) {
  const suppliers = getSuppliers();
  suppliers.push(supplier);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(suppliers));
}

export function deleteSupplier(index) {
  const suppliers = getSuppliers();
  suppliers.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(suppliers));
}
