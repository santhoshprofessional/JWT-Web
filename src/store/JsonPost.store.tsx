import { create } from "zustand";

const useJsonPostStore = create<{
  jsonPost: any[];
  setJsonPost: (data: any[]) => void;
}>((set) => ({
  jsonPost: [],
  setJsonPost: (data: any[]) => set(() => ({ jsonPost: data })),
}));

export default useJsonPostStore;
