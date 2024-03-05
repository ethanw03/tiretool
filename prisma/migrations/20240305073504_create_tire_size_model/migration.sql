-- CreateTable
CREATE TABLE "TireSize" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rimSize" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "aspectRatio" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TireSize_rimSize_width_aspectRatio_key" ON "TireSize"("rimSize", "width", "aspectRatio");
