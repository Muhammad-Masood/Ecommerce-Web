import { cabin, lato, sora, sora_d } from "@/app/layout";
import { Product } from "@/app/utils/types";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const ProductCard = ({ prop }: { prop: Product }) => {
  const { _rev, name, subCategory, main_image, price, size } = prop;
  return (
    <div className={`py-4 ${cabin.className}`}>
      <Link
        className=""
        href={`/products/${_rev}${
          size ? "?size=".concat(size[0].name) : "none"
        }`}
      >
        <Image
          src={main_image.asset.url}
          alt="product image"
          width={250}
          height={250}
          className="w-auto h-auto"
        ></Image>
        <div className="max-w-[250px]">
          <p
            className={`font-poppins text-lg text-gray-900 mt-2 tracking-wide ${sora_d.className} whitespace-nowrap overflow-hidden overflow-ellipsis`}
          >
            {name}
          </p>
        </div>
        <p className="font-poppins text-lg  leading-loose text-gray-500">
          {subCategory.name}
        </p>
        <p className="font-sans-serif text-xl text-black mt-1 tracking-normal">
          ${price}
        </p>
      </Link>
    </div>
  );
};

export default ProductCard;
