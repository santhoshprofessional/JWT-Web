import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { endpoints } from "../endpoints";
import { useDispatch } from "react-redux";
import { addUsers } from "../slice/jsonUserSlice";
import axios from "axios";
import useJsonPostStore from "../store/JsonPost.store";
import { TodosContext } from "../store/TodosContext";
const ListUser = lazy(() => import("../components/ListUser"));
const Counter = lazy(() => import("../components/Counter"));
const JsonUser = lazy(() => import("../components/JsonUser"));
const JsonPost = lazy(() => import("../components/JsonPost"));
const JsonTodos = lazy(() => import("../components/JsonTodos"));
const CrudReducer = lazy(() => import("../components/CrudReducer"));
function Home() {
  const [userData, setUserData] = useState([]);
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();
  const { setJsonPost } = useJsonPostStore();
  const getData = useCallback(async () => {
    const data = await fetch(endpoints.user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await data?.json();
    setUserData(json || []);
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
  const handleDeleteUser = useCallback(async (id: string) => {
    await fetch(`${endpoints.user}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    getData();
  }, []);
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);
  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);
  const fetchUser = useCallback(async () => {
    const data = await fetch(endpoints.jsonPlaceHolderUser);
    const json = await data.json();
    dispatch(addUsers(json));
  }, []);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const fetchPost = useCallback(async () => {
    const data = await axios.get(endpoints.jsonPlaceHolderPost);
    console.log("data", data.data);
    setJsonPost(data.data);
  }, []);
  useEffect(() => {
    fetchPost();
  }, [fetchPost]);
  const fetchTodos = useCallback(async () => {
    const data = await axios.get(endpoints.jsonPlaceHolderTodos);
    setTodos(data.data);
  }, []);
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  const staticValues = useMemo(() => {
    return {
      props: "Props",
      context: "Context API",
      redux: "Redux Toolkit",
      zustand: "Zustand",
      reducer: "Reducer",
      reactMemo: "React.memo",
      useCallback: "useCallback",
      useMemo: "useMemo",
    };
  }, []);
  return (
    <TodosContext.Provider value={todos}>
      <Suspense fallback={<>loading</>}>
        <ListUser
          userData={userData}
          handleDeleteUser={handleDeleteUser}
          staticValues={staticValues}
        />
        <Counter
          count={count}
          increment={increment}
          decrement={decrement}
          staticValues={staticValues}
        />
        <JsonUser staticValues={staticValues} />
        <JsonPost staticValues={staticValues} />
        <JsonTodos staticValues={staticValues} />
        <CrudReducer staticValues={staticValues} />
      </Suspense>
    </TodosContext.Provider>
  );
}

export default Home;
