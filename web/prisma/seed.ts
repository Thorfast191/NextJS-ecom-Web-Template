import "dotenv/config";

import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: Role.ADMIN,
      isActive: true,
    },
    create: {
      name: "Admin",
      email,
      password: hashedPassword,
      role: Role.ADMIN,
      isActive: true,
    },
  });

  console.log(`✅ Admin user "${email}" created/updated.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
