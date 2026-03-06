import { PRODUCT_TYPE } from "@/app/constants";
import { AddressLabelPreset, UsageLimitPeriod } from "@/generated/prisma";
import { z } from "zod";

export const productSchema = z.object({
    name : z.string().trim().min(2).max(100),
    description: z.string().trim().min(10),
    originalPrice: z.coerce.number().nonnegative(), // Optional field for original price
    price : z.coerce.number().refine(value => Number(value.toFixed(2)) === value, {
      message: "Price must have at most 2 decimal places.",
    }),
    stock : z.coerce.number().nonnegative(),
    productType : z.enum([PRODUCT_TYPE.PHYSICAL, PRODUCT_TYPE.DIGITAL]),
    rating : z.coerce.number().min(0).max(5),
    filePath : z.string().nullable(),
    downloadUrl : z.string().nullable(),
    availableForPurchase : z.boolean(),
    categoryId : z.string().nonempty(),
    productTags: z.array(z.string()).min(3, "Must have at least 3 tags"),
    sectionNames: z.array(z.string()).max(3,'A maxiumum of 3 Labels can be assigned'),
    image :  z.array(z.string()).min(1)
    // image: z.array(z.object({
    //     url: z.string().url("URL must be a valid format").nonempty(), // Validates url as a valid URL
    //     altText: z.string().nonempty(),
    //     productId: z.string().nullable(),
    //     // product: z.object({ /* Add Product schema here */ }).nullable(), // Relation to Product (nullable)

    // })),
    // category: z.object({
    //     name: z.string().min(1, "Name is required").max(50),
    //     description: z.string().nullable(),
    //     imageUrl: z.string().nonempty(),
    // }), // Relation to Category (replace with actual Category schema)

    // sections: z.array(z.object({ /* Add Section validation schema here */ })).nullable(), // Array of Section objects
    // Order: z.array(z.object({ /* Add Order validation schema here */ })), 
})

export const categorySchema = z.object({
    name : z.string().trim().min(2).max(100),
    description: z.string().trim().max(1000),
    sectionNames: z.array(z.string()).max(3,'A maxiumum of 3 Labels can be assigned'),
    isActive:  z.boolean(),
    imageUrl : z.string().nullable(),
    productCount: z.coerce.number().nonnegative(),
    parentId: z.string().trim().nullable(),
})

export const promotionalTagSchema = z.object({
    name : z.string().trim().min(2).max(100),
    description: z.string().trim().max(1000).nullable(),
    isActive:  z.boolean(),
    imageUrl : z.string().nullable(),
})

// export const addressSchema = z.object({
//   recipientName: z.string().trim().min(2).max(100),
//   lastName : z.string().trim().min(2).max(100),
//   primaryAddress: z.string().trim().min(5).max(100),
//   streetAddress: z.string().trim().min(5).max(200),
//   city: z.string().trim().min(2).max(50),
//   state: z.string().trim().min(2).max(50),
//   landmark: z.string().trim().max(50).nullable(),
//   pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid pincode format"),
//   phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits")
//   .length(10, "Phone number must be 10 digits"),
//   // addressType: z.string().trim().min(2).max(12),
// })


// LOGIN SCHEMA

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const signUpSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  mobileNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
})

// dateOfBirth: z
//     .string()
//     .refine((dob) => {
//       const date = new Date(dob);
//       const age = new Date().getFullYear() - date.getFullYear();
//       return age >= 18;
//     }, {
//       message: 'User must be at least 18 years old',
//     }),

const addressLabelPresetEnum = z.enum(['Home', 'Work', 'Hotel', 'Others']);

export const addressSchema = z.object({

  recipientName: z.string().trim().min(2).max(100),

  labelPreset: addressLabelPresetEnum.default('Home').optional(),
  customLabel: z
    .string()
    .trim()
    .max(50, 'Custom label cannot exceed 50 characters')
    .optional(),

  primaryAddress: z
    .string()
    .trim()
    .min(2, 'Primary address must be at least 2 characters')
    .max(100, 'Primary address is too long'),

  streetAddress: z
    .string()
    .trim()
    .min(5, 'Street address must be at least 5 characters')
    .max(200, 'Street address is too long'),

  city: z
    .string()
    .trim()
    .min(2, 'City must be at least 2 characters')
    .max(50),

  state: z
    .string()
    .trim()
    .min(2, 'State must be at least 2 characters')
    .max(50),

  landmark: z
    .string()
    .trim()
    .max(100)
    // .nullable()
    .optional(),

  pincode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, 'Pincode must be a valid 6-digit number'),

  phoneNumber: z
    .string()
    .length(10, 'Phone number must be 10 digits')
    .regex(/^\d{10}$/, 'Phone number must contain only digits'),
});


//   const result = addressListSchema.safeParse(addressArray);

// if (!result.success) {
//   console.log(result.error.format());
// }

export const dateSchema = z
  .string()
  .regex(/^\d{2}-\d{2}-\d{4}$/, 'Date must be in DD-MM-YYYY format');


// const ddmmyyyyStrict = ddmmyyyySchema.transform((str) => {
//   const [d, m, y] = str.split('-').map(Number);
//   const date = new Date(y, m - 1, d);
//   if (date.getDate() !== d || date.getMonth() !== m - 1) {
//     throw new Error('Invalid calendar date');
//   }
//   return date;
// });
export const discountSchema = z.object({
  code: z.string().min(1, "Discount code is required"),
  name: z.string().min(1, "Display name is required"),
  description: z.string().optional(),
  type: z.enum(["PERCENTAGE", "FIXED_AMOUNT", "FREE_SHIPPING", "BUY_X_GET_Y"]),
  value: z.coerce.number().optional(),
  minOrderAmount: z.coerce.number().optional(),
  maxDiscountAmount: z.coerce.number().optional(),
  usageLimit: z.coerce.number().min(1),
  usageLimitPeriod: z.nativeEnum(UsageLimitPeriod).optional(),
  isActive: z.boolean(),
  validFrom: z.string().min(1, "Valid from date is required"),
  validUntil: z.string().optional(),
  applicableProducts: z.array(z.string()),
  applicableCategories: z.array(z.string()),
})

