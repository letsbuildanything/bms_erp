-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PRESENT', 'ABSENT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGER', 'ASSISTANT_MANAGER', 'DRIVER', 'OPERATOR', 'LABOUR', 'COOK', 'NOT_MENTIONED');

-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('DIESEL', 'MAINTENANCE', 'MANAGER_ACCOM', 'STAFF_CREDIT', 'RATION', 'LPG_GAS', 'MEDICAL', 'PAYROLL', 'MISC');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'DUE');

-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "joinDate" DATE NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MANAGER',

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'NOT_MENTIONED',
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,
    "joiningDate" DATE NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "vehicleNum" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "expense" "ExpenseType" NOT NULL DEFAULT 'MISC',
    "amount" DOUBLE PRECISION NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "employeeId" TEXT,
    "managerId" TEXT,
    "vehicleId" TEXT,
    "description" TEXT NOT NULL,
    "imgUrl" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "location" TEXT NOT NULL,
    "depth" DOUBLE PRECISION NOT NULL,
    "casing7Inch" INTEGER NOT NULL,
    "casing6Inch" INTEGER NOT NULL,
    "casing5Inch" INTEGER NOT NULL,
    "msCasing" INTEGER NOT NULL,
    "srpm" INTEGER NOT NULL,
    "erpm" INTEGER NOT NULL,
    "hour" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "loringRate" DOUBLE PRECISION NOT NULL,
    "step" INTEGER NOT NULL,
    "c7Rate" DOUBLE PRECISION NOT NULL,
    "c6Rate" DOUBLE PRECISION NOT NULL,
    "c5Rate" DOUBLE PRECISION NOT NULL,
    "mscRate" DOUBLE PRECISION NOT NULL,
    "billAmount" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'DUE',
    "remarks" TEXT,
    "transactionImg" TEXT,
    "vehicleId" TEXT,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "employeeId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ABSENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payroll" (
    "id" TEXT NOT NULL,
    "fromDate" DATE NOT NULL,
    "toDate" DATE NOT NULL,
    "presentDays" INTEGER NOT NULL,
    "absentDays" INTEGER NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "dailyWage" DOUBLE PRECISION NOT NULL,
    "deduction" DOUBLE PRECISION NOT NULL,
    "netSalary" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'DUE',
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_contact_key" ON "Manager"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_contact_key" ON "Employee"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vehicleNum_key" ON "Vehicle"("vehicleNum");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_managerId_key" ON "Vehicle"("managerId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
