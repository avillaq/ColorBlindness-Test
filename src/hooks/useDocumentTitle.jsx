import { useEffect } from "react";
import { siteConfig } from "../config/site";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};