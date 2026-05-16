"use client";

import { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
  productCategories,
  productSchema,
  type ProductFormValues,
} from "@/typescript/product.schema";
import { useProductDetails } from "@/react-query/hooks/useProducts";
import type { Product } from "@/typescript/product.types";

interface AddEditProductFormProps {
  defaultValues: ProductFormValues;
  productId?: string;
  isSubmitting: boolean;
  submitLabel: string;
  onCancel: () => void;
  onSubmit: (values: ProductFormValues) => void;
}

const normalizeCategory = (category: string): ProductFormValues["category"] => {
  const matchedCategory = productCategories.find((item) => item === category);

  return matchedCategory ?? "Other";
};

const toProductFormValues = (product: Product): ProductFormValues => ({
  name: product.name,
  description: product.description,
  price: product.price,
  category: normalizeCategory(product.category),
  inStock: product.inStock,
});

const AddEditProductForm = ({
  defaultValues,
  productId,
  isSubmitting,
  submitLabel,
  onCancel,
  onSubmit,
}: AddEditProductFormProps) => {
  const {
    data: productDetails,
    isFetching: isFetchingProductDetails,
    isError: isProductDetailsError,
    error: productDetailsError,
  } = useProductDetails(productId);
  const {
    formState: { errors },
    control,
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<ProductFormValues>({
    defaultValues,
  });
  const isFormDisabled = isSubmitting || isFetchingProductDetails;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (productDetails?.data) {
      reset(toProductFormValues(productDetails.data));
    }
  }, [productDetails, reset]);

  const handleValidatedSubmit = (values: ProductFormValues) => {
    const parsed = productSchema.safeParse(values);

    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (typeof fieldName === "string") {
          setError(fieldName as keyof ProductFormValues, {
            message: issue.message,
          });
        }
      });

      return;
    }

    onSubmit(parsed.data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleValidatedSubmit)}>
      <DialogContent
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          pt: 1,
          "& .full-row": {
            gridColumn: "1 / -1",
          },
        }}
      >
        {isProductDetailsError && (
          <Alert severity="error" className="full-row">
            {productDetailsError instanceof Error
              ? productDetailsError.message
              : "Failed to load product details"}
          </Alert>
        )}
        {isFetchingProductDetails && (
          <Box
            className="full-row"
            sx={{ display: "flex", justifyContent: "center", py: 1 }}
          >
            <CircularProgress size={24} />
          </Box>
        )}
        <TextField
          className="full-row"
          label="Name"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          fullWidth
          disabled={isFormDisabled}
          {...register("name")}
        />
        <TextField
          className="full-row"
          label="Description"
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
          fullWidth
          multiline
          minRows={3}
          disabled={isFormDisabled}
          {...register("description")}
        />
        <TextField
          label="Price"
          type="number"
          error={Boolean(errors.price)}
          helperText={errors.price?.message}
          fullWidth
          disabled={isFormDisabled}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            },
          }}
          {...register("price", { valueAsNumber: true })}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField
              label="Category"
              select
              error={Boolean(errors.category)}
              helperText={errors.category?.message}
              fullWidth
              disabled={isFormDisabled}
              {...field}
            >
              {productCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <FormControlLabel
          className="full-row"
          control={
            <Controller
              name="inStock"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  disabled={isFormDisabled}
                  onChange={(event) => field.onChange(event.target.checked)}
                />
              )}
            />
          }
          label="In stock"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isFormDisabled}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : null}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Box>
  );
};

export default AddEditProductForm;
