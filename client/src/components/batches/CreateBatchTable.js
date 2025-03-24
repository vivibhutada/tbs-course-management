// File: src/components/batches/CreateBatchTable.js
'use client';

import { useState, useContext, useEffect } from 'react';
import { Plus, Trash2, Pencil, X } from 'lucide-react';
import DataContext from '@/context/DataProvider';

const CreateBatchTable = () => {
  const { batches, setBatches } = useContext(DataContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    batchName: '',
    trainerName: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [duration, setDuration] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // ⏱️ Automatically calculate duration in months
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end >= start) {
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        setDuration(months > 0 ? `${months} month${months > 1 ? 's' : ''}` : 'Less than a month');
        setErrors((prev) => ({ ...prev, endDate: false }));
      } else {
        setDuration('');
        setErrors((prev) => ({ ...prev, endDate: true }));
      }
    }
  }, [formData.startDate, formData.endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.batchName.trim()) newErrors.batchName = true;
    if (!formData.trainerName.trim()) newErrors.trainerName = true;
    if (!formData.startDate) newErrors.startDate = true;
    if (!formData.endDate) newErrors.endDate = true;
    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      newErrors.endDate = true;
    }
    if (!formData.startTime) newErrors.startTime = true;
    if (!formData.endTime) newErrors.endTime = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const batchEntry = { ...formData, duration };

    if (editIndex !== null) {
      const updated = [...batches];
      updated[editIndex] = batchEntry;
      setBatches(updated);
      setEditIndex(null);
    } else {
      setBatches((prev) => [...prev, batchEntry]);
    }
    setFormData({
      batchName: '',
      trainerName: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: ''
    });
    setDuration('');
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const { duration, ...rest } = batches[index];
    setFormData(rest);
    setDuration(duration);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = batches.filter((_, i) => i !== index);
    setBatches(updated);
  };

  const filteredBatches = batches.filter((batch) =>
    batch.batchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.trainerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="text-green-800 border border-green-800 rounded-full w-8 h-8 flex items-center justify-center"
        >
          <Plus size={20} />
        </button>

        <input
          type="text"
          placeholder="Search by batch or trainer name"
          className="border px-3 py-1 rounded text-sm w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button className="absolute top-4 right-4" onClick={() => setShowForm(false)}>
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Create Batch</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Batch Name *</label>
                <input
                  name="batchName"
                  value={formData.batchName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.batchName ? 'border-red-500' : ''}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Trainer Name *</label>
                <input
                  name="trainerName"
                  value={formData.trainerName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.trainerName ? 'border-red-500' : ''}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.startDate ? 'border-red-500' : ''}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate}
                  className={`w-full p-2 border rounded ${errors.endDate ? 'border-red-500' : ''}`}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-600 mt-1">End date cannot be earlier than start date.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.startTime ? 'border-red-500' : ''}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">End Time *</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.endTime ? 'border-red-500' : ''}`}
                />
              </div>
              {duration && (
                <p className="text-sm text-green-800">
                  Duration: <strong>{duration}</strong>
                </p>
              )}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredBatches.length === 0 ? (
        <div className="text-center text-gray-500 py-10 text-sm">No batches found.</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#c5f3de] text-left text-green-800">
                <th className="px-3 py-2">Sr. No</th>
                <th className="px-3 py-2">Batch Name</th>
                <th className="px-3 py-2">Trainer Name</th>
                <th className="px-3 py-2">Start Date</th>
                <th className="px-3 py-2">End Date</th>
                <th className="px-3 py-2">Start Time</th>
                <th className="px-3 py-2">End Time</th>
                <th className="px-3 py-2">Duration</th>
                <th className="px-3 py-2 text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.map((batch, index) => (
                <tr
                  key={index}
                  className="bg-gray-50 hover:bg-gray-100 transition rounded-md shadow-sm"
                >
                  <td className="px-3 py-4">{index + 1}</td>
                  <td className="px-3 py-4">{batch.batchName}</td>
                  <td className="px-3 py-4">{batch.trainerName}</td>
                  <td className="px-3 py-4">{batch.startDate}</td>
                  <td className="px-3 py-4">{batch.endDate}</td>
                  <td className="px-3 py-4">{batch.startTime}</td>
                  <td className="px-3 py-4">{batch.endTime}</td>
                  <td className="px-3 py-4">{batch.duration}</td>
                  <td className="px-3 py-4 flex gap-2 items-center justify-center">
                    <button onClick={() => handleEdit(index)} className="text-green-700">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(index)} className="text-red-600">
                      <Trash2 size={16} />
                    </button>
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

export default CreateBatchTable;