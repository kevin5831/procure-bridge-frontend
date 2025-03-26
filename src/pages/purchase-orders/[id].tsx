
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PurchaseOrder, PurchaseOrderItem } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default function PurchaseOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: purchaseOrder, isLoading } = useQuery({
    queryKey: ['purchase-order', id],
    queryFn: async () => {
      // Fetch the purchase order
      const { data: po, error: poError } = await supabase
        .from('purchase_orders')
        .select('*')
        .eq('id', id)
        .single();
      
      if (poError) throw poError;
      
      // Fetch the purchase order items
      const { data: items, error: itemsError } = await supabase
        .from('purchase_order_items')
        .select('*')
        .eq('po_id', id);
      
      if (itemsError) throw itemsError;
      
      // Combine the purchase order with its items
      return {
        ...po,
        items: items || []
      } as PurchaseOrder;
    }
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading purchase order details...</div>;
  }

  if (!purchaseOrder) {
    return <div className="p-8 text-center">Purchase order not found</div>;
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      DRAFT: { class: "bg-gray-500", label: "Draft" },
      SUBMITTED: { class: "bg-blue-500", label: "Submitted" },
      APPROVED: { class: "bg-green-500", label: "Approved" },
      REJECTED: { class: "bg-red-500", label: "Rejected" }
    };
  
    const config = statusConfig[status] || { class: "bg-gray-500", label: status };
    return (
      <Badge className={config.class}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/purchase-orders")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Purchase Orders
      </Button>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Purchase Order Details</h1>
          <p className="text-muted-foreground">
            Purchase Order #{purchaseOrder.po_number}
          </p>
        </div>
        <div>{getStatusBadge(purchaseOrder.status)}</div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-600">Supplier</h3>
                  <p className="mt-1">{purchaseOrder.supplier_name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-600">Order Date</h3>
                  <p className="mt-1">{formatDate(purchaseOrder.po_date)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-600">Total Amount</h3>
                  <p className="mt-1">${purchaseOrder.total_amount.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-600">Payment Terms</h3>
                  <p className="mt-1">{purchaseOrder.payment_terms || "Standard 30 days"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-600">Delivery Address</h3>
                  <p className="mt-1">{purchaseOrder.delivery_address || "Company main address"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-600">Created By</h3>
                  <p className="mt-1">{purchaseOrder.created_by_name || "System Admin"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              {purchaseOrder.items && purchaseOrder.items.length > 0 ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Item</th>
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Quantity</th>
                      <th className="text-right py-2">Unit Price</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrder.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{item.name}</td>
                        <td className="py-2">{item.description}</td>
                        <td className="py-2 text-right">{item.quantity}</td>
                        <td className="py-2 text-right">${item.unit_price.toFixed(2)}</td>
                        <td className="py-2 text-right">${(item.quantity * item.unit_price).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} className="text-right font-bold py-2">Total:</td>
                      <td className="text-right font-bold py-2">${purchaseOrder.total_amount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>No items found for this purchase order.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No documents available for this purchase order.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
