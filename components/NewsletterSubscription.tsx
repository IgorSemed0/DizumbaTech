"use client"

import { useState, useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface Category {
  id: number
  vc_name: string
}

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingCategories, setIsFetchingCategories] = useState(true)
  const [message, setMessage] = useState({ text: '', isError: false })

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/newsletter/categories')
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const data = await response.json()
        if (data.success && data.data) {
          setCategories(data.data)
        } else {
          // Fallback categories if API fails
          setCategories([
            { id: 1, vc_name: 'Programação' },
            { id: 2, vc_name: 'Segurança' },
            { id: 3, vc_name: 'Hardware' },
            { id: 4, vc_name: 'Software' },
            { id: 5, vc_name: 'IA & Machine Learning' }
          ])
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Fallback categories if API fails
        setCategories([
          { id: 1, vc_name: 'Programação' },
          { id: 2, vc_name: 'Segurança' },
          { id: 3, vc_name: 'Hardware' },
          { id: 4, vc_name: 'Software' },
          { id: 5, vc_name: 'IA & Machine Learning' }
        ])
      } finally {
        setIsFetchingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!termsAccepted) {
      setMessage({ text: 'Por favor, aceite os termos e condições.', isError: true })
      return
    }

    setIsLoading(true)
    setMessage({ text: '', isError: false })

    try {
      const response = await fetch('https://dizumbatech-master-rmve28.laravel.cloud/api/v1/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          categories: selectedCategories,
          source: 'website'
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setMessage({ text: 'Inscrição na newsletter realizada com sucesso!', isError: false })
        setEmail('')
        setName('')
        setSelectedCategories([])
        setTermsAccepted(false)
      } else {
        setMessage({ text: data.message || 'Ocorreu um erro. Por favor, tente novamente.', isError: true })
      }
    } catch (error) {
      setMessage({ text: 'Erro ao conectar com o servidor. Por favor, tente novamente mais tarde.', isError: true })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 my-8 w-full max-w-2xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subscreva a nossa newsletter</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Receba as últimas novidades e tutoriais da Dizumba Tech no seu email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="seu-email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categorias de interesse
          </label>
          {isFetchingCategories ? (
            <div className="text-sm text-gray-500 dark:text-gray-400">A carregar categorias...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    id={`category-${category.id}`}
                    name={`category-${category.id}`}
                    type="checkbox"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    {category.vc_name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-start">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded mt-1"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Eu aceito os <a href="/terms" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">termos e condições</a> e a <a href="/privacy" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">política de privacidade</a>.
          </label>
        </div>

        {message.text && (
          <div className={`mt-2 ${message.isError ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'} flex items-center`}>
            {message.isError ? (
              <XCircleIcon className="h-5 w-5 mr-1" />
            ) : (
              <CheckCircleIcon className="h-5 w-5 mr-1" />
            )}
            <p className="text-sm">{message.text}</p>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'A processar...' : 'Subscrever'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsletterSubscription