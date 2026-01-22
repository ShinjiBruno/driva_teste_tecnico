set -e
if ! npx prisma migrate deploy 2>&1; then
  
  for migration in prisma/migrations/*/; do
    if [ -d "$migration" ]; then
      migration_name=$(basename "$migration")
      npx prisma migrate resolve --applied "$migration_name" || true
    fi
  done
  
fi

npx tsx prisma/check-and-seed.ts

exec npx tsx src/app.ts
