import React, { useState } from 'react';
import SupplierTable from '../components/SupplierTable';
import SupplierForm from '../components/SupplierForm';

function SupplierPage() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div>
      <h1>Поставщики</h1>
      <SupplierForm onSupplierAdded={handleRefresh} />
      <SupplierTable key={refresh} />
    </div>
  );
}

export default SupplierPage;
