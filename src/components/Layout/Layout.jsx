import { Suspense } from "react";
import { Box } from "@radix-ui/themes";
import AppBar from "../AppBar/AppBar.jsx";
import Footer from "../Footer/Footer.jsx";

import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <Box className={css.pageContainer}>
      <AppBar />
      <Box as="main" className={css.mainContainer}>
        <Suspense fallback={<div></div>}>{children}</Suspense>
      </Box>
      <Footer />
    </Box>
  );
}
