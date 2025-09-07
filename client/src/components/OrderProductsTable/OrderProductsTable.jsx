import { Box, Text } from '@radix-ui/themes';
import css from './OrderProductsTable.module.css';

export default function OrderProductsTable({ products, deliveryCost, totalPrice, paymentMethod }) {
  const totalWithDelivery = (totalPrice + deliveryCost).toFixed(2);

  return (
    <Box className={css.ProductsTableWrapper}>
      <table className={css.ProductsTable}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={`${product.productId}-${product.color}`}>
              <td>
                <img
                  className={css.productImage}
                  src={product.image?.src}
                  alt={product.image?.alt || product.productName}
                />
              </td>
              <td>{product.productName}</td>
              <td>{product.size}</td>
              <td>{product.quantity}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>${(product.price * product.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <Text>Payment:</Text>
            </td>
            <td>{paymentMethod}</td>
          </tr>
          <tr>
            <td colSpan={5}>
              <Text>Delivery:</Text>
            </td>
            <td>${deliveryCost.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={5}>
              <Text as="p" weight="bold" size="3">
                Total:
              </Text>
            </td>
            <td>
              <Text weight="bold" size="3">
                ${totalWithDelivery}
              </Text>
            </td>
          </tr>
        </tfoot>
      </table>
    </Box>
  );
}
