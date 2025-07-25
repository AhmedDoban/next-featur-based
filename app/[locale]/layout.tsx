import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Suspense } from "react";
import ToastProvider from "../../components/Toast/ToastProvider";
import StoreProvider from "../../store/StoreProvider";
import Loading from "../../components/Loading/Loading";
import AOSProvider from "../../components/AOS/AOS";

export const metadata: Metadata = {
  title: "Next 14 Template",
  description: "Generated by create next app",
};

async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body
        dir={locale == "ar" ? "rtl" : "ltr"}
        style={{
          fontFamily: locale == "ar" ? "HelveticaNeueLTArabic" : "Helvetica",
        }}
      >
        <Suspense>
          <ToastProvider>
            <NextIntlClientProvider messages={messages}>
              <Loading>
                <AOSProvider>
                  <StoreProvider>{children}</StoreProvider>
                </AOSProvider>
              </Loading>
            </NextIntlClientProvider>
          </ToastProvider>
        </Suspense>
      </body>
    </html>
  );
}
export default RootLayout;
