import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.apiEnrichmentSeed.deleteMany();

  const statusOptions = ["PROCESSING", "COMPLETED", "FAILED", "CANCELED"];
  const contactTypes = ["PERSON", "COMPANY"];

  const workspaces = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
  }));

  const enrichments = Array.from({ length: 2000 }).map(() => {
    const workspace = faker.helpers.arrayElement(workspaces);
    const createdAt = faker.date.past({ years: 1 });
    const updatedAt = new Date(
      createdAt.getTime() + faker.number.int({ min: 1, max: 60 }) * 60000
    );

    return {
      id: faker.string.uuid(),
      id_workspace: workspace.id,
      workspace_name: workspace.name,
      total_contacts: faker.number.int({ min: 1, max: 2000 }),
      contact_type: faker.helpers.arrayElement(contactTypes),
      status: faker.helpers.arrayElement(statusOptions),
      created_at: createdAt,
      updated_at: updatedAt,
    };
  });

  await prisma.apiEnrichmentSeed.createMany({
    data: enrichments,
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
