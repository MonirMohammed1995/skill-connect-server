import { prisma } from "../lib/prisma";

async function seedAdmin() {
  await prisma.user.create({
    data: {
      email: "admin@skillconnect.com",
      role: "ADMIN",
    },
  });
}

seedAdmin();
