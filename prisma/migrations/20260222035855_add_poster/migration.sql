/*
  Warnings:

  - You are about to drop the column `description` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `movie` table. All the data in the column will be lost.
  - Added the required column `genre` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `movie` DROP FOREIGN KEY `Movie_userId_fkey`;

-- DropIndex
DROP INDEX `Movie_userId_fkey` ON `movie`;

-- AlterTable
ALTER TABLE `movie` DROP COLUMN `description`,
    DROP COLUMN `status`,
    DROP COLUMN `userId`,
    ADD COLUMN `genre` VARCHAR(191) NOT NULL,
    ADD COLUMN `poster` VARCHAR(191) NULL,
    ADD COLUMN `rating` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
