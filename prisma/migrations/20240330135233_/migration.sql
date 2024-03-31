/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Date` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Calendar" (
    "id" TEXT NOT NULL,
    "appointmentTitles" TEXT[],

    CONSTRAINT "Calendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "clients" TEXT[],
    "dateId" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Calendar_id_key" ON "Calendar"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Date_id_key" ON "Date"("id");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
