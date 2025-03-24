'use client';

import { useState, useContext } from 'react';
import { Plus, Trash2, Pencil, X, Search } from 'lucide-react';
import DataContext from '@/context/DataProvider';

const ManageStudentTable = () => {
  const { batches, students, setStudents } = useContext(DataContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    batchName: '',
    studentName: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const getBatchDetails = (batchName) => {
    return batches.find((batch) => batch.batchName === batchName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.batchName) newErrors.batchName = true;
    if (!formData.studentName.trim()) newErrors.studentName = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const batch = getBatchDetails(formData.batchName);
    const entry = {
      ...formData,
      trainerName: batch?.trainerName || '',
      startDate: batch?.startDate || '',
      endDate: batch?.endDate || '',
      startTime: batch?.startTime || '',
      endTime: batch?.endTime || ''
    };

    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = entry;
      setStudents(updated);
      setEditIndex(null);
    } else {
      setStudents((prev) => [...prev, entry]);
    }

    setFormData({ batchName: '', studentName: '' });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const { batchName, studentName } = students[index];
    setFormData({ batchName, studentName });
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.batchName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Add + Button & Search */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="text-green-800 border border-green-800 rounded-full w-8 h-8 flex items-center justify-center"
        >
          <Plus size={20} />
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by student or batch"
            className="pl-9 pr-4 py-1 border rounded-md text-sm w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={16} className="absolute left-2 top-1.5 text-gray-500" />
        </div>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button className="absolute top-4 right-4" onClick={() => setShowForm(false)}>
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Add Student to Batch</h2>
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
                  {batches.map((batch, i) => (
                    <option key={i} value={batch.batchName}>
                      {batch.batchName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Student Name *</label>
                <input
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.studentName ? 'border-red-500' : ''}`}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
                Close
              </button>
              <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
                Set
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Display */}
      {filteredStudents.length === 0 ? (
        <div className="text-center text-gray-500 py-10 text-sm">No students found.</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#c5f3de] text-left text-green-800">
                <th className="px-3 py-2">Sr. No</th>
                <th className="px-3 py-2">Batch Name</th>
                <th className="px-3 py-2">Trainer Name</th>
                <th className="px-3 py-2">Student Name</th>
                <th className="px-3 py-2">Start Date</th>
                <th className="px-3 py-2">End Date</th>
                <th className="px-3 py-2">Start Time</th>
                <th className="px-3 py-2">End Time</th>
                <th className="px-3 py-2 text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index} className="bg-gray-50 hover:bg-gray-100 transition rounded-md shadow-sm">
                  <td className="px-3 py-4">{index + 1}</td>
                  <td className="px-3 py-4">{student.batchName}</td>
                  <td className="px-3 py-4">{student.trainerName}</td>
                  <td className="px-3 py-4">{student.studentName}</td>
                  <td className="px-3 py-4">{student.startDate}</td>
                  <td className="px-3 py-4">{student.endDate}</td>
                  <td className="px-3 py-4">{student.startTime}</td>
                  <td className="px-3 py-4">{student.endTime}</td>
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

export default ManageStudentTable;