const { PrismaClient } = require("@prisma/client");
const Data = require("./employee.json");

const { z } = require("zod");

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
const Schema = z.object({
  date: z.string().transform((str) => new Date(str)),
  location: z.string(),
  depth: z.number(),
  casing7Inch: z.number(),
  casing6Inch: z.number(),
  casing5Inch: z.number(),
  msCasing: z.number(),
  srpm: z.number(),
  erpm: z.number(),
  hour: z.number(),
  rate: z.number(),
  loringRate: z.number(),
  step: z.number(),
  c7Rate: z.number(),
  c6Rate: z.number(),
  c5Rate: z.number(),
  mscRate: z.number(),
  billAmount: z.number(),
  status: z.enum(["PAID", "DUE"]),
  remarks: z.string(),
  transactionImg: z.string()
});

const prisma = new PrismaClient();

const seedData = async () => {
  try {
    await prisma.employee.createMany({
      data: Data
    });
  } catch (e) {
    console.log("error occured: " + e);
  }
};

(async () => {
  await seedData();
})();
