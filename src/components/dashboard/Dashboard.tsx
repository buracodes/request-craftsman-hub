import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "./StatsCard";
import { Button } from "@/components/ui/button";
import { Plus, Package, ShoppingCart, ClipboardCheck, AlertTriangle, TrendingUp, Building, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Dashboard() {
  const stats = [
    {
      title: "Total Properties",
      value: "2,847",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: Package,
    },
    {
      title: "Pending Requests",
      value: "24",
      change: "3 urgent",
      changeType: "negative" as const,
      icon: ShoppingCart,
    },
    {
      title: "Properties Issued",
      value: "156",
      change: "+8% this week",
      changeType: "positive" as const,
      icon: ClipboardCheck,
    },
    {
      title: "Low Stock Items",
      value: "18",
      change: "Requires attention",
      changeType: "negative" as const,
      icon: AlertTriangle,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "Property Request",
      description: "Office furniture request for Branch 5",
      user: "John Doe",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "Property Issue",
      description: "Laptop issued to IT Department",
      user: "Jane Smith",
      time: "4 hours ago",
      status: "completed",
    },
    {
      id: 3,
      type: "Inspection",
      description: "Monthly equipment inspection completed",
      user: "Mike Johnson",
      time: "1 day ago",
      status: "completed",
    },
    {
      id: 4,
      type: "Property Return",
      description: "Vehicle returned from Field Office",
      user: "Sarah Wilson",
      time: "2 days ago",
      status: "processing",
    },
  ];

  const propertyCategories = [
    { name: "Office Equipment", count: 1247, code: "ECX-1" },
    { name: "Office Furniture", count: 856, code: "ECX-2" },
    { name: "Warehouse Equipment", count: 342, code: "ECX-3" },
    { name: "Safety Equipment", count: 189, code: "ECX-4" },
    { name: "Laboratory Equipment", count: 156, code: "ECX-5" },
    { name: "Vehicles & Machinery", count: 57, code: "ECX-6" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Property Management Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage ECX property assets efficiently
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <TrendingUp className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <Button variant="hero">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Property Categories */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Property Categories
            </CardTitle>
            <CardDescription>
              Distribution of properties by ECX classification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {propertyCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
                    <div>
                      <p className="font-medium text-foreground">{category.name}</p>
                      <p className="text-sm text-muted-foreground">Code: {category.code}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {category.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest property management activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="border-l-4 border-primary/20 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm text-foreground">{activity.type}</p>
                    <Badge 
                      variant={
                        activity.status === "completed" ? "default" : 
                        activity.status === "pending" ? "secondary" : 
                        "outline"
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used property management functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <ShoppingCart className="h-6 w-6" />
              <span>New Purchase Request</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Package className="h-6 w-6" />
              <span>Register Property</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <ClipboardCheck className="h-6 w-6" />
              <span>Property Inspection</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}