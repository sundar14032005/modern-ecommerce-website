import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav aria-label="breadcrumb" className="py-2 mb-3">
      <ol className="breadcrumb mb-0 align-items-center small">
        <li className="breadcrumb-item">
          <Link
            to="/"
            className="text-decoration-none text-body-secondary d-flex align-items-center gap-1"
          >
            <Home size={14} />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={index}
              className={`breadcrumb-item d-flex align-items-center gap-1 ${isLast ? "active text-primary fw-semibold" : ""}`}
            >
              <ChevronRight
                size={12}
                className="text-secondary opacity-50 me-1"
              />
              {isLast || !item.link ? (
                <span>{item.label}</span>
              ) : (
                <Link
                  to={item.link}
                  className="text-decoration-none text-body-secondary"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
