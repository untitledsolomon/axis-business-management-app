import { AppHeader } from "@/components/layouts/AppHeader";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pen, Plus } from "lucide-react"
import { addProduct, deleteProduct, editProduct, getProducts } from "@/api/products";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const productFormSchema = z.object({
    name: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    sku: z.string().optional(),
    price: z.coerce
        .number({ invalid_type_error: "Price must be a number." })
        .positive({ message: "Price must be positive." }),
    stock: z.coerce
        .number({ invalid_type_error: "Stock must be a number." })
        .int({ message: "Stock must be a whole number." })
        .nonnegative({ message: "Stock cannot be negative." }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const Inventory = () => {
  const [products, setProducts] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProducts();
        // Convert the object returned by the API into an array of product objects
        const productsArray = Object.values(data || {});
        setProducts(productsArray);
      } catch (err) {
        console.error("Error fetching products", err);
        setError("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: 0,
      stock: 0,
    },
  });

  function onSubmit(values: ProductFormValues) {
    console.log("Product to add:", values);
    addProduct(values)
    setIsAddProductDialogOpen(false);
    form.reset();
  }

  const editform = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: 0,
      stock: 0,
    },
  });

  function editSubmit(values: ProductFormValues) {
    console.log("Product to edit:", values.name);
    editProduct(values)
    setIsAddProductDialogOpen(false);
    form.reset();
  }

  function handleDelete(values: ProductFormValues) {
    console.log("Product to delete:", values);
    deleteProduct(values)
  }

  const handleOpenChange = (open: boolean) => {
    setIsAddProductDialogOpen(open);
    if (!open) {
      form.reset();
    }
  }

  const handleEditOpen = (open: boolean) => {
    setIsEditProductDialogOpen(open);
    if (!open) {
      editform.reset()
    }
  }

  function renderTableBody() {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={5} className="px-6 py-4 text-center text-[var(--secondary-text)]">Loading products...</td>
        </tr>
      );
    }
  
    if (error) {
      return (
        <tr>
          <td colSpan={5} className="px-6 py-4 text-center text-red-500">{error}</td>
        </tr>
      );
    }
  
    if (products && products.length > 0) {
      return products.map((product: any) => (
        <tr key={product.id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--primary-text)] text-center">{product.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--secondary-text)] text-center">{product.sku || 'N/A'}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--secondary-text)] text-center">{product.price}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--secondary-text)] text-center">{product.stock || "N/A"}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
            {/* Add action buttons like Edit/Delete here */}
            <div className="gap-1 content-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedProduct(product);
                  editform.reset({
                    name: product.name || "",
                    sku: product.sku || "",
                    price: product.price ?? 0,
                    stock: product.stock ?? 0,
                  }); 
                  setIsEditProductDialogOpen(true);
                }}
              >
                <Pen className="mr-0.5 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700"
                onClick={() => {
                  handleDelete(product)
                }}
              >Delete</Button>
            </div>
          </td>
        </tr>
      ));
    }
  
    return (
      <tr>
        <td colSpan={5} className="px-6 py-4 text-center text-[var(--secondary-text)]">No products found.</td>
      </tr>
    );
  }

  return (
    <AppLayout>
      <Dialog open={isEditProductDialogOpen} onOpenChange={handleEditOpen}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Edit the details for the product. Click save when done.
              </DialogDescription>
            </DialogHeader>
            <Form {...editform}>
              <form id="edit-product-form" onSubmit={editform.handleSubmit(editSubmit)} className="grid gap-4 py-4">
                <FormField
                  control={editform.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Name</FormLabel>
                      <FormControl className="col-span-3">
                        <Input placeholder="e.g., Oriamo Headsets" {...field} />
                      </FormControl>
                      <div className="col-start-2 col-span-3">
                          <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={editform.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">SKU</FormLabel>
                      <FormControl className="col-span-3">
                        <Input placeholder="e.g., 5678 (Optional)" {...field} />
                      </FormControl>
                      <div className="col-start-2 col-span-3">
                          <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={editform.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Price (UGX)</FormLabel>
                      <FormControl className="col-span-3">
                        <Input type="number" step="1" placeholder="e.g., 10000" {...field} />
                      </FormControl>
                      <div className="col-start-2 col-span-3">
                          <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={editform.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Stock</FormLabel>
                      <FormControl className="col-span-3">
                        <Input type="number" step="1" placeholder="e.g., 26" {...field} />
                      </FormControl>
                      <div className="col-start-2 col-span-3">
                          <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" form="edit-product-form">Save Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      <AppHeader title="Inventory" />
      <div className="p-6 overflow-auto">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex justify-between items-center mb-6">
              <CardTitle>Inventory Management</CardTitle>
              <Dialog open={isAddProductDialogOpen} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                  <Button className="bg-[var(--brand-accent)] hover:opacity-80 text-[var(--brand-accent-fg)] font-medium py-2 px-4 rounded-lg flex items-center transition duration-150 shadow-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[480px]">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the new product. Click save when done.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form id="add-product-form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-4">
                            <FormLabel className="text-right">Name</FormLabel>
                            <FormControl className="col-span-3">
                              <Input placeholder="e.g., Oriamo Headsets" {...field} />
                            </FormControl>
                            <div className="col-start-2 col-span-3">
                                <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sku"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-4">
                            <FormLabel className="text-right">SKU</FormLabel>
                            <FormControl className="col-span-3">
                              <Input placeholder="e.g., 5678 (Optional)" {...field} />
                            </FormControl>
                            <div className="col-start-2 col-span-3">
                                <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-4">
                            <FormLabel className="text-right">Price (UGX)</FormLabel>
                            <FormControl className="col-span-3">
                              <Input type="number" step="1" placeholder="e.g., 10000" {...field} />
                            </FormControl>
                             <div className="col-start-2 col-span-3">
                                <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-4">
                            <FormLabel className="text-right">Stock</FormLabel>
                            <FormControl className="col-span-3">
                              <Input type="number" step="1" placeholder="e.g., 26" {...field} />
                            </FormControl>
                             <div className="col-start-2 col-span-3">
                                <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                  <DialogFooter>
                      <DialogClose asChild>
                          <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" form="add-product-form">Save Product</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <CardDescription>
              Manage your products, track stock levels, and monitor inventory movements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-[var(--border-color)]">
                <thead className="bg-[var(--secondary-bg)]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Product Name</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">SKU</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Stock</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-[var(--primary-bg)] divide-y divide-[var(--border-color)]">
                  {renderTableBody()}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Inventory;
