// Utility functions for class names
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Price formatting
export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// Date formatting
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Truncate text
export function truncateText(text: string, length: number) {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

// Generate slug
export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Sort products
export function sortProducts(products: any[], sortBy: string) {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
}

// Filter products
export function filterProducts(products: any[], filters: any) {
  return products.filter((product) => {
    let matches = true;

    if (filters.category && filters.category !== "all") {
      matches = matches && product.category === filters.category;
    }

    if (filters.minPrice !== undefined) {
      matches = matches && product.price >= filters.minPrice;
    }

    if (filters.maxPrice !== undefined) {
      matches = matches && product.price <= filters.maxPrice;
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      matches =
        matches &&
        (product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower));
    }

    return matches;
  });
}

// Random string generator
export function generateRandomString(length: number) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}