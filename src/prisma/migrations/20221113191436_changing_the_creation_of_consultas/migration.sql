/*
  Warnings:

  - You are about to drop the column `state` on the `Consulta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Consulta` DROP COLUMN `state`,
    ADD COLUMN `consultaState` ENUM('ACEITE', 'REJEITADA', 'PENDENTE') NOT NULL DEFAULT 'PENDENTE';
