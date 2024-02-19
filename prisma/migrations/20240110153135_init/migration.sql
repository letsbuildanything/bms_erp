/*
  Warnings:

  - The `role` column on the `Manager` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'MANAGER';
