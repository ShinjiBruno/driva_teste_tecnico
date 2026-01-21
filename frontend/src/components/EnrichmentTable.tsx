export default function EnrichmentTable({ initialData }: { initialData: any[] }) {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Workspace</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Contatos</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Duração (min)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
          {initialData.map((item, idx) => (
            <tr 
              key={item.id_enriquecimento} 
              className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
            >
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">{item.nome_workspace}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  {item.tipo_contato}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-900 dark:text-gray-100 font-medium">{item.total_contatos.toLocaleString()}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                  item.processamento_sucesso 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white dark:from-green-500 dark:to-emerald-600' 
                    : 'bg-gradient-to-r from-red-400 to-rose-500 text-white dark:from-red-500 dark:to-rose-600'
                }`}>
                  {item.status_processamento}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-900 dark:text-gray-100 font-mono text-sm">{item.duracao_processamento_minutos.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}