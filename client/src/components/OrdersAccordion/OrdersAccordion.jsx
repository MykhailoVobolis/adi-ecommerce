import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Flex, Text } from '@radix-ui/themes';
import { formatDate } from '../../utils/formatDate.js';

import OrderProductsTable from '../OrderProductsTable/OrderProductsTable.jsx';
import OrderProductsPreview from '../OrderProductsPreview/OrderProductsPreview.jsx';

import css from './OrdersAccordion.module.css';

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className={css.AccordionHeader}>
    <Accordion.Trigger className={classNames(css.AccordionTrigger, className)} {...props} ref={forwardedRef}>
      {children}
      <ChevronDownIcon className={css.AccordionChevron} aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content className={classNames(css.AccordionContent, className)} {...props} ref={forwardedRef}>
    <div className={css.AccordionContentText}>{children}</div>
  </Accordion.Content>
));
AccordionContent.displayName = 'AccordionContent';

export default function OrdersAccordion({ orders }) {
  return (
    <Accordion.Root className={css.AccordionRoot} type="multiple">
      {orders.map((order, index) => {
        const orderDate = formatDate(order.createdAt);

        return (
          <Accordion.Item key={order._id} className={css.AccordionItem} value={`item-${index}`}>
            <AccordionTrigger>
              <Flex align="center" style={{ width: '100%' }}>
                <Flex direction="column" style={{ width: '300px' }} gap="1">
                  <Text as="span" size="4" weight="bold">
                    ORDER ID: {order._id.slice(-10)}
                  </Text>
                  <Text as="span" size="3">
                    Date: {orderDate}
                  </Text>
                </Flex>
                <div className={css.productsPreviewWrapper}>
                  <OrderProductsPreview products={order.products} />
                </div>
              </Flex>
            </AccordionTrigger>
            <AccordionContent>
              <Text className={css.title} as="p" size="4" mb="3" weight="bold">
                Delivery address
              </Text>
              <Text as="p" mb="1" weight="bold">
                {order.contact.firstName} {order.contact.lastName}
              </Text>
              <Text as="p" mb="1">
                {order.delivery.address}
              </Text>
              <Text as="p" mb="5">
                {order.contact.phone}
              </Text>
              <Text className={css.title} as="p" size="4" mb="3" weight="bold">
                Products
              </Text>
              <OrderProductsTable
                products={order.products}
                deliveryCost={order.delivery.cost}
                totalPrice={order.totalPrice}
                paymentMethod={order.paymentMethod}
              />
            </AccordionContent>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
