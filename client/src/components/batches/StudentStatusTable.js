'use client';

import { useContext, useState } from 'react';
import { Plus, X, Pencil, Trash2, Search } from 'lucide-react';
import DataContext from '@/context/DataProvider';

const StudentStatusTable = () => {
  const { studentStatus, setStudentStatus, students } = useContext(DataContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    batchName: '',
    status: '',
    reason: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.studentName || !formData.status) return;
    const entry = {
      ...formData,
      reason: formData.reason?.trim() || '---'
    };
    if (editIndex !== null) {
      const updated = [...studentStatus];
      updated[editIndex] = entry;
      setStudentStatus(updated);
      setEditIndex(null);
    } else {
      setStudentStatus([...studentStatus, entry]);
    }
    setFormData({ studentName: '', batchName: '', status: '', reason: '' });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(studentStatus[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = studentStatus.filter((_, i) => i !== index);
    setStudentStatus(updated);
  };

  const filtered = studentStatus.filter(
    (s) =>
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.batchName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="border border-green-800 text-green-800 rounded-full w-8 h-8 flex items-center justify-center"
        >
          <Plus size={18} />
        </button>
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student/batch"
            className="pl-9 pr-3 py-1 border rounded text-sm w-64"
          />
          <Search size={16} className="absolute left-2 top-1.5 text-gray-500" />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-white/10 z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4">
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Update Student Status</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Student Name *</label>
                <select
                  name="studentName"
                  value={formData.studentName}
                  onChange={(e) => {
                    const selected = students.find((s) => s.studentName === e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      studentName: e.target.value,
                      batchName: selected?.batchName || ''
                    }));
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="">-- Select --</option>
                  {students.map((s, i) => (
                    <option key={i} value={s.studentName}>{s.studentName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">-- Select --</option>
                  <option value="Active">Active</option>
                  <option value="Dropped">Dropped</option>
                  <option value="Terminated">Terminated</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Reason</label>
                <input
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
                Close
              </button>
              <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-sm">No student status found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#c5f3de] text-left text-green-800">
                <th className="px-3 py-2">Sr. No</th>
                <th className="px-3 py-2">Student Name</th>
                <th className="px-3 py-2">Batch</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Reason</th>
                <th className="px-3 py-2 text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry, index) => (
                <tr key={index} className="bg-gray-50 hover:bg-gray-100 transition">
                  <td className="px-3 py-4">{index + 1}</td>
                  <td className="px-3 py-4">{entry.studentName}</td>
                  <td className="px-3 py-4">{entry.batchName}</td>
                  <td className="px-3 py-4">{entry.status}</td>
                  <td className="px-3 py-4">{entry.reason || '---'}</td>
                  <td className="px-3 py-4 flex justify-center gap-2">
                    <button onClick={() => handleEdit(index)} className="text-green-700"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(index)} className="text-red-600"><Trash2 size={16} /></button>
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

export default StudentStatusTable;