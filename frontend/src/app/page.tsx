import { getAnalyticsData } from '../lib/api';
import KpiCards from '../components/KpiCards';
import EnrichmentTable from '../components/EnrichmentTable';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';

export const dynamic = 'force-dynamic';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string; workspace?: string };
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1;
  const status =  params.status || '';
  const workspace =  params.workspace || '';

  const query = new URLSearchParams({
    page: currentPage.toString(),
    limit: '10',
    ...(status && { status_processamento: status }),
    ...(workspace && { nome_workspace: workspace }),
  }).toString();

  const [overview, enrichments] = await Promise.all([
    getAnalyticsData('/analytics/overview'),
    getAnalyticsData(`/analytics/enrichments?${query}`),
  ]);

  return (
    <main className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Visibilidade de Enriquecimentos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Monitoramento em tempo real de jobs e métricas</p>
      </div>
      
      <KpiCards data={overview} />

      <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Lista de Jobs (Camada Gold)</h2>
          <Filters />
        </div>

        <EnrichmentTable initialData={enrichments.data} />

        <Pagination 
          currentPage={currentPage} 
          totalPages={enrichments.meta.total_pages} 
        />
      </section>
    </main>
  );
}