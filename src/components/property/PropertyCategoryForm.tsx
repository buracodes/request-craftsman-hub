import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PropertyCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  type: "fixed" | "consumable";
  parentId?: string;
}

export function PropertyCategoryForm() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<PropertyCategory[]>([
    {
      id: "1",
      name: "Office Equipment",
      code: "ECX-1",
      description: "Equipment for office use including computers, photocopiers, printers, calculators, fax machines, scanners, telephone apparatus, etc.",
      type: "fixed",
    },
    {
      id: "2",
      name: "Office Furniture",
      code: "ECX-2",
      description: "Furniture such as tables, chairs, guest chairs, cabinet, cubicles, swivel chairs, managerial tables, shelves, etc.",
      type: "fixed",
    },
    {
      id: "3",
      name: "Warehouse Equipment",
      code: "ECX-3",
      description: "All Equipment specific to warehouse operation including Ground scales, weigh bridges, wheel burrows, etc.",
      type: "fixed",
    },
    {
      id: "4",
      name: "Safety Equipment",
      code: "ECX-4",
      description: "Fire extinguishers and related. Include Roaster, grinder, stove, heaters, refrigerators.",
      type: "fixed",
    },
    {
      id: "5",
      name: "Laboratory Equipment",
      code: "ECX-5",
      description: "Moisture tester, Boehner divider, gas cylinder draftsman chairs, coffee capping tables, digital scale spittoon, coffee beam mixer, etc.",
      type: "fixed",
    },
    {
      id: "6",
      name: "Vehicles and Machineries",
      code: "ECX-6",
      description: "Motor vehicles, motorcycles, Generators, bicycles, etc.",
      type: "fixed",
    },
    {
      id: "7",
      name: "Buildings",
      code: "ECX-7",
      description: "Purchase or construction of buildings for use of offices, warehouses or stores, etc.",
      type: "fixed",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    type: "fixed" as "fixed" | "consumable",
    parentId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCategory: PropertyCategory = {
      id: Date.now().toString(),
      ...formData,
      parentId: formData.parentId || undefined,
    };

    setCategories([...categories, newCategory]);
    setFormData({ name: "", code: "", description: "", type: "fixed", parentId: "" });
    setIsFormOpen(false);
    
    toast({
      title: "Category created",
      description: "Property category has been successfully created.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Property Categories</h1>
          <p className="text-muted-foreground">
            Manage ECX property classification system
          </p>
        </div>
        <Button 
          variant="hero" 
          onClick={() => setIsFormOpen(true)}
          className="shadow-glow"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Category Form */}
      {isFormOpen && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Create New Property Category</CardTitle>
            <CardDescription>
              Define a new category for ECX property classification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Office Equipment"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="code">Category Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g., ECX-1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Asset Type *</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value: "fixed" | "consumable") => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Asset</SelectItem>
                      <SelectItem value="consumable">Consumable Item</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parent">Parent Category</Label>
                  <Select 
                    value={formData.parentId} 
                    onValueChange={(value) => setFormData({ ...formData, parentId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the category and what types of assets it includes..."
                  rows={3}
                  required
                />
              </div>

              <div className="flex space-x-3">
                <Button type="submit" variant="success">
                  <Save className="mr-2 h-4 w-4" />
                  Save Category
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

      {/* Categories List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="font-mono text-primary">
                    {category.code}
                  </CardDescription>
                </div>
                <Badge 
                  variant={category.type === "fixed" ? "default" : "secondary"}
                  className={category.type === "fixed" ? "bg-primary/10 text-primary" : "bg-gold/10 text-gold"}
                >
                  {category.type === "fixed" ? "Fixed Asset" : "Consumable"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {category.description}
              </p>
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-danger hover:text-danger">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}