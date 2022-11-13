/*
  Warnings:

  - The values [FINALIZADA] on the enum `Consulta_consultaState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Consulta` MODIFY `consultaState` ENUM('PROGRESSO', 'CONCLUIDA', 'PENDENTE', 'REJEITADA') NOT NULL DEFAULT 'PENDENTE';
