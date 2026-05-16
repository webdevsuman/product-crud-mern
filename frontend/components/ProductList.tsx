"use client";

import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import type { Product } from "@/typescript/product.types";

interface ProductListProps {
  products: Product[];
  isDeleting: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const ProductList = ({
  products,
  isDeleting,
  onEdit,
  onDelete,
}: ProductListProps) => {
  return (
    <Paper className="product-table-paper">
      <TableContainer>
        <Table className="product-table" aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product._id} hover>
                <TableCell data-label="#">{index + 1}</TableCell>
                <TableCell data-label="Product">
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {product.description || "No description"}
                  </Typography>
                </TableCell>
                <TableCell data-label="Category">
                  <Chip
                    label={product.category || "Other"}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell data-label="Price" align="right">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell data-label="Stock">
                  <Chip
                    label={product.inStock ? "In stock" : "Out of stock"}
                    color={product.inStock ? "success" : "default"}
                    size="small"
                    variant={product.inStock ? "filled" : "outlined"}
                  />
                </TableCell>
                <TableCell data-label="Created">
                  {new Date(product.createdAt).toLocaleDateString("en-IN")}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label={`Edit ${product.name}`}
                      color="primary"
                      size="small"
                      onClick={() => onEdit(product)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label={`Delete ${product.name}`}
                      color="error"
                      size="small"
                      disabled={isDeleting}
                      onClick={() => onDelete(product)}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductList;
