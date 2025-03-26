import { useEffect } from "react";
import { siteConfig } from "../config/site";

export const SEO = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", description || siteConfig.description);
    }

    const metaKeywords = document.querySelector("meta[name='keywords']");
    if (metaKeywords) {
      metaKeywords.setAttribute("content",
        keywords ? keywords.join(", ") : siteConfig.keywords.join(", ")
      );
    }
  }, [title, description, keywords]);

  return null;
};