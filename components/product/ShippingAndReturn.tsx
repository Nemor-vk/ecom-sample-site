import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const ShippingAndReturn = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>How long will it take for my order to be delivered?</AccordionTrigger>
        <AccordionContent>
        Orders in India, once shipped, are typically delivered in 1-4 business days in metros, and 4-7 business days for the rest of India. Delivery time may vary depending upon the shipping address and other factors (public holidays, extreme weather conditions, etc.).
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Are there any additional shipping charges?</AccordionTrigger>
        <AccordionContent>
        The Souled Store provides FREE shipping for all orders above ₹499 in India. A shipping charge of ₹50 is payable only on orders below ₹499. The minimum order value should be ₹199 (excluding GST).
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>What are the terms of the Return/Exchange Policy?</AccordionTrigger>
        <AccordionContent>
        You can return their order within 30 days after an order has been delivered. We have a reverse pick-up facility for most pin codes. For pin codes that are non-serviceable by our courier partners against the reverse pick-up policy, you will have to self-ship the product(s).
You can also return or exchange products at any of our nearest stores. You can visit this link to check the stores available near your location. https://www.thesouledstore.com/stores-near-me

In the interest of hygiene, we may refuse returns where it&apos;s obvious that the item has been worn, washed, or soiled. Defective products need not be sent back to us unless confirmed by the Customer Experience Team. If you have received a defective product, send us images at connect@thesouledstore.com and we will get back to you. Once confirmed by the Customer Experience Team the refund will be provided either into your bank account or as TSS Money as per your convenience.

If you have to return anything from a combo pack, the whole pack will have to be returned. There will not be any partial returns accepted. If there is a manufacturing issue, or if you have any other queries regarding this, you can contact us on the number or email us at connect@thesouledstore.com.
Gift cards/ vouchers are non-refundable.
Gift wrapping charges will not be refunded if goods are returned. Also, we will not be able to gift wrap any replacements you have asked for.
To maintain strict hygiene standards of our products, we do not accept returns on several product categories, including but not limited to masks, boxers, shorts, sweat-activated t-shirts, and socks. The Souled Store may, at its discretion and without prior notice, change the products or categories to which this policy would apply.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>Is this product eligble for return/refunds</AccordionTrigger>
        <AccordionContent>
        The Souled Store provides FREE shipping for all orders above ₹499 in India. A shipping charge of ₹50 is payable only on orders below ₹499. The minimum order value should be ₹199 (excluding GST).
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ShippingAndReturn