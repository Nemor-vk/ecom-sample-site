import { Prisma } from "@/generated/prisma";

export const sampleData = {
    images : [
        {
            url: 'https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/boat_white.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvYm9hdF93aGl0ZS5qcGciLCJpYXQiOjE3NDUxNTEyNzksImV4cCI6MTc0Nzc0MzI3OX0.Mp_JQcpTeyh94fJfU2xeYF4Jj73m_we2Z6bIYOXSg0k',
            altText: 'A white boat image',
          },
          {
            url: 'https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/gshock1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvZ3Nob2NrMS5qcGciLCJpYXQiOjE3NDUxNTA5NzgsImV4cCI6MTc0Nzc0Mjk3OH0.30g5JzRe-3yDsrg3lj6tTFeKcgXOpoHU87VNJMKsp50',
            altText: 'G-Shock watch, model 1',
          },
          {
            url: 'https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/oneplus_tws.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvb25lcGx1c190d3MuanBnIiwiaWF0IjoxNzQ1MTUxMzAzLCJleHAiOjE3NDc3NDMzMDN9.oC8vVjQ-I35eKZwmxSkk4odHPiOuLGBUoi38fwtVpl8',
            altText: 'OnePlus TWS earbuds',
          },
          {
            url: 'https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/philips_airfryer.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvcGhpbGlwc19haXJmcnllci5qcGciLCJpYXQiOjE3NDUxNTEzMjEsImV4cCI6MTc0Nzc0MzMyMX0.RS91RMAlPT2YXZSewr7zbtvMXNKoOzvnyL-O2b-fkYs',
            altText: 'Philips Air Fryer',
          },
          {
            url: 'https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/ring_silver.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvcmluZ19zaWx2ZXIuanBnIiwiaWF0IjoxNzQ1MTUxMzQxLCJleHAiOjE3NDc3NDMzNDF9.6hd9tOrr8KwlaF3thsXnfd86q0v6cGyuppYEnLHUMk4',
            altText: 'Silver ring',
          },
          {
            url: 'https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/souled_shirt.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvc291bGVkX3NoaXJ0LmpwZyIsImlhdCI6MTc0NTE1MTM1OSwiZXhwIjoxNzQ3NzQzMzU5fQ._BiW0cSP8NynWIXdhnKs1owsnRfI7txZ4reUDdM5x7g',
            altText: 'Souled branded shirt',
          },
          {
            url: 'https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/souled_shoes.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvc291bGVkX3Nob2VzLmpwZyIsImlhdCI6MTc0NTE1MTM3MSwiZXhwIjoxNzQ3NzQzMzcxfQ.GJLdn1FcYvvkztt94Et0I8d0MMq_nuAU6GMkIj_sZbc',
            altText: 'Souled branded shoes',
          }
    ],

    sectionsData : [
        {
          name: "Trending",
          description: "Discover the latest and hottest trending products available now."
        },
        {
          name: "Popular",
          description: "Browse the most popular products loved by our customers."
        }
      ],

    categories : [
        {
          name: "Accessories",
          description: "Trendy accessories for all occasions.",
        },
        {
          name: "Jewellery",
          description: "Elegant jewellery to complement your style.",
        },
        {
          name: "Footwear",
          description: "Comfortable and stylish footwear.",
        },
        {
          name: "Fashion",
          description: "Latest fashion trends for every season.",
        },
        {
          name: "Kitchen",
          description: "Essential kitchen items for everyday use.",
        },
        {
          name: "Watches",
          description: "Stylish and functional watches.",
        }
      ],

    products : [
        {
            name: "Casio G-Shock Analog-Digital Blue Dial Men (G1614)",
            description: "Casio G-Shock Analog-Digital Blue Dial Men (G1614)",
            price: new Prisma.Decimal("15000.00"),
            stock: 30,
            productType: "PHYSICAL",
            rating: 5,
            availableForPurchase: true,
            categoryId: "cd049692-277e-4464-8173-ef665d80c117",
            // Connect to one or more Sections (ensure these IDs exist)
//             image : {
//                 connect: [{id: `https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/ring_silver.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvcmluZ19zaWx2ZXIuanBnIiwiaWF0IjoxNzQ1MTUxMzQxLCJleHAiOjE3NDc3NDMzNDF9.6hd9tOrr8KwlaF3thsXnfd86q0v6cGyuppYEnLHUMk4"
// "https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/souled_shoes.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvc291bGVkX3Nob2VzLmpwZyIsImlhdCI6MTc0NTE1MTM3MSwiZXhwIjoxNzQ3NzQzMzcxfQ.GJLdn1FcYvvkztt94Et0I8d0MMq_nuAU6GMkIj_sZbc"
// "https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/oneplus_tws.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvb25lcGx1c190d3MuanBnIiwiaWF0IjoxNzQ1MTUxMzAzLCJleHAiOjE3NDc3NDMzMDN9.oC8vVjQ-I35eKZwmxSkk4odHPiOuLGBUoi38fwtVpl8"
// "https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/souled_shirt.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvc291bGVkX3NoaXJ0LmpwZyIsImlhdCI6MTc0NTE1MTM1OSwiZXhwIjoxNzQ3NzQzMzU5fQ._BiW0cSP8NynWIXdhnKs1owsnRfI7txZ4reUDdM5x7g"
// "https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/boat_white.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvYm9hdF93aGl0ZS5qcGciLCJpYXQiOjE3NDUxNTEyNzksImV4cCI6MTc0Nzc0MzI3OX0.Mp_JQcpTeyh94fJfU2xeYF4Jj73m_we2Z6bIYOXSg0k"
// "https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/gshock1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvZ3Nob2NrMS5qcGciLCJpYXQiOjE3NDUxNTA5NzgsImV4cCI6MTc0Nzc0Mjk3OH0.30g5JzRe-3yDsrg3lj6tTFeKcgXOpoHU87VNJMKsp50"
// "https://ssgafvsdeptagcagtmgw.supabase.co/storage/v1/object/sign/assets/products/philips_airfryer.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y3YTVkNWJlLTM4YmMtNDRiNC1iNmY3LTc1NDZjNjMwMjM3OCJ9.eyJ1cmwiOiJhc3NldHMvcHJvZHVjdHMvcGhpbGlwc19haXJmcnllci5qcGciLCJpYXQiOjE3NDUxNTEzMjEsImV4cCI6MTc0Nzc0MzMyMX0.RS91RMAlPT2YXZSewr7zbtvMXNKoOzvnyL-O2b-fkYs`},]
//             }
            // Leaving images and orders empty; they can be added later if needed.
          },
      ],



}