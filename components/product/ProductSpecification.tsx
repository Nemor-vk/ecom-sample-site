import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Separator } from '../ui/separator';

const specifications = [
    { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { id: "INV002", status: "Pending", method: "PayPal", amount: "$120.00" },
    { id: "INV003", status: "Failed", method: "Bank Transfer", amount: "$310.00" },
  ];
  

const ProductSpecification = () => {
  return (
    <div className='grid md:grid-cols-2 grid-cols-1'>
      <Table className='w-full table-fixed overflow-hidden'>
          <TableBody>
          <Separator/>
          <TableRow className="grid grid-cols-1 md:grid-cols-2 border-t">
            <TableHead className="">Brand</TableHead>
            <TableCell className="font-medium">Boat</TableCell>
          </TableRow>
          <TableRow className="grid grid-cols-2">
            <TableHead className="">Manufacturer</TableHead>
            <TableCell className="font-medium">‎Sounce, Retail Private Limited, Godown Nos. 5 & 6, Building No. E6, 1st Floor, Angel Infrastructure, Bhiwandi - 421311 Email us at: support@.com, Customer Care: +91-8879977722</TableCell>
          </TableRow>
          <TableRow className="grid grid-cols-2">
            <TableHead className="">Color</TableHead>
            <TableCell className="font-medium">White</TableCell>
          </TableRow>
          <TableRow className="grid grid-cols-2">
            <TableHead className="">Model</TableHead>
            <TableCell className="font-medium">niravana-White wirless</TableCell>
          </TableRow>
          <TableRow className="grid grid-cols-2">
            <TableHead className="">Item Weight</TableHead>
            <TableCell className="font-medium">220g</TableCell>
          </TableRow>
          <TableRow className="grid grid-cols-2 border-b mb-2">
            <TableHead className="">Box Items</TableHead>
            <TableCell className="font-medium">Headphone, carry pouch, charging cable, user manual, warranty card</TableCell>
          </TableRow>
          </TableBody>
      </Table>
    </div>
  );
}

export default ProductSpecification