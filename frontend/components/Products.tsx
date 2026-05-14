"use client";

import React from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import AddEditProductForm from "@/components/AddEditProductForm";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/react-query/hooks/useProducts";
import type { Product } from "@/typescript/product.types";
import {
  productCategories,
  type ProductFormValues,
} from "@/typescript/product.schema";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const emptyProductForm: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  category: "Other",
  inStock: true,
};

const normalizeCategory = (category: string): ProductFormValues["category"] => {
  const matchedCategory = productCategories.find((item) => item === category);

  return matchedCategory ?? "Other";
};

const Products = () => {
  const { data, isLoading, isError, error } = useProducts();
  const createProductMutation = useCreateProduct();
  const deleteProductMutation = useDeleteProduct();
  const updateProductMutation = useUpdateProduct();
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const products = data?.data ?? [];
  const formDefaultValues = editingProduct
    ? {
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        category: normalizeCategory(editingProduct.category),
        inStock: editingProduct.inStock,
      }
    : emptyProductForm;

  const handleAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (shouldDelete) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleSubmitProduct = (values: ProductFormValues) => {
    if (editingProduct) {
      updateProductMutation.mutate(
        { id: editingProduct._id, payload: values },
        {
          onSuccess: () => {
            handleCloseForm();
          },
        }
      );
      return;
    }

    createProductMutation.mutate(values, {
      onSuccess: () => {
        handleCloseForm();
      },
    });
  };

  const actionError =
    createProductMutation.error ||
    updateProductMutation.error ||
    deleteProductMutation.error;
  const isSaving =
    createProductMutation.isPending || updateProductMutation.isPending;

  return (
    <Box
      component="main"
      className="w-full px-4 pb-6 pt-4 sm:px-6 lg:px-8 h-auto min-h-[100vh]"
    >
      <Box className="mx-auto w-full max-w-6xl">
        <Box className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Products
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.total ?? 0} products in inventory
            </Typography>
          </Box>
          <Button variant="contained" onClick={handleAdd}>
            Add Product
          </Button>
        </Box>

        {actionError instanceof Error && (
          <Alert severity="error" className="mb-4">
            {actionError.message}
          </Alert>
        )}

        {isLoading ? (
          <Paper className="flex min-h-56 items-center justify-center p-6">
            <CircularProgress />
          </Paper>
        ) : isError ? (
          <Alert severity="error">
            {error instanceof Error ? error.message : "Failed to load products"}
          </Alert>
        ) : products.length === 0 ? (
          <Paper className="p-6">
            <Typography variant="body1">No products found.</Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 860 }} aria-label="products table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {product.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{product.description || "-"}</TableCell>
                    <TableCell>{product.category || "-"}</TableCell>
                    <TableCell align="right">
                      {formatPrice(product.price)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={product.inStock ? "In stock" : "Out of stock"}
                        color={product.inStock ? "success" : "default"}
                        size="small"
                        variant={product.inStock ? "filled" : "outlined"}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(product.createdAt).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label={`Edit ${product.name}`}
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(product)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label={`Delete ${product.name}`}
                        color="error"
                        size="small"
                        disabled={deleteProductMutation.isPending}
                        onClick={() => handleDelete(product._id)}
                      >
                        <DeleteOutlinedIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog
          open={isFormOpen}
          onClose={handleCloseForm}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {editingProduct ? "Edit Product" : "Add Product"}
          </DialogTitle>
          <AddEditProductForm
            defaultValues={formDefaultValues}
            isSubmitting={isSaving}
            submitLabel={editingProduct ? "Save" : "Create"}
            onCancel={handleCloseForm}
            onSubmit={handleSubmitProduct}
          />
        </Dialog>
      </Box>
    </Box>
  );
};

export default Products;
