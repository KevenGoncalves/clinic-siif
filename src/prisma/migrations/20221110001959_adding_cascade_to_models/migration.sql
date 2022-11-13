-- DropForeignKey
ALTER TABLE `Medico` DROP FOREIGN KEY `Medico_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Paciente` DROP FOREIGN KEY `Paciente_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Paciente` ADD CONSTRAINT `Paciente_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medico` ADD CONSTRAINT `Medico_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
