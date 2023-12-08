import React from 'react'
import { DataTable } from './data-table/data-table'
import { columns } from './data-table/columns'
import { OrdersData } from '../server'

export const Orders = ({orders_data}: {orders_data: OrdersData[]}) => {
  console.log(orders_data);
  return (
    <div>
        <DataTable columns={columns} data={orders_data}/>
    </div>
  )
}