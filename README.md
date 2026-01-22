# Teste Técnico Driva
## Visão geral da solução
A solução consiste em uma arquitetura projetada para coletar, processar e visualizar enriquecimento de dados. 
Isso é feito automatizando a ingestão de API de fonte para o Data warehouse.

- API: simula o sistema de origem com milhares de registros;
- Ingestão: Workflow do n8n coleta os dados da fonte e registra na tabela Bronze;
- Processamento: Workflow do n8n que transforma os dados da Bronze para a Gold;
- Dashboard: Frontned em Nextjs para a visualização de KPIs 

## Como rodar o projeto

Clone o repositório e execute `docker compose up -d --build` na raiz do projeto e os serviços e as aplicações serão instaladas.

Os ports das instâncias são:
- Postgres: 5432
- N8n: http://localhost:5678
- API: http://localhost:3000
- Frontend: http://localhost:3001


### Como configurar os workflows (n8n)
Acesse o n8n em http://localhost:5678.

É preciso criar duas credenciais, uma para o postgres outra para a API:

- **Postgres**:
    - Host: `postgres`
    - Database: `driva_db`
    - User: `user_driva`
    - Password: `password_driva`    

- **Bearer Auth**:
    - Bearer Token: `driva_test_key_abc123xyz789` 

Os workflows (ingestao.json, processamento.json e scheduler.json) estão localizados na pasta `/n8n/workflows` na raiz deste projeto. 

É necessário importar esses JSONs criando novos workflows e publicá-los para ativar.

## Exemplos de Chamadas (Curl)
Todas as requisições requerem autenticação via Bearer Token.

**Para consultar KPIs de Anlytics**
```bash
curl -X GET http://localhost:3000/analytics/overview \ -H "Authorization: Bearer driva_test_key_abc123xyz789"
```

**Para listar os enriquecimentos com paginação**
```bash
curl -X GET "http://localhost:3000/analytics/enrichments?page=1&limit=10" \ 
 -H "Authorization: Bearer driva_test_key_abc123xyz789"
```
**Para simular Fonte de Dados**
```bash
curl -X GET "http://localhost:3000/people/v1/enrichments?page=1&limit=50" \
  -H "Authorization: Bearer driva_test_key_abc123xyz789"
```

## Algumas decisões técnicas
- **Migration da Database**: Foi utilizado Prisma Migrations para evitar o conflito com o esquema do n8n, garantindo a integridade dos dados.
- **Segurança no Frontend**: As requisições de Analytics no frontend são feitas por Server Components no Nextjs, ocultando a chave API no lado do servidor