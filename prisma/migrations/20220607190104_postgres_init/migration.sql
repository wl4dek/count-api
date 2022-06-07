-- CreateTable
CREATE TABLE "counters" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "counters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "counters_userId_key" ON "counters"("userId");

-- AddForeignKey
ALTER TABLE "counters" ADD CONSTRAINT "counters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
