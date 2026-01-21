'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set('page', '1'); 
    router.push(`?${params.toString()}`);
    router.refresh();
  };

  return (
    <div className="flex gap-3">
      <select 
        onChange={(e) => handleFilterChange('status', e.target.value)}
        className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
        defaultValue={searchParams.get('status') || ""}
      >
        <option value="">Todos os Status</option>
        <option value="CONCLUIDO">Concluído</option>
        <option value="FALHOU">Falhou</option>
        <option value="EM_PROCESSAMENTO">Processando</option>
        <option value="CANCELADO">Cancelado</option>
      </select>
      
      <input 
        type="text"
        placeholder="Buscar workspace..."
        className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors min-w-[200px]"
        onKeyDown={(e) => { if(e.key === 'Enter') handleFilterChange('workspace', e.currentTarget.value) }}
        defaultValue={searchParams.get('workspace') || ""}
      />
    </div>
  );
}