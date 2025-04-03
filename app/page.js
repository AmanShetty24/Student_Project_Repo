"use client";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    loadStudentList();
  }, []);

  async function loadStudentList() {
    try {
      const { data, error } = await supabase.from("Student").select();

      if (error) {
        console.error("Supabase Error:", error);
        alert("Error fetching student list. Check console for details.");
        return;
      }

      if (data) {
        setStudentList(data);
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      {studentList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {studentList.map((student, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 text-center border border-gray-200"
            >
              <p className="text-lg font-semibold">{student.Name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No students found.</p>
      )}
    </div>
  );
}