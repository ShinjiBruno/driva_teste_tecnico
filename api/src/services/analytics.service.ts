import { PrismaClient } from "../../prisma/generated/client";

const prisma = new PrismaClient();

export const getDashboardOverview = async () => {
  const stats = await prisma.goldEnrichment.aggregate({
    _count: { id_enriquecimento: true },
    _avg: { duracao_processamento_minutos: true },
  });

  const totalJobs = stats._count.id_enriquecimento || 0;

  const sucessos = await prisma.goldEnrichment.count({
    where: { status_processamento: 'CONCLUIDO' }
  });

  const distribuicaoTamanho = await prisma.goldEnrichment.groupBy({
    by: ['categoria_tamanho_job'],
    _count: { id_enriquecimento: true },
  });

  return {
    total_jobs: totalJobs, 
    taxa_sucesso: totalJobs > 0 ? (sucessos / totalJobs) * 100 : 0, 
    tempo_medio_processamento_min: stats._avg.duracao_processamento_minutos || 0, 
    distribuicao_categoria: distribuicaoTamanho, 
  };
};

export const getEnrichmentsList = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [items, totalItems] = await prisma.$transaction([
    prisma.goldEnrichment.findMany({
      skip,
      take: limit,
      orderBy: { data_criacao: 'desc' },
    }),
    prisma.goldEnrichment.count(),
  ]);

  return {
    meta: {
      current_page: page,
      total_items: totalItems,
      total_pages: Math.ceil(totalItems / limit),
    },
    data: items,
  };
};

export const getTopWorkspaces = async () => {
  return await prisma.goldEnrichment.groupBy({
    by: ['nome_workspace'],
    _sum: { total_contatos: true },
    _count: { id_enriquecimento: true },
    orderBy: {
      _count: { id_enriquecimento: 'desc' },
    },
    take: 5,
  });
};