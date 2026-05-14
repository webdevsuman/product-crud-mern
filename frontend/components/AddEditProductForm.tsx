"use client";

import React from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControlLabel,
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

interface AddEditProductFormProps {
  defaultValues: ProductFormValues;
  isSubmitting: boolean;
  submitLabel: string;
  onCancel: () => void;
  onSubmit: (values: ProductFormValues) => void;
}

const AddEditProductForm = ({
  defaultValues,
  isSubmitting,
  submitLabel,
  onCancel,
  onSubmit,
}: AddEditProductFormProps) => {
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

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

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
      <DialogContent className="flex flex-col gap-4 pt-2">
        <TextField
          label="Name"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          fullWidth
          {...register("name")}
        />
        <TextField
          label="Description"
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
          fullWidth
          multiline
          minRows={3}
          {...register("description")}
        />
        <TextField
          label="Price"
          type="number"
          error={Boolean(errors.price)}
          helperText={errors.price?.message}
          fullWidth
          {...register("price", { valueAsNumber: true })}
        />
        <TextField
          label="Category"
          select
          error={Boolean(errors.category)}
          helperText={errors.category?.message}
          fullWidth
          {...register("category")}
        >
          {productCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          control={
            <Controller
              name="inStock"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                />
              )}
            />
          }
          label="In stock"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Box>
  );
};

export default AddEditProductForm;
