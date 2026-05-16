"use client";

import { styled } from "@mui/material/styles";

const ProductWrapper = styled("main")(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  padding: "24px 32px",

  "& .product-inner": {
    width: "100%",
    maxWidth: 1152,
    margin: "0 auto",
  },

  "& .product-header": {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "20px",
  },

  "& .product-stats": {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "12px",
  },

  "& .product-loading-panel": {
    minHeight: 224,
    padding: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  "& .product-empty-panel": {
    padding: "32px 24px",
  },

  "& .product-table": {
    minWidth: 860,
  },

  "& .product-table .MuiTableCell-head": {
    fontWeight: 600,
    fontSize: "0.95rem",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${theme.palette.divider}`,
    paddingTop: "16px",
    paddingBottom: "16px",
  },

  "@media (max-width: 600px)": {
    padding: "16px",

    "& .product-inner": {
      maxWidth: "100%",
    },

    "& .product-header": {
      alignItems: "stretch",
      flexDirection: "column",
    },

    "& .product-header .MuiButton-root": {
      width: "100%",
    },

    "& .product-table-paper": {
      boxShadow: "none",
      background: "transparent",
    },

    "& .product-table-paper .MuiTableContainer-root": {
      overflow: "visible",
    },

    "& .product-table": {
      minWidth: 0,
      display: "block",
    },

    "& .product-table .MuiTableHead-root": {
      display: "none",
    },

    "& .product-table .MuiTableBody-root": {
      display: "grid",
      gap: "12px",
    },

    "& .product-table .MuiTableRow-root": {
      display: "grid",
      gap: "8px",
      padding: "16px",
      borderRadius: "4px",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
    },

    "& .product-table .MuiTableCell-root": {
      display: "grid",
      gridTemplateColumns: "104px minmax(0, 1fr)",
      alignItems: "center",
      gap: "12px",
      padding: 0,
      borderBottom: 0,
      textAlign: "left",
      wordBreak: "break-word",
    },

    "& .product-table .MuiTableCell-root::before": {
      content: "attr(data-label)",
      color: theme.palette.text.secondary,
      fontSize: "0.75rem",
      fontWeight: 600,
      textTransform: "uppercase",
    },

    "& .product-table .MuiTableBody-root .MuiTableCell-root:last-child": {
      display: "flex",
      justifyContent: "flex-end",
      gap: "4px",
      paddingTop: "8px",
      borderTop: `1px solid ${theme.palette.divider}`,
    },

    "& .product-table .MuiTableBody-root .MuiTableCell-root:last-child::before":
      {
        content: "none",
      },
  },
}));

export default ProductWrapper;
