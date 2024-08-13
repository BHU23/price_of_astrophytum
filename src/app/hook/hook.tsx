"use client";

const generateBreadcrumbLinks = (path: string) => {
  const segments = path.split("/").filter((segment) => segment);

  const links = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    return { href, label: segment };
  });

  return [...links];
};

export default generateBreadcrumbLinks;
