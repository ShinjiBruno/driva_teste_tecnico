
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

async function checkAndSeed() {
  try {
    const count = await prisma.apiEnrichmentSeed.count();
    
    if (count > 0) {
      console.log(`Base de dados já contém ${count} registros. Seed não será executado.`);
      return;
    }

    console.log('Base de dados vazia. Executando seed...');
    
    const { seedData } = await import('./seed');
    await seedData();
    
    console.log('Seed executado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao verificar/executar seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

checkAndSeed();
