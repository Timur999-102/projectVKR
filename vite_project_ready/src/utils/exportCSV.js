export function exportOrdersToCSV(orders) {
  if (!orders.length) return;

  const header = Object.keys(orders[0]).join(",");
  const rows = orders.map((order) =>
    Object.values(order).map((value) => `"${value}"`).join(",")
  );

  const BOM = "\uFEFF"; // UTF-8 Byte Order Mark
  const csvContent = BOM + [header, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "orders.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
