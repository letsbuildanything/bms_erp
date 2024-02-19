/*
  Warnings:

  - You are about to drop the column `joiningDate` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `joined` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joined` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "joiningDate",
ADD COLUMN     "joined" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "terminated" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "joined" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "terminated" TIMESTAMP(3),
ALTER COLUMN "joinDate" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Payroll" ALTER COLUMN "fromDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "toDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Work" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);
