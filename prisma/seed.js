import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@boatspark.com" },
    update: {},
    create: {
      username: "admin",
      password: "$2a$10$gGAzAuxlgCfMBaa.Ty2FcuPvtY/UCaNwPXEyFQ.j5ChTmJfpKJqmq",
      email: "admin@boatspark.com",
      Device: {
        create: {
          coreid: process.env.METRICS_ID || "unknown",
          vesselName: "HMS Victory",
        },
      },
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
