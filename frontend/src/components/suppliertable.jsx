import React, { useEffect, useState } from 'react';
import { fetchSuppliers } from '../services/api';

function SupplierTable() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers().then(data => setSuppliers(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Контактное лицо</th>
          <th>Телефон</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map(s => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.contact_person}</td>
            <td>{s.phone}</td>
            <td>{s.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SupplierTable;
