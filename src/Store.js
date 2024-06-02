// alphabetStore.js
import { create } from "zustand";


const UseStore = (set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),  
});

export default create(UseStore);
