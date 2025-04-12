"use client"
import useStore from "../stores/studentStore";
import React from "react";
import useStore from "../stores/studentStore";
export default function ProfilePage(){
    const {activeStudent}=useStore()
    return(
        <div>
            <h1>Student Profile</h1>
            <p>{JSON.stringify(activeStudent)}</p>
            <p>{activeStudent.email}</p>
            <p>{activeStudent.usn}</p>
            <p>{activeStudent.phone}</p>
        </div>
    )
}