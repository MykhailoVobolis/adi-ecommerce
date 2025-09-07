export const transformCartData = (cart) => {
  const { products, totalQuantityProducts, totalPrice } = cart;

  const transformedProducts = products.map((product) => ({
    _id: product.productId,
    productName: product.productName,
    category: product.category,
    type: product.type,
    price: product.price,
    color: product.color,
    size: product.size,
    quantity: product.quantity,
    colorName: product.colorName,
    image: product.image,
  }));

  return {
    products: transformedProducts,
    totalPrice,
    totalQuantityProducts,
  };
};
