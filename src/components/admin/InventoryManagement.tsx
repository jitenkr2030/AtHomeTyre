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
import { 
  Package, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle,
  RefreshCw,
  Download,
  Upload,
  Eye,
  Edit,
  Plus
} from 'lucide-react'

interface InventoryItem {
  id: string
  name: string
  brand: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  reorderPoint: number
  lastUpdated: string
  totalSold: number
  avgMonthlySales: number
  stockStatus: 'LOW' | 'NORMAL' | 'HIGH' | 'OUT'
  price: number
  value: number
}

interface StockAdjustment {
  productId: string
  adjustmentType: 'ADD' | 'REMOVE' | 'SET'
  quantity: number
  reason: string
  notes?: string
}

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [stockFilter, setStockFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null)
  const [adjustment, setAdjustment] = useState<StockAdjustment>({
    productId: '',
    adjustmentType: 'ADD',
    quantity: 0,
    reason: '',
    notes: ''
  })

  useEffect(() => {
    fetchInventory()
  }, [searchTerm, stockFilter, categoryFilter])

  const fetchInventory = async () => {
    try {
      setLoading(true)
      // Simulate API call - replace with actual API
      const mockInventory: InventoryItem[] = [
        {
          id: '1',
          name: 'ZLX',
          brand: 'MRF',
          category: 'CAR',
          currentStock: 45,
          minStock: 10,
          maxStock: 100,
          reorderPoint: 20,
          lastUpdated: '2024-01-15',
          totalSold: 125,
          avgMonthlySales: 25,
          stockStatus: 'NORMAL',
          price: 6500,
          value: 45 * 6500
        },
        {
          id: '2',
          name: 'Amazer 3G',
          brand: 'Apollo',
          category: 'CAR',
          currentStock: 8,
          minStock: 15,
          maxStock: 80,
          reorderPoint: 25,
          lastUpdated: '2024-01-14',
          totalSold: 89,
          avgMonthlySales: 18,
          stockStatus: 'LOW',
          price: 4200,
          value: 8 * 4200
        },
        {
          id: '3',
          name: 'Nylogrip Zapper',
          brand: 'MRF',
          category: 'BIKE',
          currentStock: 0,
          minStock: 20,
          maxStock: 100,
          reorderPoint: 30,
          lastUpdated: '2024-01-13',
          totalSold: 156,
          avgMonthlySales: 31,
          stockStatus: 'OUT',
          price: 2800,
          value: 0
        },
        {
          id: '4',
          name: 'Truck Super Lugs',
          brand: 'JK Tyre',
          category: 'TRUCK',
          currentStock: 95,
          minStock: 5,
          maxStock: 50,
          reorderPoint: 15,
          lastUpdated: '2024-01-15',
          totalSold: 23,
          avgMonthlySales: 5,
          stockStatus: 'HIGH',
          price: 18500,
          value: 95 * 18500
        }
      ]
      
      // Apply filters
      let filtered = mockInventory
      if (searchTerm) {
        filtered = filtered.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      if (stockFilter) {
        filtered = filtered.filter(item => item.stockStatus === stockFilter)
      }
      if (categoryFilter) {
        filtered = filtered.filter(item => item.category === categoryFilter)
      }
      
      setInventory(filtered)
    } catch (error) {
      console.error('Error fetching inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStockAdjustment = async () => {
    if (!selectedProduct || !adjustment.reason) return

    try {
      // Simulate API call
      const adjustmentData = {
        ...adjustment,
        productId: selectedProduct.id
      }
      console.log('Stock adjustment:', adjustmentData)
      
      await fetchInventory()
      setIsAdjustModalOpen(false)
      setSelectedProduct(null)
      setAdjustment({
        productId: '',
        adjustmentType: 'ADD',
        quantity: 0,
        reason: '',
        notes: ''
      })
    } catch (error) {
      console.error('Error adjusting stock:', error)
    }
  }

  const getStockBadge = (status: string, stock: number) => {
    switch (status) {
      case 'OUT':
        return <Badge variant="destructive">Out of Stock</Badge>
      case 'LOW':
        return <Badge variant="secondary">Low Stock ({stock})</Badge>
      case 'HIGH':
        return <Badge variant="default">High Stock ({stock})</Badge>
      default:
        return <Badge variant="outline">Normal ({stock})</Badge>
    }
  }

  const getStockStatusIcon = (status: string) => {
    switch (status) {
      case 'OUT':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'LOW':
        return <TrendingDown className="h-4 w-4 text-orange-600" />
      case 'HIGH':
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      default:
        return <Package className="h-4 w-4 text-green-600" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num)
  }

  const getDaysOfStock = (item: InventoryItem) => {
    if (item.avgMonthlySales === 0) return '∞'
    const daysLeft = Math.floor((item.currentStock / item.avgMonthlySales) * 30)
    return daysLeft > 999 ? '999+' : daysLeft.toString()
  }

  const getStockHealthColor = (daysLeft: string) => {
    if (daysLeft === '∞') return 'text-green-600'
    const days = parseInt(daysLeft)
    if (days <= 7) return 'text-red-600'
    if (days <= 30) return 'text-orange-600'
    return 'text-green-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
          <p className="text-gray-600">Track and manage your product inventory levels</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-orange-600">
                  {inventory.filter(item => item.stockStatus === 'LOW').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {inventory.filter(item => item.stockStatus === 'OUT').length}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(inventory.reduce((sum, item) => sum + item.value, 0))}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Stock Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Stock Levels</SelectItem>
                <SelectItem value="LOW">Low Stock</SelectItem>
                <SelectItem value="OUT">Out of Stock</SelectItem>
                <SelectItem value="HIGH">High Stock</SelectItem>
                <SelectItem value="NORMAL">Normal Stock</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="CAR">Car</SelectItem>
                <SelectItem value="BIKE">Bike</SelectItem>
                <SelectItem value="TRUCK">Truck</SelectItem>
                <SelectItem value="BUS">Bus</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <p>Loading inventory...</p>
            </div>
          ) : inventory.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No inventory items found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Min/Max</TableHead>
                    <TableHead>Days Left</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-600">
                            {formatCurrency(item.price)} each
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.brand}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.currentStock}</span>
                          {getStockStatusIcon(item.stockStatus)}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {item.minStock} / {item.maxStock}
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getStockHealthColor(getDaysOfStock(item))}`}>
                          {getDaysOfStock(item)} days
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(item.value)}
                      </TableCell>
                      <TableCell>
                        {getStockBadge(item.stockStatus, item.currentStock)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedProduct(item)
                              setAdjustment({
                                ...adjustment,
                                productId: item.id
                              })
                              setIsAdjustModalOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
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

      {/* Stock Adjustment Modal */}
      <Dialog open={isAdjustModalOpen} onOpenChange={setIsAdjustModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adjust Stock</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedProduct.name}</p>
                    <p className="text-sm text-gray-600">{selectedProduct.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Current: {selectedProduct.currentStock}</p>
                    <p className="text-sm text-gray-600">
                      Min: {selectedProduct.minStock}, Max: {selectedProduct.maxStock}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="adjustmentType">Adjustment Type</Label>
                <Select 
                  value={adjustment.adjustmentType} 
                  onValueChange={(value: 'ADD' | 'REMOVE' | 'SET') => 
                    setAdjustment({ ...adjustment, adjustmentType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADD">Add Stock</SelectItem>
                    <SelectItem value="REMOVE">Remove Stock</SelectItem>
                    <SelectItem value="SET">Set Stock Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={adjustment.quantity}
                  onChange={(e) => setAdjustment({ ...adjustment, quantity: parseInt(e.target.value) || 0 })}
                  placeholder="Enter quantity"
                />
              </div>

              <div>
                <Label htmlFor="reason">Reason *</Label>
                <Select value={adjustment.reason} onValueChange={(value) => setAdjustment({ ...adjustment, reason: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEW_STOCK">New Stock Arrival</SelectItem>
                    <SelectItem value="DAMAGED">Damaged Goods</SelectItem>
                    <SelectItem value="THEFT">Theft/Loss</SelectItem>
                    <SelectItem value="COUNT_ADJUSTMENT">Stock Count Adjustment</SelectItem>
                    <SelectItem value="RETURN">Customer Return</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={adjustment.notes}
                  onChange={(e) => setAdjustment({ ...adjustment, notes: e.target.value })}
                  placeholder="Additional notes..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleStockAdjustment}
                  disabled={!adjustment.reason || adjustment.quantity === 0}
                >
                  Adjust Stock
                </Button>
                <Button variant="outline" onClick={() => setIsAdjustModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}