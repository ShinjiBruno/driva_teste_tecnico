import { PrismaClient} from "../../prisma/generated/client"

const prisma = new PrismaClient();

export const getEnrichmentsFromSource = async (page: number, limit: number) => {

  if (Math.random() < 0.1) {
    throw { status: 429, message: 'Too Many Requests' };
  }

  const skip = (page - 1) * limit;

  const [items, totalItems] = await prisma.$transaction([
    prisma.apiEnrichmentSeed.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    }),
    prisma.apiEnrichmentSeed.count(),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return {
    meta: {
      current_page: page, 
      items_per_page: limit, 
      total_items: totalItems, 
      total_pages: totalPages, 
    },
    data: items, 
  };
};