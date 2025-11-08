'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Search, HelpCircle, Package, Truck, CreditCard, RotateCcw, Wrench, FileText, Settings } from 'lucide-react'

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const helpCategories = [
    {
      title: 'Order & Shipping',
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
      faqs: [
        {
          question: 'How do I track my order?',
          answer: 'You can track your order by visiting the "Track Order" page and entering your order number and email address. You will also receive tracking information via email once your order ships.'
        },
        {
          question: 'What are the shipping charges?',
          answer: 'Shipping charges vary based on your location and order value. Orders above ₹5,000 qualify for free shipping across India. Standard shipping takes 3-5 business days.'
        },
        {
          question: 'Can I change my shipping address after placing an order?',
          answer: 'Address changes can be made within 2 hours of placing your order. Please contact our customer support team immediately for assistance.'
        }
      ]
    },
    {
      title: 'Returns & Exchanges',
      icon: RotateCcw,
      color: 'bg-green-100 text-green-600',
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for unused products in their original packaging. Please visit our Return Policy page for detailed information.'
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Log into your account, go to "Order History", select the order you want to return, and click "Initiate Return". Follow the instructions provided.'
        },
        {
          question: 'Are there any return charges?',
          answer: 'Return charges apply if the return is due to customer preference. Returns due to product defects or shipping errors are free.'
        }
      ]
    },
    {
      title: 'Payment & Billing',
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept UPI, credit/debit cards, net banking, digital wallets, and cash on delivery. We also offer EMI options for orders above ₹3,000.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, we use industry-standard SSL encryption and secure payment gateways to protect your payment information. We do not store your card details.'
        },
        {
          question: 'Can I get an invoice for my purchase?',
          answer: 'Yes, invoices are automatically generated and sent to your email. You can also download invoices from your account dashboard.'
        }
      ]
    },
    {
      title: 'Products & Services',
      icon: Wrench,
      color: 'bg-orange-100 text-orange-600',
      faqs: [
        {
          question: 'How do I choose the right tyre for my vehicle?',
          answer: 'Use our Tyre Finder tool by entering your vehicle details. You can also contact our customer support for personalized recommendations.'
        },
        {
          question: 'Do you offer installation services?',
          answer: 'Yes, we partner with certified garages across India for professional tyre installation. You can book installation services during checkout.'
        },
        {
          question: 'What warranty do you offer on tyres?',
          answer: 'All tyres come with manufacturer warranty ranging from 3-5 years depending on the brand and model. Warranty details are provided on product pages.'
        }
      ]
    },
    {
      title: 'Account & Technical',
      icon: Settings,
      color: 'bg-red-100 text-red-600',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click "Sign Up" in the top right corner and fill in your details. You can also sign up using Google or Facebook for quick registration.'
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click "Forgot Password" on the login page and enter your email address. You will receive a password reset link via email.'
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Log into your account and go to "My Profile" where you can update your personal information, shipping addresses, and preferences.'
        }
      ]
    },
    {
      title: 'General Information',
      icon: FileText,
      color: 'bg-gray-100 text-gray-600',
      faqs: [
        {
          question: 'Where are your products sourced from?',
          answer: 'We source directly from authorized distributors and manufacturers including MRF, Apollo, JK Tyre, CEAT, and other leading brands.'
        },
        {
          question: 'Do you offer bulk discounts?',
          answer: 'Yes, we offer special pricing for bulk orders, fleet customers, and businesses. Please contact our business team for customized quotes.'
        },
        {
          question: 'How can I become a dealer?',
          answer: 'Visit our "Become a Dealer" page under the Business section and fill out the application form. Our team will review and get back to you.'
        }
      ]
    }
  ]

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground">Find answers to common questions and get the support you need</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {helpCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.faqs.length} helpful articles
                  </p>
                  <Badge variant="outline" className="text-xs">
                    View All
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          {filteredCategories.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No results found</p>
                <p className="text-muted-foreground">Try adjusting your search terms</p>
              </CardContent>
            </Card>
          ) : (
            filteredCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <category.icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Still need help?</CardTitle>
              <CardDescription>
                Our customer support team is ready to assist you
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="secondary" className="text-sm py-2 px-4">
                📞 Call: 1800-123-4567
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                📧 Email: support@jagannathtyre.com
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                💬 Live Chat: Available 9AM-8PM
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}