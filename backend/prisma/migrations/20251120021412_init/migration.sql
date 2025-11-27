-- CreateTable
CREATE TABLE "Materia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "linkAuxiliar" TEXT,
    "inseridoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
