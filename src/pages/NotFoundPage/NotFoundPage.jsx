import { Text } from "@radix-ui/themes";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.notFoundContainer}>
      <Text as="p" size="4">
        404 | Sorry, page not found
      </Text>
    </div>
  );
}
