
interface KpiProps {
  data: {
    total_jobs: number;
    taxa_sucesso: number;
    tempo_medio_processamento_min: number;
  };
}

export default function KpiCards({ data }: KpiProps) {
  const taxaSucessoFormatada = `${data.taxa_sucesso.toFixed(1)}%`;
  const tempoMedioFormatado = `${data.tempo_medio_processamento_min.toFixed(2)} min`;

  const kpis = [
    {
      title: "Total de Jobs",
      value: data.total_jobs,
      description: "Volume total de enriquecimentos", 
      color: "text-blue-600",
    },
    {
      title: "Taxa de Sucesso",
      value: taxaSucessoFormatada,
      description: "Jobs finalizados como CONCLUIDO", 
      color: data.taxa_sucesso > 90 ? "text-green-600" : "text-yellow-600",
    },
    {
      title: "Tempo Médio",
      value: tempoMedioFormatado,
      description: "Média de processamento por job", 
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpis.map((kpi, index) => (
        <div 
          key={index} 
          className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1"
        >
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{kpi.title}</p>
          <p className={`text-4xl font-bold mt-3 ${kpi.color} dark:brightness-125 transition-all group-hover:scale-105`}>{kpi.value}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{kpi.description}</p>
          <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      ))}
    </div>
  );
}