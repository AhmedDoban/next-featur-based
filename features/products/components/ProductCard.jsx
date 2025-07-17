function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">
        {product.title}
      </h3>
      <p className="text-xl font-bold text-blue-600">${product.price}</p>
    </div>
  );
}
export default ProductCard;
