"use client";

import type React from "react";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Package,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Tag,
  Settings,
  List,
  DollarSign,
  FileText,
  Save,
  Eye,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/lib/api";
import { toast } from "sonner";

interface ProductFormData {
  title: string;
  excerpt: string;
  description: string;
  price: number;
  tags: { value: string }[];
  images: { url: string; alt: string }[];
  specifications: { key: string; value: string }[];
  features: { value: string }[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishDate: string;
}

interface SectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({
  title,
  description,
  icon,
  children,
  defaultOpen = true,
}: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
                <div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
              </div>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export default function AddProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      title: "",
      excerpt: "",
      description: "",
      price: 0,
      tags: [{ value: "" }],
      images: [{ url: "", alt: "" }],
      specifications: [{ key: "", value: "" }],
      features: [{ value: "" }],
      author: {
        name: "",
        avatar: "",
        role: "Admin",
      },
      publishDate: new Date().toISOString().split("T")[0],
    },
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: "specifications",
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Clean up the data before sending to backend
      const cleanedData: ProductFormData = {
        ...data,
        title: data.title.trim(),
        excerpt: data.excerpt.trim(),
        description: data.description.trim(),
        tags: data.tags.filter((tag) => tag.value.trim() !== ""),
        images: data.images.filter((img) => img.url.trim() !== ""),
        specifications: data.specifications.filter(
          (spec) => spec.key.trim() !== "" && spec.value.trim() !== ""
        ),
        features: data.features.filter(
          (feature) => feature.value.trim() !== ""
        ),
        author: {
          name: data.author.name.trim(),
          avatar: data.author.avatar.trim(),
          role: data.author.role,
        },
        price: Number(data.price),
        publishDate: data.publishDate,
      };

      if (
        !cleanedData.title ||
        !cleanedData.excerpt ||
        !cleanedData.description ||
        !cleanedData.price ||
        !cleanedData.publishDate ||
        !cleanedData.author.name ||
        !cleanedData.images.length ||
        !cleanedData.tags.length ||
        !cleanedData.specifications.length ||
        !cleanedData.features.length
      ) {
        throw new Error(
          "All required fields must be filled before submitting."
        );
      }

      // Send to backend
      await addProduct("/products", cleanedData);

      setSubmitStatus("success");
      toast.success("Product created successfully!");

