/*
  Warnings:

  - You are about to drop the column `section_end_date` on the `CourseSection` table. All the data in the column will be lost.
  - You are about to drop the column `section_start_date` on the `CourseSection` table. All the data in the column will be lost.
  - You are about to drop the column `section_status` on the `CourseSection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CourseSection" DROP COLUMN "section_end_date",
DROP COLUMN "section_start_date",
DROP COLUMN "section_status";

-- DropEnum
DROP TYPE "SectionStatus";
