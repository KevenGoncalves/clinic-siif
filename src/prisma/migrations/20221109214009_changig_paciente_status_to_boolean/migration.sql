/*
  Warnings:

  - You are about to alter the column `state` on the `Paciente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Paciente` MODIFY `state` BOOLEAN NOT NULL;
