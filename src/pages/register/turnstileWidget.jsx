import React, { useEffect } from "react";

const sitekey = import.meta.env.VITE_SITE_KEY;

const TurnstileWidget = ({ pageName }) => {
  if (pageName) {
    console.log("Called Cloudflare");
    useEffect(() => {
      const turnstileElement = document.getElementById("cf-turnstile");
      if (turnstileElement) {
        window.turnstile.render(turnstileElement, {
          sitekey,
        });
      }
    }, []);

    return <div id="cf-turnstile"></div>;
  }
};

export default TurnstileWidget;
