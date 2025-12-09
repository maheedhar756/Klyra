"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, Package, User, MapPin } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

// Mock orders for now
const MOCK_ORDERS = [
  {
    id: "ord_123456",
    date: "2025-06-15",
    total: 129.99,
    status: "Delivered",
    items: [
      { name: "Silk Blouse", quantity: 1 },
      { name: "Leather Belt", quantity: 1 },
    ],
  },
  {
    id: "ord_789012",
    date: "2025-05-20",
    total: 89.5,
    status: "Processing",
    items: [{ name: "Denim Jeans", quantity: 1 }],
  },
];

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-gray-500">
            Welcome back, {session.user?.name || "User"}
          </p>
        </div>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
          Sign Out
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar / Profile Info */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p>{session.user?.name || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{session.user?.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Default Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 italic text-sm">
                No default address saved.
              </p>
              <Button variant="link" className="px-0 mt-2">
                Add Address
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content / Orders */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order History
              </CardTitle>
              <CardDescription>
                View and track your recent orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                      <div>
                        <p className="font-semibold text-sm">
                          Order #{order.id}
                        </p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(order.total)}</p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      {order.items.map((item, idx) => (
                        <span key={idx}>
                          {item.quantity}x {item.name}
                          {idx < order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href="/shop">
                  <Button variant="outline">Start Shopping</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
