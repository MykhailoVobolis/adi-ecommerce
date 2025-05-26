import css from "./CounterBadge.module.css";

export default function CounterBadge({ count }) {
  return <span className={css.counterBadge}>{count}</span>;
}
