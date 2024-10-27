import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Heading, Text } from "@radix-ui/themes";

import css from "./ProductAccordion.module.css";

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className={css.AccordionHeader}>
    <Accordion.Trigger className={classNames(css.AccordionTrigger, className)} {...props} ref={forwardedRef}>
      {children}
      <ChevronDownIcon className={css.AccordionChevron} aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content className={classNames(css.AccordionContent, className)} {...props} ref={forwardedRef}>
    <div className={css.AccordionContentText}>{children}</div>
  </Accordion.Content>
));

AccordionContent.displayName = "AccordionContent";

export default function ProductAccordion({ product }) {
  const {
    description: {
      main: { title: mainTitle, text: mainText },
    },
    details,
  } = product;

  return (
    <Accordion.Root className={css.AccordionRoot} type="single" defaultValue={"item-1"} collapsible="true">
      <Accordion.Item className={css.AccordionItem} value="item-1">
        <AccordionTrigger>Description</AccordionTrigger>
        <AccordionContent>
          <Heading as="h2" size="6" mb="4" weight="bold" style={{ textTransform: "uppercase" }}>
            {mainTitle}
          </Heading>
          <Text as="p" size="3" weight="regular">
            {mainText}
          </Text>
        </AccordionContent>
      </Accordion.Item>

      <Accordion.Item className={css.AccordionItem} value="item-2">
        <AccordionTrigger>Details</AccordionTrigger>
        <AccordionContent>
          <Text tas="p" size="3" weight="regular">
            {details}
          </Text>
        </AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  );
}
