'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Users, 
  Package, 
  History, 
  FileText, 
  BarChart3 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Sellers', href: '/sellers', icon: Users },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Product History', href: '/product-history', icon: History },
  { name: 'Scan Logs', href: '/scan-logs', icon: FileText },
  { name: 'Seller Metrics', href: '/metrics', icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

