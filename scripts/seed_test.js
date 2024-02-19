const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const seedData = async () => {
  try {
    const updateInvoice = await prisma.invoice.update({
      where: {
        id: "c9483db4-de08-4d12-9391-5c03d3a2b90c",
      },
      data: {
        description: 'Fuck Viola the Magnificent',
      },
    })

    console.log(updateInvoice)
  } catch (e) {
    console.log("error occured: " + e);
  }
};

(async () => {
  await seedData();
})();
