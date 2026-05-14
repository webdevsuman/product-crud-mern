"use client";

import React from "react";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useProducts } from "@/react-query/hooks/useProducts";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const Products = () => {
  const { data, isLoading, isError, error } = useProducts();
  const products = data?.data ?? [];

  return (
    <Box component="main" className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <Box className="mx-auto w-full max-w-6xl">
        <Box className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Products
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.total ?? 0} products in inventory
            </Typography>
          </Box>
        </Box>

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
            <Table sx={{ minWidth: 760 }} aria-label="products table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default Products;
