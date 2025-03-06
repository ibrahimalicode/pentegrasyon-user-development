import { useEffect, useState } from "react";

export function getTheme() {
  const theme = localStorage.getItem("THEME") || "light";
  document.body.setAttribute("class", theme);
  return theme;
}

export function setTheme(theme) {
  localStorage.setItem("THEME", theme);
  window.dispatchEvent(new Event("storage"));
  document.body.setAttribute("class", theme);
}
