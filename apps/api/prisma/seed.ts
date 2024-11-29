import prisma from '../src/prisma';
import { users_role } from '@prisma/client';
import { categories, products, users, productStock } from './seed.json';
const seedUser = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < users.length; i++) {
      await trx.user.upsert({
        where: {
          id: users[i].id,
        },
        create: {
          email: users[i].email,
          password: users[i].password,
          role: users[i].role as unknown as users_role,
          name: users[i].name,
          phone_number: users[i].phone_number,
          createdAt: new Date(),
          isVerified: users[i].isVerified,
        },
        update: {
          email: users[i].email,
          password: users[i].password,
          role: users[i].role as unknown as users_role,
          name: users[i].name,
          phone_number: users[i].phone_number,
          isVerified: users[i].isVerified,
          updatedAt: new Date(),
        },
      });
    }
  });
};

const seedCategories = async () => {
  await prisma.$transaction(async (trx) => {
    for (const category of categories) {
      await trx.category.upsert({
        where: { id: category.id },
        create: category,
        update: category,
      });
    }
  });
};

const seedProducts = async () => {
  await prisma.$transaction(async (trx) => {
    for (const product of products) {
      await trx.product.upsert({
        where: { id: product.id },
        create: {
          productName: product.name,
          category_id: product.category_id,
          description: product.description,
          price: product.price,
        },
        update: product,
      });
    }
  });
};

const seedProductStocks = async () => {
  await prisma.$transaction(async (trx) => {
    for (const stock of productStock) {
      await trx.productStock.upsert({
        where: { id: stock.id },
        create: stock,
        update: stock,
      });
    }
  });
};

const main = async () => {
  console.log('Starting seeding...');

  await seedUser();
  console.log('Seeded Users');

  await seedCategories();
  console.log('Seeded Categories');

  await seedProducts();
  console.log('Seeded Products');

  await seedProductStocks();
  console.log('Seeded Product Stocks');

  console.log('Seeding process completed.');
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error occurred during seeding:');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
