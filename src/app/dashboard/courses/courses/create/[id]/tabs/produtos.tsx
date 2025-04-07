'use client'

import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input/input'

// Product interface
interface Product {
  id: number
  status: string
  produto: string
  tipo: string
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 8,
    status: 'Publicado',
    produto: 'Tráfego Pago - Estratégias e Aplicações',
    tipo: 'Assinatura',
  },
  {
    id: 7,
    status: 'Publicado',
    produto: 'Certificado de Conclusão',
    tipo: 'Certificado',
  },
  {
    id: 6,
    status: 'Publicado',
    produto: 'Marketing do 0 a 100',
    tipo: 'Assinatura',
  },
  {
    id: 5,
    status: 'Publicado',
    produto: 'Jornada do Marketing Digital',
    tipo: 'Combo',
  },
  {
    id: 4,
    status: 'Publicado',
    produto: 'Estratégias com Inbound Marketing',
    tipo: 'Combo',
  },
]

export default function Produtos() {
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Handler for search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Open add product modal
  const openAddProductModal = () => {
    setShowModal(true)
  }

  // Close add product modal
  const closeAddProductModal = () => {
    setShowModal(false)
  }

  // Handle product removal
  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  // Pagination: get current products
  const currentProducts = products

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-primary text-xl font-medium mb-1">Produtos</h2>
        <p className="text-gray-600 mb-4">Produtos vinculados neste curso.</p>

        <div className="flex justify-between mb-4">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Pesquisar por produtos..."
              className="pr-10 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-4 h-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={openAddProductModal}
            className="bg-primary text-white rounded-md px-4 py-2 flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            NOVO
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PRODUTO
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TIPO
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  REMOVER
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.id}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.produto}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.tipo}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <p>Não há dados</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {products.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Total de {products.length} registros.
            </p>
            <div className="flex items-center space-x-2">
              <button
                className="p-2 border rounded"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt;
              </button>
              <span className="px-4 py-2 bg-white border rounded">
                {currentPage}
              </span>
              <button
                className="p-2 border rounded"
                disabled={currentProducts.length < itemsPerPage}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                &gt;
              </button>
              <select
                className="p-2 border rounded text-sm"
                defaultValue={itemsPerPage}
                onChange={() => {}}
              >
                <option value={10}>10 / página</option>
                <option value={25}>25 / página</option>
                <option value={50}>50 / página</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Adicionar produtos
              </h3>
              <button
                onClick={closeAddProductModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Pesquisar por produtos..."
                  className="w-full"
                  defaultValue=""
                />
              </div>

              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="w-10 px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STATUS
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PRODUTO
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TIPO
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sampleProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {product.id}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {product.produto}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {product.tipo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-600">
                  Total de {sampleProducts.length} registros.
                </p>
                <div className="flex items-center space-x-2">
                  <button className="p-2 border rounded">&lt;</button>
                  <span className="px-4 py-2 bg-white border rounded">1</span>
                  <button className="p-2 border rounded">&gt;</button>
                  <select
                    className="p-2 border rounded text-sm"
                    defaultValue="10"
                  >
                    <option value="10">10 / página</option>
                    <option value="25">25 / página</option>
                    <option value="50">50 / página</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end space-x-4">
              <button
                onClick={closeAddProductModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              >
                CANCELAR
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-md flex items-center">
                <svg
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                ADICIONAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
