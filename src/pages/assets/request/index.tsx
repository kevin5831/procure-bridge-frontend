
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList, ArrowRight, Filter } from "lucide-react";
import { HorizontalAssetsTabs } from "@/components/assets/HorizontalAssetsTabs";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";

export default function AssetsRequest() {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  // Mock request types for the categories
  const assetCategories = [
    { value: "it", label: "IT Equipment" },
    { value: "furniture", label: "Furniture" },
    { value: "vehicle", label: "Vehicles" },
    { value: "office", label: "Office Equipment" },
  ];

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const departmentOptions = [
    { value: "it", label: "IT" },
    { value: "finance", label: "Finance" },
    { value: "hr", label: "Human Resources" },
  ];

  // Updated navigation handler to use the correct route
  const handleCreateRequest = () => {
    navigate("/requests/create");
  };

  return (
    <main className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">Asset Requests</h1>
          <p className="text-muted-foreground">Manage and track asset request workflows</p>
        </div>
        <Button 
          onClick={handleCreateRequest}
          className="premium-button flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Request
        </Button>
      </div>

      <HorizontalAssetsTabs />

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="premium-card md:col-span-1 p-5">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block text-gray-700">
                Asset Category
              </label>
              <Combobox 
                options={assetCategories}
                value={categoryFilter}
                onChange={setCategoryFilter}
                placeholder="All categories"
                searchPlaceholder="Search categories..."
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block text-gray-700">
                Status
              </label>
              <Combobox 
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="All statuses"
                searchPlaceholder="Search statuses..."
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block text-gray-700">
                Department
              </label>
              <Combobox 
                options={departmentOptions}
                value={departmentFilter}
                onChange={setDepartmentFilter}
                placeholder="All departments"
                searchPlaceholder="Search departments..."
              />
            </div>
            
            <Button className="w-full mt-2" variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </Card>
        
        <div className="md:col-span-2 space-y-5">
          <Card className="premium-card overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="font-medium">Quick Actions</h3>
            </div>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x">
                {[
                  { 
                    title: "Request IT Equipment", 
                    description: "Laptops, monitors, peripherals and more",
                    icon: "💻"
                  },
                  { 
                    title: "Request Office Furniture", 
                    description: "Desks, chairs, storage solutions",
                    icon: "🪑"
                  },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="p-5 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition-colors group"
                    onClick={handleCreateRequest}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-primary group-hover:text-primary/80 transition-colors">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="premium-card">
            <div className="p-5 flex justify-between items-center border-b">
              <h3 className="font-medium">Recent Asset Requests</h3>
              <Button variant="ghost" size="sm" className="text-primary">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-5">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <ClipboardList className="h-16 w-16 text-muted mb-4" />
                <h3 className="text-lg font-medium mb-2">No recent requests</h3>
                <p className="text-muted-foreground mb-6 max-w-lg">
                  Start by creating your first asset request to track and manage all requests in one place
                </p>
                <Button 
                  onClick={handleCreateRequest}
                  className="premium-button"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
