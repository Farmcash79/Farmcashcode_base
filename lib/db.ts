import { PrismaPg } from "@prisma/adapter-pg";
import { envConfig } from "@/config/env.config";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: envConfig.dbUrl,
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      envConfig.environment === "development" ? ["query", "error"] : ["error"],
  });

if (envConfig.environment !== "production") {
  globalForPrisma.prisma = prisma;
}
