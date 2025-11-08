'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Ruler, Car, Truck, Bike, Info, AlertTriangle, CheckCircle } from 'lucide-react'

export default function SizeGuidePage() {
  const [vehicleType, setVehicleType] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')

  const tyreSizes = {
    car: [
      { size: '145/70R12', width: '145mm', aspect: '70%', rim: '12"', type: 'Hatchback' },
      { size: '165/65R14', width: '165mm', aspect: '65%', rim: '14"', type: 'Sedan' },
      { size: '195/65R15', width: '195mm', aspect: '65%', rim: '15"', type: 'Compact SUV' },
      { size: '205/55R16', width: '205mm', aspect: '55%', rim: '16"', type: 'Mid-size Sedan' },
      { size: '225/45R17', width: '225mm', aspect: '45%', rim: '17"', type: 'Premium Sedan' },
      { size: '235/60R18', width: '235mm', aspect: '60%', rim: '18"', type: 'SUV' },
      { size: '265/50R20', width: '265mm', aspect: '50%', rim: '20"', type: 'Large SUV' }
    ],
    bike: [
      { size: '90/90-12', width: '90mm', aspect: '90%', rim: '12"', type: 'Scooter' },
      { size: '100/90-17', width: '100mm', aspect: '90%', rim: '17"', type: 'Commuter' },
      { size: '120/80-17', width: '120mm', aspect: '80%', rim: '17"', type: 'Sports' },
      { size: '140/70-17', width: '140mm', aspect: '70%', rim: '17"', type: 'Sports Touring' },
      { size: '150/70-18', width: '150mm', aspect: '70%', rim: '18"', type: 'Cruiser' },
      { size: '180/55-17', width: '180mm', aspect: '55%', rim: '17"', type: 'Super Sports' }
    ],
    truck: [
      { size: '7.50-16', width: '190mm', aspect: 'N/A', rim: '16"', type: 'Light Truck' },
      { size: '8.25-20', width: '210mm', aspect: 'N/A', rim: '20"', type: 'Medium Truck' },
      { size: '10.00-20', width: '254mm', aspect: 'N/A', rim: '20"', type: 'Heavy Truck' },
      { size: '11R22.5', width: '279mm', aspect: 'N/A', rim: '22.5"', type: 'Trailer' },
      { size: '12R22.5', width: '305mm', aspect: 'N/A', rim: '22.5"', type: 'Bus' }
    ]
  }

  const sizeExplanation = {
    width: 'The first number represents the width of the tyre in millimeters.',
    aspect: 'The aspect ratio is the height of the sidewall expressed as a percentage of the width.',
    rim: 'The rim diameter indicates the size of the wheel the tyre is designed to fit.',
    construction: 'R stands for Radial construction, B for Bias-ply, D for Diagonal.',
    load: 'Load index indicates the maximum weight the tyre can carry when properly inflated.',
    speed: 'Speed rating indicates the maximum speed the tyre can safely maintain.'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Tyre Size Guide</h1>
          <p className="text-xl text-muted-foreground">Find the perfect tyre size for your vehicle</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Size Finder */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Size Finder
                </CardTitle>
                <CardDescription>
                  Find the right tyre size for your vehicle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="bike">Bike</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Select value={brand} onValueChange={setBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                      <SelectItem value="hyundai">Hyundai</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="tata">Tata</SelectItem>
                      <SelectItem value="mahindra">Mahindra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="model">Model</Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="swift">Swift</SelectItem>
                      <SelectItem value="i20">i20</SelectItem>
                      <SelectItem value="city">City</SelectItem>
                      <SelectItem value="nexon">Nexon</SelectItem>
                      <SelectItem value="xuv500">XUV500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  Find Tyre Size
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Size Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Understanding Tyre Size */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  Understanding Tyre Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-800 mb-2">195/65R15</div>
                    <p className="text-blue-600">Example tyre size notation</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-600">195</div>
                        <p className="text-sm text-gray-600">Width (mm)</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-600">65</div>
                        <p className="text-sm text-gray-600">Aspect Ratio (%)</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-600">15</div>
                        <p className="text-sm text-gray-600">Rim Diameter (inches)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(sizeExplanation).map(([key, explanation]) => (
                    <div key={key} className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium capitalize">{key}</h4>
                        <p className="text-sm text-muted-foreground">{explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Size Charts */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tyre Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="car" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="car" className="flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      Car
                    </TabsTrigger>
                    <TabsTrigger value="bike" className="flex items-center gap-2">
                      <Bike className="h-4 w-4" />
                      Bike
                    </TabsTrigger>
                    <TabsTrigger value="truck" className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Truck
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="car" className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Size</th>
                            <th className="text-left p-2">Width</th>
                            <th className="text-left p-2">Aspect</th>
                            <th className="text-left p-2">Rim</th>
                            <th className="text-left p-2">Vehicle Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tyreSizes.car.map((tyre, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-medium">{tyre.size}</td>
                              <td className="p-2">{tyre.width}</td>
                              <td className="p-2">{tyre.aspect}</td>
                              <td className="p-2">{tyre.rim}</td>
                              <td className="p-2">
                                <Badge variant="outline">{tyre.type}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="bike" className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Size</th>
                            <th className="text-left p-2">Width</th>
                            <th className="text-left p-2">Aspect</th>
                            <th className="text-left p-2">Rim</th>
                            <th className="text-left p-2">Vehicle Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tyreSizes.bike.map((tyre, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-medium">{tyre.size}</td>
                              <td className="p-2">{tyre.width}</td>
                              <td className="p-2">{tyre.aspect}</td>
                              <td className="p-2">{tyre.rim}</td>
                              <td className="p-2">
                                <Badge variant="outline">{tyre.type}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="truck" className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Size</th>
                            <th className="text-left p-2">Width</th>
                            <th className="text-left p-2">Aspect</th>
                            <th className="text-left p-2">Rim</th>
                            <th className="text-left p-2">Vehicle Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tyreSizes.truck.map((tyre, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-medium">{tyre.size}</td>
                              <td className="p-2">{tyre.width}</td>
                              <td className="p-2">{tyre.aspect}</td>
                              <td className="p-2">{tyre.rim}</td>
                              <td className="p-2">
                                <Badge variant="outline">{tyre.type}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Important Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Important Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Check Your Current Tyres</h4>
                      <p className="text-sm text-muted-foreground">
                        Look at the sidewall of your current tyres to find the size information. 
                        It's usually printed in large numbers like "195/65R15".
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Consult Your Vehicle Manual</h4>
                      <p className="text-sm text-muted-foreground">
                        Your vehicle's owner manual will list the recommended tyre sizes for your specific model.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Check the Door Jamb</h4>
                      <p className="text-sm text-muted-foreground">
                        Many vehicles have a tyre information placard on the driver's side door jamb with recommended sizes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Match All Four Tyres</h4>
                      <p className="text-sm text-muted-foreground">
                        For optimal performance and safety, all four tyres should be the same size and type.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">When in Doubt, Ask</h4>
                      <p className="text-sm text-muted-foreground">
                        If you're unsure about the correct tyre size, contact our customer support or visit a certified tyre dealer.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}