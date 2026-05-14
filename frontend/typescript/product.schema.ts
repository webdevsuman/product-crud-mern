import { z } from "zod";

export const productCategories = [
  "Electronics",
  "Clothing",
  "Shoes",
  "Books",
  "Accessories",
  "Other",
] as const;

export const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  description: z.string().trim().optional().default(""),
  price: z.coerce
    .number()
    .positive("Price must be greater than 0")
    .finite("Price must be a valid number"),
  category: z.enum(productCategories, "Category is required"),
  inStock: z.boolean().default(true),
});

export type ProductFormValues = z.infer<typeof productSchema>;
