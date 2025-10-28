'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Globe } from 'lucide-react'
import { i18n, Language } from '@/lib/i18n'

interface LanguageSelectorProps {
  variant?: 'select' | 'dropdown' | 'buttons'
  className?: string
}

export default function LanguageSelector({ variant = 'select', className = '' }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(i18n.getCurrentLanguage())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(i18n.getCurrentLanguage())
    }

    window.addEventListener('languageChange', handleLanguageChange)
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange)
    }
  }, [])

  const handleLanguageChange = (language: Language) => {
    i18n.setLanguage(language)
    setCurrentLanguage(language)
    
    // Dispatch custom event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChange', { detail: { language } }))
    }
  }

  const languages = i18n.getAvailableLanguages()

  if (variant === 'buttons') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={currentLanguage === lang.code ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center gap-2"
          >
            <span>{lang.nativeName}</span>
            {currentLanguage === lang.code && (
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            )}
          </Button>
        ))}
      </div>
    )
  }

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          <span>{languages.find(l => l.code === currentLanguage)?.nativeName || 'English'}</span>
        </Button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
            <div className="p-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageChange(lang.code)
                    setIsOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{lang.nativeName}</div>
                    <div className="text-sm text-gray-500">{lang.name}</div>
                  </div>
                  {currentLanguage === lang.code && (
                    <Badge variant="secondary" className="text-xs">
                      ✓
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Default select variant
  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className={`w-[180px] ${className}`}>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center justify-between w-full">
              <span>{lang.nativeName}</span>
              <span className="text-sm text-gray-500 ml-2">{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}