      reset(); // Reset form after success
    } catch (error: any) {
      console.error("Error submitting product:", error);
      setSubmitStatus("error");
      toast.error(error.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedTitle = watch("title");
  const router = useRouter();
  const hadleLogOut = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">Add New Product</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={hadleLogOut}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Alerts */}
        {submitStatus === "success" && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Product has been successfully created and saved as draft!
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There was an error creating the product. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <CollapsibleSection
            title="Basic Information"
            description="Essential product details and descriptions"
            icon={<FileText className="h-5 w-5 text-blue-600" />}
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">
                  Product Title *
                </Label>
                <Input
                  id="title"
                  {...register("title", {
                    required: "Product title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters",
                    },
                  })}
                  placeholder="Enter product title"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-sm font-medium">
                  Short Description *
                </Label>
                <Textarea
                  id="excerpt"
                  {...register("excerpt", {
                    required: "Short description is required",
                    maxLength: {
                      value: 200,
                      message: "Description must be less than 200 characters",
                    },
                  })}
                  placeholder="Brief product description for listings"
                  rows={3}
                  className={errors.excerpt ? "border-red-500" : ""}
                />
                {errors.excerpt && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.excerpt.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Detailed Description *
                </Label>
                <Textarea
                  id="description"
                  {...register("description", {
                    required: "Detailed description is required",
                    minLength: {
                      value: 50,
                      message: "Description must be at least 50 characters",
                    },
                  })}
                  placeholder="Comprehensive product description with features, benefits, and specifications"
                  rows={6}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </CollapsibleSection>

          {/* Pricing & Publishing */}
          <CollapsibleSection
            title="Pricing & Publishing"
            description="Price, author information, and publication settings"
            icon={<DollarSign className="h-5 w-5 text-blue-600" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price" className="text-sm font-medium">
                  Price ($) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price must be positive",
                    },
                  })}
                  placeholder="0.00"
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="publishDate" className="text-sm font-medium">
                  Publish Date *
                </Label>
                <Input
                  id="publishDate"
                  type="date"
                  {...register("publishDate", {
                    required: "Publish date is required",
                  })}
                  className={errors.publishDate ? "border-red-500" : ""}
                />
                {errors.publishDate && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.publishDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="authorName" className="text-sm font-medium">
                  Author Name *
                </Label>
                <Input
                  id="authorName"
                  {...register("author.name", {
                    required: "Author name is required",
                  })}
                  placeholder="Enter author name"
                  className={errors.author?.name ? "border-red-500" : ""}
                />
                {errors.author?.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.author.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="authorRole" className="text-sm font-medium">
                  Author Role
                </Label>
                <Controller
                  name="author.role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Contributor">Contributor</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="authorAvatar" className="text-sm font-medium">
                  Author Avatar URL
                </Label>
                <Input
                  id="authorAvatar"
                  {...register("author.avatar")}
                  placeholder="https://example.com/avatar.jpg"
                  type="url"
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Media */}
          <CollapsibleSection
            title="Product Images"
            description="Upload or add URLs for product images"
            icon={<ImageIcon className="h-5 w-5 text-blue-600" />}
          >
            <div className="space-y-4">
              {imageFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <Label className="text-sm font-medium">Image URL *</Label>
                    <Input
                      {...register(`images.${index}.url` as const, {
                        required:
                          index === 0
                            ? "At least one image is required"
                            : false,
                      })}
                      placeholder="https://example.com/image.jpg"
                      type="url"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Alt Text</Label>
                    <div className="flex space-x-2">
                      <Input
                        {...register(`images.${index}.alt` as const)}
                        placeholder="Descriptive alt text"
                      />
                      {imageFields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendImage({ url: "", alt: "" })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Image
              </Button>
            </div>
          </CollapsibleSection>

          {/* Product Details */}
          <CollapsibleSection
            title="Product Details"
            description="Tags, specifications, and features"
            icon={<Settings className="h-5 w-5 text-blue-600" />}
          >
            <div className="space-y-8">
              {/* Tags */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  <Tag className="h-4 w-4 inline mr-2" />
                  Tags
                </Label>
                <div className="space-y-3">
                  {tagFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2">
                      <Input
                        {...register(`tags.${index}.value` as const)}
                        placeholder="Enter tag"
                      />
                      {tagFields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTag(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendTag({ value: "" })}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tag
                  </Button>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  <Settings className="h-4 w-4 inline mr-2" />
                  Specifications
                </Label>
                <div className="space-y-3">
                  {specFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-2 gap-2">
                      <Input
                        {...register(`specifications.${index}.key` as const)}
                        placeholder="Specification name (e.g., Motor)"
                      />
                      <div className="flex space-x-2">
                        <Input
                          {...register(
                            `specifications.${index}.value` as const
                          )}
                          placeholder="Value (e.g., 750W Brushless)"
                        />
                        {specFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeSpec(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendSpec({ key: "", value: "" })}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Specification
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  <List className="h-4 w-4 inline mr-2" />
                  Features
                </Label>
                <div className="space-y-3">
                  {featureFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2">
                      <Input
                        {...register(`features.${index}.value` as const)}
                        placeholder="Enter feature"
                      />
                      {featureFields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendFeature({ value: "" })}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Submit Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="text-sm text-gray-600">
                  {watchedTitle ? (
                    <span>
                      Product: <strong>{watchedTitle}</strong>
                    </span>
                  ) : (
                    <span>Fill in the product details above</span>
                  )}
                </div>
                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => reset()}
                    disabled={isSubmitting}
                  >
                    Reset Form
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Product...</span>
                      </div>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Create Product
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
