import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Save, X, Eye, Edit2, Trash2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PurchaseRequest {
  id: string;
  requestNumber: string;
  requestedBy: string;
  department: string;
  category: string;
  itemDescription: string;
  quantity: number;
  estimatedCost: number;
  priority: "low" | "medium" | "high" | "urgent";
  status: "draft" | "pending" | "approved" | "rejected" | "ordered";
  requestDate: string;
  requiredDate: string;
  justification: string;
}

export function PurchaseRequestForm() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<PurchaseRequest[]>([
    {
      id: "1",
      requestNumber: "PR-2024-001",
      requestedBy: "John Doe",
      department: "IT Department",
      category: "Office Equipment",
      itemDescription: "Dell Laptops for new employees",
      quantity: 5,
      estimatedCost: 75000,
      priority: "high",
      status: "pending",
      requestDate: "2024-10-20",
      requiredDate: "2024-11-15",
      justification: "New employees joining next month require laptops for daily operations",
    },
    {
      id: "2",
      requestNumber: "PR-2024-002",
      requestedBy: "Jane Smith",
      department: "Finance",
      category: "Office Furniture",
      itemDescription: "Executive chairs for meeting room",
      quantity: 8,
      estimatedCost: 24000,
      priority: "medium",
      status: "approved",
      requestDate: "2024-10-18",
      requiredDate: "2024-11-01",
      justification: "Current chairs are damaged and affecting meeting comfort",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    requestedBy: "",
    department: "",
    category: "",
    itemDescription: "",
    quantity: 1,
    estimatedCost: 0,
    priority: "medium" as "low" | "medium" | "high" | "urgent",
    requiredDate: "",
    justification: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest: PurchaseRequest = {
      id: Date.now().toString(),
      requestNumber: `PR-2024-${String(requests.length + 1).padStart(3, '0')}`,
      ...formData,
      status: "draft",
      requestDate: new Date().toISOString().split('T')[0],
    };

    setRequests([...requests, newRequest]);
    setFormData({
      requestedBy: "",
      department: "",
      category: "",
      itemDescription: "",
      quantity: 1,
      estimatedCost: 0,
      priority: "medium" as "low" | "medium" | "high" | "urgent",
      requiredDate: "",
      justification: "",
    });
    setIsFormOpen(false);
    
    toast({
      title: "Purchase request created",
      description: `Request ${newRequest.requestNumber} has been created successfully.`,
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved": return "default";
      case "pending": return "secondary";
      case "rejected": return "destructive";
      case "ordered": return "outline";
      default: return "secondary";
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "secondary";
      case "medium": return "outline";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Purchase Requests</h1>
          <p className="text-muted-foreground">
            Manage property purchase requests and approvals
          </p>
        </div>
        <Button 
          variant="hero" 
          onClick={() => setIsFormOpen(true)}
          className="shadow-glow"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      {/* Request Form */}
      {isFormOpen && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Create Purchase Request
            </CardTitle>
            <CardDescription>
              Submit a new request for property or equipment procurement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="requestedBy">Requested By *</Label>
                  <Input
                    id="requestedBy"
                    value={formData.requestedBy}
                    onChange={(e) => setFormData({ ...formData, requestedBy: e.target.value })}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select 
                    value={formData.department} 
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT Department">IT Department</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                      <SelectItem value="Property Admin">Property Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Property Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Office Equipment">Office Equipment (ECX-1)</SelectItem>
                      <SelectItem value="Office Furniture">Office Furniture (ECX-2)</SelectItem>
                      <SelectItem value="Warehouse Equipment">Warehouse Equipment (ECX-3)</SelectItem>
                      <SelectItem value="Safety Equipment">Safety Equipment (ECX-4)</SelectItem>
                      <SelectItem value="Laboratory Equipment">Laboratory Equipment (ECX-5)</SelectItem>
                      <SelectItem value="Vehicles and Machineries">Vehicles & Machineries (ECX-6)</SelectItem>
                      <SelectItem value="Buildings">Buildings (ECX-7)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value: "low" | "medium" | "high" | "urgent") => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="itemDescription">Item Description *</Label>
                <Input
                  id="itemDescription"
                  value={formData.itemDescription}
                  onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
                  placeholder="Detailed description of the requested items"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    min="1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedCost">Estimated Cost (ETB) *</Label>
                  <Input
                    id="estimatedCost"
                    type="number"
                    value={formData.estimatedCost}
                    onChange={(e) => setFormData({ ...formData, estimatedCost: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requiredDate">Required Date *</Label>
                  <Input
                    id="requiredDate"
                    type="date"
                    value={formData.requiredDate}
                    onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="justification">Business Justification *</Label>
                <Textarea
                  id="justification"
                  value={formData.justification}
                  onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                  placeholder="Explain why this purchase is necessary for business operations..."
                  rows={3}
                  required
                />
              </div>

              <div className="flex space-x-3">
                <Button type="submit" variant="success">
                  <Save className="mr-2 h-4 w-4" />
                  Submit Request
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsFormOpen(false)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Requests Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Purchase Requests</CardTitle>
          <CardDescription>
            Track and manage all property purchase requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request #</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Est. Cost</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-mono text-primary">
                    {request.requestNumber}
                  </TableCell>
                  <TableCell>{request.requestedBy}</TableCell>
                  <TableCell>{request.department}</TableCell>
                  <TableCell>{request.category}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {request.itemDescription}
                  </TableCell>
                  <TableCell>{request.quantity}</TableCell>
                  <TableCell>{request.estimatedCost.toLocaleString()} ETB</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(request.priority)}>
                      {request.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-danger hover:text-danger">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}