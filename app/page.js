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
    <div>
      {studentList.length > 0 ? (
        studentList.map((data, index) => (
          <div key={index}>{data.Name}</div>
        ))
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}
