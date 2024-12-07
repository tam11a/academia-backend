-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('PLANNED', 'ENROLLING', 'ONGOING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SectionStatus" AS ENUM ('PLANNED', 'ENROLLING', 'ONGOING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('PENDING', 'ENROLLED', 'DROPPED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "FacultyRole" AS ENUM ('INSTRUCTOR', 'TEACHING_ASSISTANT');

-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('FILE', 'IMAGE', 'VIDEO', 'LINK');

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "course_title" TEXT NOT NULL,
    "course_description" TEXT,
    "course_cover_url" TEXT,
    "course_start_date" TIMESTAMP(3) NOT NULL,
    "course_end_date" TIMESTAMP(3) NOT NULL,
    "course_code" TEXT NOT NULL,
    "course_credits" DOUBLE PRECISION NOT NULL,
    "course_status" "CourseStatus" NOT NULL DEFAULT 'PLANNED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSection" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "section_title" TEXT NOT NULL,
    "section_description" TEXT,
    "section_start_date" TIMESTAMP(3) NOT NULL,
    "section_end_date" TIMESTAMP(3) NOT NULL,
    "section_total_seats" INTEGER NOT NULL,
    "section_status" "SectionStatus" NOT NULL DEFAULT 'PLANNED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSectionEnrollment" (
    "id" SERIAL NOT NULL,
    "section_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "enrollment_status" "EnrollmentStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseSectionEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSectionFacultyAssignment" (
    "id" SERIAL NOT NULL,
    "section_id" INTEGER NOT NULL,
    "faculty_id" INTEGER NOT NULL,
    "faculty_role" "FacultyRole" NOT NULL DEFAULT 'INSTRUCTOR',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseSectionFacultyAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSectionMaterial" (
    "id" SERIAL NOT NULL,
    "section_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "material_type" "MaterialType" NOT NULL DEFAULT 'FILE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseSectionMaterial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseSection" ADD CONSTRAINT "CourseSection_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSectionEnrollment" ADD CONSTRAINT "CourseSectionEnrollment_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "CourseSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSectionEnrollment" ADD CONSTRAINT "CourseSectionEnrollment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSectionFacultyAssignment" ADD CONSTRAINT "CourseSectionFacultyAssignment_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "CourseSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSectionFacultyAssignment" ADD CONSTRAINT "CourseSectionFacultyAssignment_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSectionMaterial" ADD CONSTRAINT "CourseSectionMaterial_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "CourseSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
