import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Brands from '@/components/Brands'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Brands />
      <h1>At Home Tyre - Main Page</h1>
      <p>Testing with Header, Hero, Features, and Brands components</p>
    </div>
  )
}