import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createTireSizeData = () => {
  const tireSizes = [];
  
  for (let rim = 14; rim <= 22; rim++) {
    for (let width = 145; width <= 385; width += 10) {
      for (let aspectRatio = 30; aspectRatio <= 75; aspectRatio += 5) {
        tireSizes.push({ rimSize: rim, width, aspectRatio});
      }
    }
  }
  
  return tireSizes; // This return statement was missing.
};

async function main() {
  const tireSizes = createTireSizeData();
  console.log(`Start seeding ...`);
  for (const t of tireSizes) {
    const tireSize = await prisma.tireSize.create({
      data: t,
    });
    console.log(`Created tire size with id: ${tireSize.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
