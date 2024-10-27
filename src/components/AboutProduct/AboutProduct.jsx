import { Section } from "@radix-ui/themes";
import css from "./AboutProduct.module.css";
import AboutItem from "../AboutItem/AboutItem.jsx";

export default function AboutProduct({ product }) {
  const {
    description: {
      additional1: { title: additionalTitle1, text: additionalText1 },
      additional2: { title: additionalTitle2, text: additionalText2 },
    },
    images: { general: generalImages },
  } = product;

  return (
    <Section className={css.container}>
      <AboutItem title={additionalTitle1} description={additionalText1} image={generalImages[0]} reverse={false} />
      <AboutItem title={additionalTitle2} description={additionalText2} image={generalImages[1]} reverse={true} />
    </Section>
  );
}
