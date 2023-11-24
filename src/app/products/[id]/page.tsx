import { ProductView } from "../../../../components/section/ProductView";
import { Product } from "@/app/utils/types";
import ProductCard from "../../../../components/section/ProductCard";
import { fetchProductByID } from "@/app/data";

export default async function Page({ params }: { params: { id: string } }) {
  const filterProduct: Product = await fetchProductByID(params.id);
  console.log("fetched by id: ",filterProduct);

  return (
    <div className="main">
      <ProductView {...filterProduct} />

      {/* <div>
        <h1 className="font-extrabold"></h1>
        {filteredProducts.map((product: Product, index: number) => (
          <ProductCard key={index} prop={product}></ProductCard>
        ))}
      </div> */}
    </div>
  );
}
