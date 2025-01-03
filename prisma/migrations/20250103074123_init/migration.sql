-- CreateTable
CREATE TABLE "monitorEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coreid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "published_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "alertEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coreid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "published_at" DATETIME NOT NULL
);
