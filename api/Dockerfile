FROM node:20-bookworm-slim AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
RUN npm run prisma:generate


FROM node:20-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/package.json /app/package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY src ./src

RUN npm prune --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start"]
