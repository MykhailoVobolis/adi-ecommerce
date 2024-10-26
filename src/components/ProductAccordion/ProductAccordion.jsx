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

export default function ProductAccordion() {
  return (
    <Accordion.Root className={css.AccordionRoot} type="single" defaultValue={"item-1"} collapsible="true">
      <Accordion.Item className={css.AccordionItem} value="item-1">
        <AccordionTrigger>Description</AccordionTrigger>
        <AccordionContent>
          <Heading as="h2" size="6" mb="4" style={{ textTransform: "uppercase" }}>
            Casual shoes with a sporty back story
          </Heading>
          <Text as="p" size="3" weight="regular">
            Rediscover a legend from the archives. The adidas SL 72 shoes were originally released in 1972 to give
            runners an edge on the track. Decades later, their design still turns heads. This version features a nylon
            upper with suede overlays that provides retro style. Your feet stay cushioned thanks to an EVA midsole while
            a grippy outsole keeps you grounded.
          </Text>
        </AccordionContent>
      </Accordion.Item>

      <Accordion.Item className={css.AccordionItem} value="item-2">
        <AccordionTrigger>Details</AccordionTrigger>
        <AccordionContent>
          The upper is made of nylon with suede inserts for durability and a stylish look, while the synthetic lining
          ensures comfort and wear resistance. The EVA midsole provides lightweight cushioning, and the standard fit
          suits different foot types. The grippy, rugged rubber outsole offers excellent traction, and the laces allow
          for secure fastening. This model is available in Cloud White / Core Black / Spark, model code - IH4823.
        </AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  );
}
