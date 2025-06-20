"use client";
import Loading from "@/components/Loading/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { Fragment, useEffect, useState } from "react";

const AOSProvider = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
    setLoaded(true);
  }, []);

  if (!loaded) return <Loading />;

  return <Fragment>{children}</Fragment>;
};

export default AOSProvider;
