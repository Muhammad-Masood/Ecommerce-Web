import { sora } from "@/app/()/layout";
import { getOrdersData } from "../../server";
import { Orders } from "../../_components/Orders";

const page = async () => {
    const orders_data = await getOrdersData();
    // console.log(orders_data);
    // console.log(orders_data[0].products);

  return (
    <div className="main space-y-6">
      <p className={`text-4xl ${sora.className}`}>Manage Orders</p>
      <Orders orders_data={orders_data}/>
    </div>
  );
};

export default page;