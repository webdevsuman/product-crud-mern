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
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddEditProductForm from "@/components/AddEditProductForm";
import ConfirmDialog from "@/ui/ConfirmDialog";
import ProductEmptyState from "@/components/ProductEmptyState";
import ProductList from "@/components/ProductList";
import ProductWrapper from "@/ui/ProductWrapper";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/react-query/hooks/useProducts";
import { useSearch } from "@/utils/SearchContext";
import type { Product } from "@/typescript/product.types";
import {
  productCategories,
  type ProductFormValues,
} from "@/typescript/product.schema";

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
  const [deletingProduct, setDeletingProduct] = React.useState<Product | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const { searchQuery } = useSearch();
  const products = data?.data ?? [];

  const filteredProducts = products.filter(
    (product) =>
      (product.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (product.category || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const inStockCount = filteredProducts.filter((product) => product.inStock)
    .length;
  const outOfStockCount = filteredProducts.length - inStockCount;
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

  const handleDelete = (product: Product) => {
    setDeletingProduct(product);
  };

  const handleCloseDeleteDialog = () => {
    if (!deleteProductMutation.isPending) {
      setDeletingProduct(null);
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingProduct) {
      return;
    }

    deleteProductMutation.mutate(deletingProduct._id, {
      onSuccess: () => {
        setDeletingProduct(null);
      },
    });
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

  const isSaving =
    createProductMutation.isPending || updateProductMutation.isPending;

  return (
    <ProductWrapper>
      <Box className="product-inner">
        <Box className="product-header">
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Products
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your store inventory
            </Typography>
            <Box className="product-stats">
              <Chip
                label={`${filteredProducts.length} ${
                  searchQuery ? "found" : "total"
                }`}
                size="small"
              />
              <Chip
                label={`${inStockCount} in stock`}
                color="success"
                size="small"
                variant="outlined"
              />
              <Chip
                label={`${outOfStockCount} out of stock`}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
            Add Product
          </Button>
        </Box>

        {isLoading ? (
          <Paper className="product-loading-panel">
            <CircularProgress />
          </Paper>
        ) : isError ? (
          <Alert severity="error">
            {error instanceof Error ? error.message : "Failed to load products"}
          </Alert>
        ) : filteredProducts.length === 0 ? (
          searchQuery ? (
            <Paper
              sx={{
                p: 8,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                borderRadius: 2,
                bgcolor: "background.paper",
                border: "1px dashed",
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No products match &quot;{searchQuery}&quot;
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  const input = document.querySelector(
                    'input[aria-label="search products"]'
                  );
                  if (input instanceof HTMLInputElement) {
                    input.focus();
                  }
                }}
              >
                Try a different search term
              </Button>
            </Paper>
          ) : (
            <ProductEmptyState onAdd={handleAdd} />
          )
        ) : (
          <ProductList
            products={filteredProducts}
            isDeleting={deleteProductMutation.isPending}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
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
            productId={editingProduct?._id}
            isSubmitting={isSaving}
            submitLabel={editingProduct ? "Save Changes" : "Create Product"}
            onCancel={handleCloseForm}
            onSubmit={handleSubmitProduct}
          />
        </Dialog>
        <ConfirmDialog
          open={Boolean(deletingProduct)}
          title="Delete Product"
          description={`Are you sure you want to delete ${
            deletingProduct?.name ?? "this product"
          }?`}
          confirmLabel="Delete"
          isLoading={deleteProductMutation.isPending}
          onCancel={handleCloseDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      </Box>
    </ProductWrapper>
  );
};

export default Products;
