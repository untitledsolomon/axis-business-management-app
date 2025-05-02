import { AppHeader } from "@/components/layouts/AppHeader";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react"
import { fetchProducts, handleAdd } from "@/api/products";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
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
    itemName: z.string().min(2, {
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
  fetchProducts()

  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      itemName: "",
      sku: "",
      price: 0,
      stock: 0,
    },
  });

  function onSubmit(values: ProductFormValues) {
    console.log("Product to add:", values);
    setIsAddProductDialogOpen(false);
    form.reset();
  }

  const handleOpenChange = (open: boolean) => {
    setIsAddProductDialogOpen(open);
    if (!open) {
      form.reset();
    }
  }

  return (
    <AppLayout>
      <AppHeader title="Inventory" />
      <div className="p-6 overflow-auto">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex justify-between items-center mb-6">
              <CardTitle>Inventory Management</CardTitle>
              <Dialog open={isAddProductDialogOpen} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                  <Button className="bg-[var(--brand-accent)] hover:opacity-90 text-[var(--brand-accent-fg)] font-medium py-2 px-4 rounded-lg flex items-center transition duration-150 shadow-sm">
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
                        name="itemName"
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Product Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">SKU</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Stock</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-[var(--primary-bg)] divide-y divide-[var(--border-color)]">
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-[var(--secondary-text)]">Product data will load here...</td>
                  </tr>
                  {/* Product rows would be mapped here */}
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
