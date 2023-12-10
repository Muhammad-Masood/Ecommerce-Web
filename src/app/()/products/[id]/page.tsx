import  ProductView from "components/section/ProductView"; 
import { Product } from "@/app/utils/types";
import { fetchProductByID } from "@/app/data";

export default async function Page({ params }: { params: { id: string } }) {
  const filterProduct: Product = await fetchProductByID(params.id);

  return (
    <div className="">
      <ProductView {...filterProduct} />
    </div>
  );
}
