import { db } from "./prisma";

// export async function fetchRevenue() {
//   try {
//     await new Promise((resolve) => setTimeout(resolve, 3000));
//     const data = await db.revenue.findMany();
//     return data;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Error in fetching data from database!");
//   }
// }

// export async function fetchLatestInvoices() {
//   try {
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     const unstructuredData = await db.invoice.findMany({
//       orderBy: {
//         date: "desc",
//       },
//       take: 5,
//       select: {
//         amount: true,
//         id: true,
//         customer: {
//           select: {
//             name: true,
//             image_url: true,
//             email: true,
//           },
//         },
//       },
//     });

//     const structuredData = unstructuredData.map((data) => {
//       return {
//         id: data.id,
//         amount: formatCurrency(data.amount),
//         ...data.customer,
//       };
//     });

//     return structuredData;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Error in fetching data from Database!");
//   }
// }

// export async function fetchCardData() {
//   try {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     const invoiceCountPromise = await db.invoice.count();
//     const customerCountPromise = await db.customer.count();
//     const pendingAggregateInput: db.InvoiceAggregateArgs = {
//       where: {
//         status: "pending",
//       },
//       _sum: {
//         amount: true,
//       },
//     };
//     const paidAggregateInput: db.InvoiceAggregateArgs = {
//       where: {
//         status: "paid",
//       },
//       _sum: {
//         amount: true,
//       },
//     };
//     type MyAggregatePayload = db.GetInvoiceAggregateType<
//       typeof pendingAggregateInput
//     >;
//     const invoicePendingSumPromise: MyAggregatePayload =
//       await db.invoice.aggregate(pendingAggregateInput);
//     const invoicePaidSumPromise: MyAggregatePayload =
//       await db.invoice.aggregate(paidAggregateInput);

//     return {
//       invoiceCountPromise,
//       customerCountPromise,
//       pendingAmount: formatCurrency(
//         invoicePendingSumPromise?._sum?.amount || 0
//       ),
//       paidAmount: formatCurrency(invoicePaidSumPromise?._sum?.amount || 0),
//     };
//   } catch (error) {
//     console.error("Database error:", error);
//     throw new Error("Error in fetching data from Database!");
//   }
// }

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await db.invoice.findMany({
      where: {
        OR: [
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          
        ],
      },
      select: {
        id: true,
        expense: true,
        amount: true,
        date: true,
        description: true,
        imgUrl: true
      },
      orderBy: {
        date: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return invoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchInvoices() {

  try {
    const invoices = await db.invoice.findMany();

    return invoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchWorks() {

  try {
    const invoices = await db.work.findMany();

    return invoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchEmployees() {
  try {
    const employees = await db.employee.findMany();

    return employees;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}


export async function fetchInvoicesPages(query: string) {
  try {
    const count = await db.invoice.count({
      where: {
        OR: [
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          }
        ],
      },
      // You may need to include logic for joining with the customers table
    });

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}


export async function fetchInvoiceByDate(fromDate: Date, toDate: Date){

  try {
    const invoices = await db.invoice.findMany({
      where: {
        date: {
          gte: fromDate,
          lte: toDate
        }
      },
    });

    return invoices;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

export async function fetchWorksByDate(fromDate: Date, toDate: Date){

  try {
    const invoices = await db.work.findMany({
      where: {
        date: {
          gte: fromDate,
          lte: toDate
        }
      },
      
    });

    return invoices;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

db.$disconnect();
