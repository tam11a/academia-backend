/*
  Warnings:

  - You are about to drop the column `description` on the `CourseSectionMaterial` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `CourseSectionMaterial` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `CourseSectionMaterial` table. All the data in the column will be lost.
  - Added the required column `material_title` to the `CourseSectionMaterial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material_url` to the `CourseSectionMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseSectionMaterial" DROP COLUMN "description",
DROP COLUMN "title",
DROP COLUMN "url",
ADD COLUMN     "material_description" TEXT,
ADD COLUMN     "material_title" TEXT NOT NULL,
ADD COLUMN     "material_url" TEXT NOT NULL;
