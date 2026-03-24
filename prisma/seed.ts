import bcrypt from "bcryptjs";
import { prisma } from "./client";

async function main() {
  const passwordHash = await bcrypt.hash("@Testing12345", 10);

  await prisma.user.upsert({
    where: { email: "topzyray009@gmail.com" },
    update: {},
    create: {
      name: "Tope Taiwo",
      email: "topzyray009@gmail.com",
      passwordHash,
      role: "FARMER",
      walletBalance: 250000,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
