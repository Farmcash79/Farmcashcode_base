import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { envConfig } from "@/config/env.config";

const adapter = new PrismaPg({
  connectionString: envConfig.dbUrl,
});

export const prisma = new PrismaClient({ adapter });
