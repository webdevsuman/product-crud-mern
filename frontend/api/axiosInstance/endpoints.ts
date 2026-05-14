const productsURL = "/api/products";

export const endpoints = {
  product: {
    getAll: productsURL,
    create: productsURL,
    details: (id: string) => `${productsURL}/${id}`,
    update: (id: string) => `${productsURL}/${id}`,
    delete: (id: string) => `${productsURL}/${id}`,
  },
};
