'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { ViewToggle } from '@/components/view-toggle'
import { DataTable } from '@/components/data-table'
import { CardGrid } from '@/components/card-grid'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pagination } from '@/components/pagination'
import { useSearchPagination } from '@/hooks/use-search-pagination'

type Product = {
  id: string
  sellerPhone: string
  rawName: string | null
  rawDescription: string | null
  currency: string | null
  availability: string | null
  imageCount: number | null
  modelName: string | null
  storageGb: string | null
  color: string | null
  warranty: string | null
  isActive: boolean
  firstSeenAt: Date
  lastSeenAt: Date
  lastPriceChangeAt: Date | null
  seller: {
    phoneNumber: string
    name: string | null
    city: string | null
  }
}

interface ProductsViewProps {
  products: Product[]
}

export function ProductsView({ products }: ProductsViewProps) {
  const [view, setView] = useState<'table' | 'cards'>('table')

  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    filteredData,
    handlePageChange,
    handleItemsPerPageChange,
  } = useSearchPagination(
    products,
    (product) => [
      product.id,
      product.rawName || '',
      product.rawDescription || '',
      product.modelName || '',
      product.storageGb || '',
      product.color || '',
      product.seller.name || '',
      product.seller.phoneNumber,
    ],
    10
  )

  const tableColumns = [
    {
      key: 'id',
      header: 'ID',
      render: (product: Product) => (
        <span className="font-mono text-xs">{product.id.slice(0, 8)}...</span>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      render: (product: Product) => product.rawName || product.modelName || '-',
    },
    {
      key: 'seller',
      header: 'Seller',
      render: (product: Product) => product.seller.name || product.seller.phoneNumber,
    },
    {
      key: 'model',
      header: 'Model',
      render: (product: Product) => product.modelName || '-',
    },
    {
      key: 'storage',
      header: 'Storage',
      render: (product: Product) => product.storageGb || '-',
    },
    {
      key: 'color',
      header: 'Color',
      render: (product: Product) => product.color || '-',
    },
    {
      key: 'status',
      header: 'Status',
      render: (product: Product) => (
        <Badge variant={product.isActive ? 'default' : 'secondary'}>
          {product.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'lastSeen',
      header: 'Last Seen',
      render: (product: Product) => new Date(product.lastSeenAt).toLocaleDateString(),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Products"
          description="View and manage all products"
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredData.length}
          totalCount={products.length}
        />
        <ViewToggle value={view} onValueChange={setView} />
      </div>

      {view === 'table' ? (
        <>
          <DataTable data={paginatedData} columns={tableColumns} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      ) : (
        <>
          <CardGrid
            data={paginatedData}
            renderCard={(product: Product) => (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {product.rawName || product.modelName || 'Unnamed Product'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Seller:</span>
                    <p className="font-medium">{product.seller.name || product.seller.phoneNumber}</p>
                  </div>
                  {product.modelName && (
                    <div>
                      <span className="text-sm text-muted-foreground">Model:</span>
                      <p className="font-medium">{product.modelName}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    {product.storageGb && (
                      <span className="text-sm">{product.storageGb}</span>
                    )}
                    {product.color && (
                      <span className="text-sm">• {product.color}</span>
                    )}
                  </div>
                  <div>
                    <Badge variant={product.isActive ? 'default' : 'secondary'}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pt-2">
                    Last seen: {new Date(product.lastSeenAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            )}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
    </div>
  )
}

