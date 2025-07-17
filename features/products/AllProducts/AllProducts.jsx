import useFetchData from "../../../hooks/useFetchData";
import ProductCard from "../components/ProductCard";

async function AllProducts() {
  try {
    const data = await useFetchData({ endpoint: "/", method: "GET" });
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return <div>Error loading products.</div>;
  }
}

export default AllProducts;
