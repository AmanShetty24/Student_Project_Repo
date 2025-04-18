"use client";
import InputField from "@/app/components/inputField";
import { supabase } from "@/app/lib/supabase";
import { useState } from "react";
import { useStore } from "@/app/stores/studentStore";
import { useRouter } from "next/navigation"; // Correct router import

export default function CreateStudent() {
  const { setActiveStudent } = useStore();
  const router = useRouter();

  const [name, setName] = useState("");
  const [usn, setUSN] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  async function handleSubmit() {
    if (!name || !usn || !address || !phone || !gender) {
      alert("All fields are mandatory.");
      return;
    }

    try {
      const { data, error } = await supabase.from("Student").insert([
        {
          Name: name, // Ensure column names match your DB
          Usn: usn,
          Address: address,
          Phone: phone,
          Gender: gender,
        },
      ]).select();

      if (error) {
        console.error("Supabase Error:", error);
        alert("Failed to add student. See console for details.");
      } else if (data) {
        alert("Student added successfully!");
        setActiveStudent(data[0]); // Ensure correct state update
        router.push("/profile/page"); // Correct way to navigate
      }
    } catch (e) {
      console.error("Unexpected Error:", e);
      alert("Something went wrong. Check console for details.");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-3xl font-bold">
        <InputField type="text" value={name} placeholder="Student Name" onChange={(e) => setName(e.target.value)} />
        <InputField type="text" value={usn} placeholder="Student USN" onChange={(e) => setUSN(e.target.value)} />
        <InputField type="text" value={address} placeholder="Student Address" onChange={(e) => setAddress(e.target.value)} />
        <InputField type="text" value={phone} placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
        <InputField type="text" value={gender} placeholder="Student Gender" onChange={(e) => setGender(e.target.value)} />

        <div className="flex flex-row bg-green-500 text-white p-2 rounded-md mt-4">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
