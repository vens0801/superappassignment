import { create } from "zustand";

export const useStore = create((set) => ({
  // 1. Initial State
  user: {
    name: "",
    username: "",
    email: "",
    mobile: "",
  },
  categories: [],
  notes: localStorage.getItem("super_app_notes") || "",

  // 2. Actions (This is what was missing or broken!)
  setUser: (userData) => set({ user: userData }),
  
  setCategories: (categoryArray) => set({ categories: categoryArray }),
  
  setNotes: (noteText) => {
    localStorage.setItem("super_app_notes", noteText);
    set({ notes: noteText });
  },
  
  resetStore: () => set({
    user: { name: "", username: "", email: "", mobile: "" },
    categories: [],
    notes: ""
  })
}));