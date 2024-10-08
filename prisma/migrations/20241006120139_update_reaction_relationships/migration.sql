/*
  Warnings:

  - You are about to drop the `_Awesomes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Cutes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventParticipants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventWinners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Surprises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Awesomes" DROP CONSTRAINT "_Awesomes_A_fkey";

-- DropForeignKey
ALTER TABLE "_Awesomes" DROP CONSTRAINT "_Awesomes_B_fkey";

-- DropForeignKey
ALTER TABLE "_Cutes" DROP CONSTRAINT "_Cutes_A_fkey";

-- DropForeignKey
ALTER TABLE "_Cutes" DROP CONSTRAINT "_Cutes_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventParticipants" DROP CONSTRAINT "_EventParticipants_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventParticipants" DROP CONSTRAINT "_EventParticipants_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventWinners" DROP CONSTRAINT "_EventWinners_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventWinners" DROP CONSTRAINT "_EventWinners_B_fkey";

-- DropForeignKey
ALTER TABLE "_Likes" DROP CONSTRAINT "_Likes_A_fkey";

-- DropForeignKey
ALTER TABLE "_Likes" DROP CONSTRAINT "_Likes_B_fkey";

-- DropForeignKey
ALTER TABLE "_Surprises" DROP CONSTRAINT "_Surprises_A_fkey";

-- DropForeignKey
ALTER TABLE "_Surprises" DROP CONSTRAINT "_Surprises_B_fkey";

-- DropTable
DROP TABLE "_Awesomes";

-- DropTable
DROP TABLE "_Cutes";

-- DropTable
DROP TABLE "_EventParticipants";

-- DropTable
DROP TABLE "_EventWinners";

-- DropTable
DROP TABLE "_Likes";

-- DropTable
DROP TABLE "_Surprises";

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cute" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Surprise" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Surprise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Awesome" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Awesome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventParticipation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "EventParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventWinner" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "EventWinner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cute" ADD CONSTRAINT "Cute_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cute" ADD CONSTRAINT "Cute_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surprise" ADD CONSTRAINT "Surprise_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surprise" ADD CONSTRAINT "Surprise_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Awesome" ADD CONSTRAINT "Awesome_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Awesome" ADD CONSTRAINT "Awesome_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipation" ADD CONSTRAINT "EventParticipation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipation" ADD CONSTRAINT "EventParticipation_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventWinner" ADD CONSTRAINT "EventWinner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventWinner" ADD CONSTRAINT "EventWinner_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
