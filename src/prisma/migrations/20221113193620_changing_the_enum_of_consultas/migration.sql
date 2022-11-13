/*
  Warnings:

  - The values [ACEITE,REJEITADA] on the enum `Consulta_consultaState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Consulta` MODIFY `consultaState` ENUM('PROGRESSO', 'CONCLUIDA', 'PENDENTE', 'FINALIZADA') NOT NULL DEFAULT 'PENDENTE';
