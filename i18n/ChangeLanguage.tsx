"use client";
import { useRouter } from "./routing";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

export function useChangeLanguage() {
  const [isPending, startTranslation] = useTransition();
  const PathName = usePathname();
  const router = useRouter();

  const ChangeLanguage = (lang: string) => {
    startTranslation(() => {
      const OldPath = PathName.replace(/\/en|\/ar/, `/${lang}`);
      router.replace(`${OldPath}`);
    });
  };

  return { ChangeLanguage, isPending };
}
