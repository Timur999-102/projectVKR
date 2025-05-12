import React, { useState } from 'react';
import { createSupplier } from '../services/api';

function SupplierForm({ onSupplierAdded }) {
  const [form, setForm] = useState({ name: '', contact_person: '', phone: '', email: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSupplier(form);
    setForm({ name: '', contact_person: '', phone: '', email: '' });
    onSupplierAdded(); // callback для обновления списка
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Имя" value={form.name} onChange={handleChange} required />
      <input name="contact_person" placeholder="Контактное лицо" value={form.contact_person} onChange={handleChange} />
      <input name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default SupplierForm;
