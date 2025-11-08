'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Eye,
  Package,
  TrendingUp,
  Star,
  AlertTriangle,
  CheckCircle,
  Settings,
  BarChart3
} from 'lucide-react'
import InventoryManagement from './InventoryManagement'

interface Product {
  id: string
  name: string
  description?: string
  category: string
  width: number
  aspectRatio: number
  rimDiameter: number
  price: number
  b2bPrice?: number
  stock: number
  fuelEfficiency?: number
  wetGrip?: number
  noiseLevel?: number
  warranty?: number
  speedRating?: string
  loadIndex?: number
  images?: string
  features?: string
  season?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  brand: {
    id: string
    name: string
    description?: string
    logo?: string
    isActive: boolean
  }
  avgRating: number
  reviewCount: number
  totalSold: number
}

interface Brand {
  id: string
  name: string
  description?: string
  logo?: string
  isActive: boolean
  _count: {
    tyres: number
  }
}

const categories = [
  'CAR', 'BIKE', 'TRUCK', 'BUS', 'TRACTOR', 'OFF_ROAD'
]

const seasons = [
  'ALL_SEASON', 'SUMMER', 'WINTER'
]

const speedRatings = [
  'Q', 'R', 'S', 'T', 'H', 'V', 'W', 'Y'
]

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    brandId: '',
    category: '',
    width: '',
    aspectRatio: '',
    rimDiameter: '',
    price: '',
    b2bPrice: '',
    stock: '',
    fuelEfficiency: '',
    wetGrip: '',
    noiseLevel: '',
    warranty: '',
    speedRating: '',
    loadIndex: '',
    images: '',
    features: '',
    season: '',
    isActive: true
  })

  useEffect(() => {
    fetchProducts()
    fetchBrands()
  }, [searchTerm, selectedCategory, selectedBrand, sortBy, sortOrder])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: '1',
        limit: '50',
        sortBy,
        sortOrder
      })

      if (searchTerm) params.append('search', searchTerm)
      if (selectedCategory) params.append('category', selectedCategory)
      if (selectedBrand) params.append('brand', selectedBrand)

      const response = await fetch(`/api/admin/products?${params}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/admin/brands')
      if (response.ok) {
        const data = await response.json()
        setBrands(data.brands || [])
      }
    } catch (error) {
      console.error('Error fetching brands:', error)
    }
  }

  const handleAddProduct = async () => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          width: parseFloat(newProduct.width),
          aspectRatio: parseFloat(newProduct.aspectRatio),
          rimDiameter: parseFloat(newProduct.rimDiameter),
          price: parseFloat(newProduct.price),
          b2bPrice: newProduct.b2bPrice ? parseFloat(newProduct.b2bPrice) : null,
          stock: parseInt(newProduct.stock),
          fuelEfficiency: newProduct.fuelEfficiency ? parseInt(newProduct.fuelEfficiency) : null,
          wetGrip: newProduct.wetGrip ? parseInt(newProduct.wetGrip) : null,
          noiseLevel: newProduct.noiseLevel ? parseInt(newProduct.noiseLevel) : null,
          warranty: newProduct.warranty ? parseInt(newProduct.warranty) : null,
          loadIndex: newProduct.loadIndex ? parseInt(newProduct.loadIndex) : null,
          images: newProduct.images ? newProduct.images.split(',').map(s => s.trim()) : null,
          features: newProduct.features ? newProduct.features.split(',').map(s => s.trim()) : null
        })
      })

      if (response.ok) {
        await fetchProducts()
        setIsAddModalOpen(false)
        resetNewProductForm()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to add product')
      }
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product')
    }
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct) return

    try {
      const response = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingProduct.name,
          description: editingProduct.description,
          brandId: editingProduct.brand.id,
          category: editingProduct.category,
          width: editingProduct.width,
          aspectRatio: editingProduct.aspectRatio,
          rimDiameter: editingProduct.rimDiameter,
          price: editingProduct.price,
          b2bPrice: editingProduct.b2bPrice,
          stock: editingProduct.stock,
          fuelEfficiency: editingProduct.fuelEfficiency,
          wetGrip: editingProduct.wetGrip,
          noiseLevel: editingProduct.noiseLevel,
          warranty: editingProduct.warranty,
          speedRating: editingProduct.speedRating,
          loadIndex: editingProduct.loadIndex,
          images: editingProduct.images,
          features: editingProduct.features,
          season: editingProduct.season,
          isActive: editingProduct.isActive
        })
      })

      if (response.ok) {
        await fetchProducts()
        setIsEditModalOpen(false)
        setEditingProduct(null)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to update product')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product')
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchProducts()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  const resetNewProductForm = () => {
    setNewProduct({
      name: '',
      description: '',
      brandId: '',
      category: '',
      width: '',
      aspectRatio: '',
      rimDiameter: '',
      price: '',
      b2bPrice: '',
      stock: '',
      fuelEfficiency: '',
      wetGrip: '',
      noiseLevel: '',
      warranty: '',
      speedRating: '',
      loadIndex: '',
      images: '',
      features: '',
      season: '',
      isActive: true
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock < 10) {
      return <Badge variant="secondary">Low Stock ({stock})</Badge>
    } else {
      return <Badge variant="default">In Stock ({stock})</Badge>
    }
  }

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= Math.floor(rating) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="products">Product Management</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
                <p className="text-gray-600">Manage your product catalog and pricing</p>
              </div>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <ProductForm
                    product={newProduct}
                    setProduct={setNewProduct}
                    brands={brands}
                    onSubmit={handleAddProduct}
                    onCancel={() => {
                      setIsAddModalOpen(false)
                      resetNewProductForm()
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Brands</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.name}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="stock">Stock</SelectItem>
                        <SelectItem value="createdAt">Created</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Asc</SelectItem>
                        <SelectItem value="desc">Desc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Products ({products.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p>Loading products...</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No products found</p>
                    <Button onClick={() => setIsAddModalOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Product
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Brand</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Sold</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-gray-600 truncate max-w-xs">
                                  {product.description}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{product.brand.name}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {product.category.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {product.width}/{product.aspectRatio} R{product.rimDiameter}
                            </TableCell>
                            <TableCell className="font-medium">
                              {formatPrice(product.price)}
                            </TableCell>
                            <TableCell>
                              {getStockBadge(product.stock)}
                            </TableCell>
                            <TableCell>
                              {getRatingStars(product.avgRating)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-sm">{product.totalSold}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={product.isActive}
                                onCheckedChange={(checked) => {
                                  // Handle status toggle
                                }}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingProduct(product)
                                    setIsEditModalOpen(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryManagement />
        </TabsContent>
      </Tabs>

      {/* Edit Product Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              product={{
                name: editingProduct.name,
                description: editingProduct.description || '',
                brandId: editingProduct.brand.id,
                category: editingProduct.category,
                width: editingProduct.width.toString(),
                aspectRatio: editingProduct.aspectRatio.toString(),
                rimDiameter: editingProduct.rimDiameter.toString(),
                price: editingProduct.price.toString(),
                b2bPrice: editingProduct.b2bPrice?.toString() || '',
                stock: editingProduct.stock.toString(),
                fuelEfficiency: editingProduct.fuelEfficiency?.toString() || '',
                wetGrip: editingProduct.wetGrip?.toString() || '',
                noiseLevel: editingProduct.noiseLevel?.toString() || '',
                warranty: editingProduct.warranty?.toString() || '',
                speedRating: editingProduct.speedRating || '',
                loadIndex: editingProduct.loadIndex?.toString() || '',
                images: editingProduct.images || '',
                features: editingProduct.features || '',
                season: editingProduct.season || '',
                isActive: editingProduct.isActive
              }}
              setProduct={(updatedProduct) => {
                setEditingProduct({
                  ...editingProduct,
                  ...updatedProduct,
                  width: parseFloat(updatedProduct.width),
                  aspectRatio: parseFloat(updatedProduct.aspectRatio),
                  rimDiameter: parseFloat(updatedProduct.rimDiameter),
                  price: parseFloat(updatedProduct.price),
                  b2bPrice: updatedProduct.b2bPrice ? parseFloat(updatedProduct.b2bPrice) : undefined,
                  stock: parseInt(updatedProduct.stock),
                  fuelEfficiency: updatedProduct.fuelEfficiency ? parseInt(updatedProduct.fuelEfficiency) : undefined,
                  wetGrip: updatedProduct.wetGrip ? parseInt(updatedProduct.wetGrip) : undefined,
                  noiseLevel: updatedProduct.noiseLevel ? parseInt(updatedProduct.noiseLevel) : undefined,
                  warranty: updatedProduct.warranty ? parseInt(updatedProduct.warranty) : undefined,
                  loadIndex: updatedProduct.loadIndex ? parseInt(updatedProduct.loadIndex) : undefined
                })
              }}
              brands={brands}
              onSubmit={handleUpdateProduct}
              onCancel={() => {
                setIsEditModalOpen(false)
                setEditingProduct(null)
              }}
              isEdit
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface ProductFormProps {
  product: {
    name: string
    description: string
    brandId: string
    category: string
    width: string
    aspectRatio: string
    rimDiameter: string
    price: string
    b2bPrice: string
    stock: string
    fuelEfficiency: string
    wetGrip: string
    noiseLevel: string
    warranty: string
    speedRating: string
    loadIndex: string
    images: string
    features: string
    season: string
    isActive: boolean
  }
  setProduct: (product: any) => void
  brands: Brand[]
  onSubmit: () => void
  onCancel: () => void
  isEdit?: boolean
}

function ProductForm({ product, setProduct, brands, onSubmit, onCancel, isEdit = false }: ProductFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Enter product name"
          />
        </div>
        
        <div>
          <Label htmlFor="brand">Brand *</Label>
          <Select value={product.brandId} onValueChange={(value) => setProduct({ ...product, brandId: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          placeholder="Enter product description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select value={product.category} onValueChange={(value) => setProduct({ ...product, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="season">Season</Label>
          <Select value={product.season} onValueChange={(value) => setProduct({ ...product, season: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Select season</SelectItem>
              {seasons.map((season) => (
                <SelectItem key={season} value={season}>
                  {season.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="speedRating">Speed Rating</Label>
          <Select value={product.speedRating} onValueChange={(value) => setProduct({ ...product, speedRating: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select speed rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Select speed rating</SelectItem>
              {speedRatings.map((rating) => (
                <SelectItem key={rating} value={rating}>
                  {rating}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="width">Width (mm) *</Label>
          <Input
            id="width"
            type="number"
            value={product.width}
            onChange={(e) => setProduct({ ...product, width: e.target.value })}
            placeholder="205"
          />
        </div>
        
        <div>
          <Label htmlFor="aspectRatio">Aspect Ratio (%) *</Label>
          <Input
            id="aspectRatio"
            type="number"
            value={product.aspectRatio}
            onChange={(e) => setProduct({ ...product, aspectRatio: e.target.value })}
            placeholder="55"
          />
        </div>
        
        <div>
          <Label htmlFor="rimDiameter">Rim Diameter (inch) *</Label>
          <Input
            id="rimDiameter"
            type="number"
            step="0.5"
            value={product.rimDiameter}
            onChange={(e) => setProduct({ ...product, rimDiameter: e.target.value })}
            placeholder="16"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            placeholder="6500"
          />
        </div>
        
        <div>
          <Label htmlFor="b2bPrice">B2B Price (₹)</Label>
          <Input
            id="b2bPrice"
            type="number"
            value={product.b2bPrice}
            onChange={(e) => setProduct({ ...product, b2bPrice: e.target.value })}
            placeholder="5800"
          />
        </div>
        
        <div>
          <Label htmlFor="stock">Stock Quantity *</Label>
          <Input
            id="stock"
            type="number"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            placeholder="50"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <Label htmlFor="loadIndex">Load Index</Label>
          <Input
            id="loadIndex"
            type="number"
            value={product.loadIndex}
            onChange={(e) => setProduct({ ...product, loadIndex: e.target.value })}
            placeholder="91"
          />
        </div>
        
        <div>
          <Label htmlFor="fuelEfficiency">Fuel Efficiency (1-10)</Label>
          <Input
            id="fuelEfficiency"
            type="number"
            min="1"
            max="10"
            value={product.fuelEfficiency}
            onChange={(e) => setProduct({ ...product, fuelEfficiency: e.target.value })}
            placeholder="8"
          />
        </div>
        
        <div>
          <Label htmlFor="wetGrip">Wet Grip (1-10)</Label>
          <Input
            id="wetGrip"
            type="number"
            min="1"
            max="10"
            value={product.wetGrip}
            onChange={(e) => setProduct({ ...product, wetGrip: e.target.value })}
            placeholder="7"
          />
        </div>
        
        <div>
          <Label htmlFor="noiseLevel">Noise Level (1-10)</Label>
          <Input
            id="noiseLevel"
            type="number"
            min="1"
            max="10"
            value={product.noiseLevel}
            onChange={(e) => setProduct({ ...product, noiseLevel: e.target.value })}
            placeholder="6"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="warranty">Warranty (months)</Label>
          <Input
            id="warranty"
            type="number"
            value={product.warranty}
            onChange={(e) => setProduct({ ...product, warranty: e.target.value })}
            placeholder="60"
          />
        </div>
        
        <div>
          <Label htmlFor="images">Image URLs (comma-separated)</Label>
          <Input
            id="images"
            value={product.images}
            onChange={(e) => setProduct({ ...product, images: e.target.value })}
            placeholder="/tyres/product1.jpg, /tyres/product2.jpg"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="features">Features (comma-separated)</Label>
        <Textarea
          id="features"
          value={product.features}
          onChange={(e) => setProduct({ ...product, features: e.target.value })}
          placeholder="Enhanced grip, Low rolling resistance, Long tread life"
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={product.isActive}
          onCheckedChange={(checked) => setProduct({ ...product, isActive: checked })}
        />
        <Label htmlFor="isActive">Product is active</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={onSubmit} disabled={!product.name || !product.brandId || !product.category || !product.width || !product.aspectRatio || !product.rimDiameter || !product.price}>
          {isEdit ? 'Update Product' : 'Add Product'}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}