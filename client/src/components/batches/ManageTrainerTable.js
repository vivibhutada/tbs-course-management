'use client';

import { useContext, useState } from 'react';
import { Plus, Trash2, Pencil, X, Search } from 'lucide-react';
import DataContext from '@/context/DataProvider';

const ManageTrainerTable = () => {
  const { batches, trainers, setTrainers } = useContext(DataContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ batchName: '', subject: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});

  const getBatch = (name) => batches.find((b) => b.batchName === name);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!formData.batchName) err.batchName = true;
    if (!formData.subject.trim()) err.subject = true;
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const batch = getBatch(formData.batchName);
    const entry = {
      batchName: batch?.batchName || '',
      trainerName: batch?.trainerName || '',
      subject: formData.subject,
      startDate: batch?.startDate || '',
      endDate: batch?.endDate || '',
    };

    if (editIndex !== null) {
      const updated = [...trainers];
      updated[editIndex] = entry;
      setTrainers(updated);
      setEditIndex(null);
    } else {
      setTrainers((prev) => [...prev, entry]);
    }

    setFormData({ batchName: '', subject: '' });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const { batchName, subject } = trainers[index];
    setFormData({ batchName, subject });
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = trainers.filter((_, i) => i !== index);
    setTrainers(updated);
  };

  const filtered = trainers.filter(
    (t) =>
      t.batchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.trainerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setShowForm(true)} className="border border-green-700 rounded-full w-8 h-8 flex items-center justify-center text-green-700">
          <Plus size={18} />
        </button>
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by trainer or batch"
            className="border pl-9 pr-3 py-1 rounded text-sm w-64"
          />
          <Search size={16} className="absolute left-2 top-1.5 text-gray-500" />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-white/10 z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4"><X size={18} /></button>
            <h2 className="text-lg font-semibold mb-4">Assign Trainer</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Select Batch *</label>
                <select
                  name="batchName"
                  value={formData.batchName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.batchName ? 'border-red-500' : ''}`}
                >
                  <option value="">-- Select Batch --</option>
                  {batches.map((b, i) => (
                    <option key={i} value={b.batchName}>{b.batchName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Subject *</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.subject ? 'border-red-500' : ''}`}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
              <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Set</button>
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-gray-500 mt-10">No trainer found.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#c5f3de] text-left text-green-800">
                <th className="px-3 py-2">Sr. No</th>
                <th className="px-3 py-2">Batch Name</th>
                <th className="px-3 py-2">Trainer Name</th>
                <th className="px-3 py-2">Subject</th>
                <th className="px-3 py-2">Start Date</th>
                <th className="px-3 py-2">End Date</th>
                <th className="px-3 py-2 text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={i} className="bg-gray-50 hover:bg-gray-100 transition">
                  <td className="px-3 py-2">{i + 1}</td>
                  <td className="px-3 py-2">{t.batchName}</td>
                  <td className="px-3 py-2">{t.trainerName}</td>
                  <td className="px-3 py-2">{t.subject}</td>
                  <td className="px-3 py-2">{t.startDate}</td>
                  <td className="px-3 py-2">{t.endDate}</td>
                  <td className="px-3 py-2 flex justify-center gap-2">
                    <button onClick={() => handleEdit(i)} className="text-green-700"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(i)} className="text-red-600"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageTrainerTable;