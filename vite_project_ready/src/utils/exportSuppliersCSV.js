export function exportSuppliersToCSV(suppliers) {
  if (!suppliers.length) return;

  const header = Object.keys(suppliers[0]).join(",");
  const rows = suppliers.map((supplier) =>
    Object.values(supplier).map((value) => `"${value}"`).join(",")
  );

  const BOM = "\uFEFF"; // UTF-8 BOM for Excel
  const csvContent = BOM + [header, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "suppliers.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
