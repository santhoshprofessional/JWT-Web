import { createContext } from "react";
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export const TodosContext = createContext<Todo[] | null>(null);
