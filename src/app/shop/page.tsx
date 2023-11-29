import ProductCard from "components/section/ProductCard";
import { fetchAllProducts } from "../data";
// import { client } from "../utils/sanity-client";
import { Product } from "../utils/types";

const Shop = async () => {
  const products: Product[] = await fetchAllProducts();

  if (products) {
    return (
      <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-14 main">
        {products.map((product, index) => (
          <ProductCard key={index} prop={product}></ProductCard>
        ))}
      </div>
    );
  } else {
    return <p>No Products Found</p>;
  }
};

export default Shop;
