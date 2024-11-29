/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `product_stocks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone_number` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `image` VARCHAR(255) NULL,
    ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `phone_number` VARCHAR(255) NOT NULL,
    ADD COLUMN `role` ENUM('user', 'admin') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `product_stocks_product_id_key` ON `product_stocks`(`product_id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_phone_number_key` ON `users`(`phone_number`);
