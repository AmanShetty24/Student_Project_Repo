import {create} from "zustand";

const useStore=create((set)=({
 activeStudent:(student)=>set({activeStudent:student}),


}))
export default useStore;