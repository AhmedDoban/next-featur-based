"use client";
import { useEffect, useState } from "react";
import "./Loading.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Loading({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setProgress(0);
    setIsVisible(true);
    const minTime = setTimeout(() => setIsVisible(false), 2000);
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 50);

    return () => {
      clearInterval(interval);
      clearTimeout(minTime);
    };
  }, [pathname]);

  if (!isVisible) return children;

  return (
    <div className="loading-screen">
      <div className="loading-box">
        <div className="LoadingLogoBox">
          <Image
            width={100}
            height={100}
            src="/favicon.ico"
            alt="Logo"
            className="Logo"
          />
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}
