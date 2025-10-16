/*
  Warnings:

  - Added the required column `type` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('UPVOAT', 'DOWNVOAT');

-- AlterTable
ALTER TABLE "Reaction" ADD COLUMN     "type" "ReactionType" NOT NULL;
