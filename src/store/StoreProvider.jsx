"use client";
import { Provider } from "react-redux";
import { Store } from "@/store/Store";

function StoreProvider({ children }) {
  return <Provider store={Store}>{children}</Provider>;
}
export default StoreProvider;
