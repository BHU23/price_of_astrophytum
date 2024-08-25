"use client";
import { HiChevronRight } from "react-icons/hi";

interface BreadcrumbProps {
  links: { href: string; label: string }[];
//   current: string;
}

export default function Breadcrumb({ links }: BreadcrumbProps) {
  return (
    <nav
      className="w-full h-16 flex justify-start items-center gap-4 rounded-t-lg  border border-border p-5"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <a
            href={"/"}
            className="inline-flex items-center text-sm font-medium text-cta hover:text-cta-text"
          >
            <svg
              className="w-3 h-3 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            {"Home"}
          </a>
        </li>
        <HiChevronRight className="rtl:rotate-180 w-5 h-5 text-cta mx-1" />
        {links.map((link, index) => (
          <li key={index} className="inline-flex items-center">
            {index < links.length - 1 ? (
              <a
                href={link.href}
                className="inline-flex items-center text-sm font-medium text-cta hover:text-cta-text"
              >
                {link.label}
              </a>
            ) : (
              <div className="flex items-center">
                <span className="inline-flex items-center text-sm font-medium text-cta">
                  {link.label}
                </span>
              </div>
            )}
            {index < links.length - 1 && (
              <HiChevronRight className="rtl:rotate-180 w-5 h-5 text-cta  mx-1" />
            )}
          </li>
        ))}
        <li aria-current="page"></li>
      </ol>
    </nav>
  );
}
