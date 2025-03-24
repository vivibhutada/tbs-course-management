// File: src/app/batches/page.js
"use client";

import { useState } from "react";
import CreateBatchTable from "@/components/batches/CreateBatchTable";
import ManageStudentTable from "@/components/batches/ManageStudentTable";
import ManageTrainerTable from "@/components/batches/ManageTrainerTable";
import StudentStatusTable from "@/components/batches/StudentStatusTable";
// (Upcoming) import TrainerStatusTable from '@/components/batches/TrainerStatusTable';
// (Upcoming) import Batch360View from '@/components/batches/Batch360View';

const navItems = [
  { key: "create", label: "Create Batch" },
  { key: "student", label: "Manage Student" },
  { key: "trainer", label: "Manage Trainer" },
  { key: "studentStatus", label: "Student Status" },
  { key: "trainerStatus", label: "Trainer Status" },
  { key: "view", label: "360 View" },
];

export default function Batches() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-4">
        Batch management
      </h1>

      {/* Navigation Tabs */}
      <div className="flex gap-3 flex-wrap mb-6">
        {navItems.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition-all duration-200 ${
              activeTab === key
                ? "bg-green-900 text-white"
                : "bg-white border-green-700 text-green-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Render Components Based on Active Tab */}
      {activeTab === "create" && <CreateBatchTable />}
      {activeTab === "student" && <ManageStudentTable />}
      {activeTab === "trainer" && <ManageTrainerTable />}
      {activeTab === "studentStatus" && <StudentStatusTable />}
    </div>
  );
}
