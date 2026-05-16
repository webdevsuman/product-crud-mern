"use client";

import AddIcon from "@mui/icons-material/Add";
import { Button, Paper, Typography } from "@mui/material";

interface ProductEmptyStateProps {
  onAdd: () => void;
}

const ProductEmptyState = ({ onAdd }: ProductEmptyStateProps) => {
  return (
    <Paper className="product-empty-panel">
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        No products yet
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Add your first product to start managing inventory.
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
        sx={{ mt: 2 }}
      >
        Add Product
      </Button>
    </Paper>
  );
};

export default ProductEmptyState;
