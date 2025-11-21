import { prisma } from './prisma';

export async function getSellers() {
  return await prisma.seller.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProducts() {
  return await prisma.product.findMany({
    include: {
      seller: {
        select: {
          phoneNumber: true,
          name: true,
          city: true,
        },
      },
    },
    orderBy: { lastSeenAt: 'desc' },
  });
}

export async function getProductHistory() {
  return await prisma.productHistory.findMany({
    include: {
      product: {
        select: {
          id: true,
          rawName: true,
          seller: {
            select: {
              phoneNumber: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: { recordedAt: 'desc' },
  });
}

export async function getScanLogs() {
  return await prisma.scanLog.findMany({
    include: {
      seller: {
        select: {
          phoneNumber: true,
          name: true,
          city: true,
        },
      },
    },
    orderBy: { scanTime: 'desc' },
  });
}

type RawSellerMetric = {
  seller_phone: string;
  seller_name: string | null;
  city: string | null;
  total_listings_history: bigint | number;
  current_active_listings: bigint | number;
  catalog_quality_score: any;
  avg_listings_recent: any;
  last_scan_date: Date | null;
};

export async function getSellerMetrics() {
  const rawMetrics = await prisma.$queryRaw<RawSellerMetric[]>`
    SELECT * FROM seller_metrics_view
    ORDER BY seller_phone
  `;

  return rawMetrics.map((metric) => ({
    ...metric,
    total_listings_history: Number(metric.total_listings_history ?? 0),
    current_active_listings: Number(metric.current_active_listings ?? 0),
    catalog_quality_score: Number(metric.catalog_quality_score ?? 0),
    avg_listings_recent:
      metric.avg_listings_recent === null || metric.avg_listings_recent === undefined
        ? null
        : Number(metric.avg_listings_recent),
  }));
}

