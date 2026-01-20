import express from 'express';
import { authMiddleware } from './middlewares/auth.middleware';
import { getEnrichmentsFromSource } from './services/source.service';
import { getDashboardOverview, getEnrichmentsList } from './services/analytics.service';

const app = express();
app.use(express.json());

app.get('/people/v1/enrichments', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1; 
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100); 

    const result = await getEnrichmentsFromSource(page, limit);
    return res.json(result);
  } catch (error: any) {
    if (error.status === 429) {
      return res.status(429).json({ error: error.message }); 
    }
    return res.status(500).json({ error: 'Erro interno' });
  }
})
.get('/analytics/overview', authMiddleware, async (req, res) =>{
    try{
        const result = await getDashboardOverview();
        return res.json(result);
    }catch{
        return res.status(500).json({ error: 'Erro interno' });
    }
})
.get('/analytics/enrichments', authMiddleware, async (req, res) =>{
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
        
        const result = await getEnrichmentsList(page, limit);
        return res.json(result);
    }catch{
        return res.status(500).json({ error: 'Erro interno' });
    }
})



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});

export default app;