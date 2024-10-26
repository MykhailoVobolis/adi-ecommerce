import { Section } from "@radix-ui/themes";
import css from "./AboutProduct.module.css";
import AboutItem from "../AboutItem/AboutItem.jsx";

export default function AboutProduct() {
  const imagesArray = [
    { src: "/src/assets/img/adidas10.avif", alt: "Product Image 10" },
    { src: "/src/assets/img/adidas11.avif", alt: "Product Image 11" },
  ];

  return (
    <Section className={css.container}>
      <AboutItem
        title={"Classic Casual Style with a Retro Twist"}
        description={
          "The adidas SL 72 adds a touch of retro charm to any outfit, combining iconic design with casual versatility. It is perfect for creating a laid-back yet distinctive look that stands out every day."
        }
        image={imagesArray[0]}
        reverse={false}
      />
      <AboutItem
        title={"Effortless Style, Timeless Appeal"}
        description={
          "An easygoing, classic look that effortlessly elevates everyday wear. With its timeless design, these sneakers add just the right touch of retro-inspired charm to any casual ensemble."
        }
        image={imagesArray[1]}
        reverse={true}
      />
    </Section>
  );
}
