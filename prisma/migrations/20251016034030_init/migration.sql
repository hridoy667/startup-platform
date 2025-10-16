/*
  Warnings:

  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_commentAuthorId_fkey";

-- DropTable
DROP TABLE "comment";

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "commentBody" TEXT NOT NULL,
    "commentAuthorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentAuthorId_fkey" FOREIGN KEY ("commentAuthorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
