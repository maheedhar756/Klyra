"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useCart() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const loadCart = async () => {
      if (session?.user) {
        try {
          const response = await fetch("/api/cart");
          const data = await response.json();
          setItems(data.items);
        } catch (error) {
          console.error("Error loading cart:", error);
        }
      } else {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          setItems(JSON.parse(storedCart));
        }
      }
      setLoading(false);
    };

    loadCart();
  }, [session]);

  const addItem = async (product: any, quantity: number = 1) => {
    const newItem = { ...product, quantity };

    if (session?.user) {
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    }
  };

  const removeItem = async (productId: string) => {
    if (session?.user) {
      try {
        await fetch(`/api/cart/${productId}`, { method: "DELETE" });
        setItems(items.filter(item => item.id !== productId));
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      const updatedItems = items.filter(item => item.id !== productId);
      setItems(updatedItems);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    if (session?.user) {
      try {
        const response = await fetch(`/api/cart/${productId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        });
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    } else {
      const updatedItems = items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      setItems(updatedItems);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    }
  };

  const clearCart = async () => {
    if (session?.user) {
      try {
        await fetch("/api/cart", { method: "DELETE" });
        setItems([]);
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    } else {
      setItems([]);
      localStorage.removeItem("cart");
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    items,
    loading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
  };
}
