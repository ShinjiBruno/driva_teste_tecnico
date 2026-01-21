-- CreateTable
CREATE TABLE IF NOT EXISTS "api_enrichments_seed" (
    "id" TEXT NOT NULL,
    "id_workspace" TEXT NOT NULL,
    "workspace_name" TEXT NOT NULL,
    "total_contacts" INTEGER NOT NULL,
    "contact_type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "api_enrichments_seed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "bronze_enrichments" (
    "id" TEXT NOT NULL,
    "id_workspace" TEXT NOT NULL,
    "workspace_name" TEXT NOT NULL,
    "total_contacts" INTEGER NOT NULL,
    "contact_type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "dw_ingested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dw_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bronze_enrichments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "gold_enrichments" (
    "id_enriquecimento" TEXT NOT NULL,
    "id_workspace" TEXT NOT NULL,
    "nome_workspace" TEXT NOT NULL,
    "total_contatos" INTEGER NOT NULL,
    "tipo_contato" TEXT NOT NULL,
    "status_processamento" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "duracao_processamento_minutos" DOUBLE PRECISION NOT NULL,
    "tempo_por_contato_minutos" DOUBLE PRECISION NOT NULL,
    "processamento_sucesso" BOOLEAN NOT NULL,
    "categoria_tamanho_job" TEXT NOT NULL,
    "necessita_reprocessamento" BOOLEAN NOT NULL,
    "data_atualizacao_dw" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gold_enrichments_pkey" PRIMARY KEY ("id_enriquecimento")
);
