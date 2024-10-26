import { Suspense } from "react";
import AppBar from "../AppBar/AppBar.jsx";

import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={css.pageContainer}>
      <AppBar />
      <main className={css.mainContainer}>
        <Suspense fallback={<div></div>}>{children}</Suspense>
      </main>
    </div>
  );
}
