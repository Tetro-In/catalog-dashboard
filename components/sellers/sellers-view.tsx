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
import type { Seller } from '@prisma/client'

interface SellersViewProps {
  sellers: Seller[]
}

export function SellersView({ sellers }: SellersViewProps) {
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
    sellers,
    (seller) => [
      seller.phoneNumber,
      seller.name || '',
      seller.city || '',
      seller.isActive ? 'active' : 'inactive',
    ],
    10
  )

  const tableColumns = [
    {
      key: 'phoneNumber',
      header: 'Phone Number',
      render: (seller: Seller) => seller.phoneNumber,
    },
    {
      key: 'name',
      header: 'Name',
      render: (seller: Seller) => seller.name || '-',
    },
    {
      key: 'city',
      header: 'City',
      render: (seller: Seller) => seller.city || '-',
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (seller: Seller) => (
        <Badge variant={seller.isActive ? 'default' : 'secondary'}>
          {seller.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (seller: Seller) =>
        new Date(seller.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Sellers"
          description="Manage and view all sellers in the system"
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredData.length}
          totalCount={sellers.length}
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
            renderCard={(seller: Seller) => (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{seller.name || 'Unnamed Seller'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Phone:</span>
                    <p className="font-medium">{seller.phoneNumber}</p>
                  </div>
                  {seller.city && (
                    <div>
                      <span className="text-sm text-muted-foreground">City:</span>
                      <p className="font-medium">{seller.city}</p>
                    </div>
                  )}
                  <div>
                    <Badge variant={seller.isActive ? 'default' : 'secondary'}>
                      {seller.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pt-2">
                    Created: {new Date(seller.createdAt).toLocaleDateString()}
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

