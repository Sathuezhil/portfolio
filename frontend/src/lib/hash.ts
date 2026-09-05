import type { MouseEvent } from "react";

export function goToHash(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute("href");

  if (!href?.startsWith("#")) {
    return;
  }

  event.preventDefault();
  const id = href.slice(1);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", href);
}
