-- AlterTable
ALTER TABLE "AnprLogs" ALTER COLUMN "time_stamp" DROP DEFAULT,
ALTER COLUMN "time_stamp" SET DATA TYPE TIMESTAMPTZ;