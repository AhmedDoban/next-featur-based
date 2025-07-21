// import { useLocale } from "next-intl";
// import { useAllProductsQuery } from "@/Toolkit/Slices/ProductsSlice";
import { getTranslations, getLocale } from "next-intl/server";
import AllProducts from "@/features/products/AllProducts/AllProducts";

const Page = async ({ params }) => {
  const { locale } = await params;
  // const localActive = useLocale(); in case of using the client side
  const localActive = await getLocale(); // in case of using the server side
  const Translate = await getTranslations({ locale });

  // const Translate2 = await getTranslations({ locale, namespace: "Navbar" }); // in case of use the spacific data in translation file

  // const Translate = useTranslations(); in the case of using the client side
  // const Translate = useTranslations("Navbar"); in the case of using the client side and use the spacific data in translation file
  // const { data, isLoading, isError } = useAllProductsQuery(); in the case of using the client side

  return (
    <div className="page">
      <div className="container">
        <h1>{Translate("Title")}</h1>
        <AllProducts />
      </div>
    </div>
  );
};
export default Page;
