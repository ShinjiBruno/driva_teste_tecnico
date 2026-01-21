const API_URL = process.env.API_URL || 'http://localhost:3000';
const API_KEY = process.env.API_KEY || '';

export async function getAnalyticsData(endpoint: string) {
  console.log("fetching to : ", `${API_URL}${endpoint}`);
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Falha ao buscar dados da API');
  return res.json();
}