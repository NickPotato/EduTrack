/*
  Warnings:

  - Added the required column `tipoArquivo` to the `Anexo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Anexo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeArquivo" TEXT NOT NULL,
    "tipoArquivo" TEXT NOT NULL,
    "inseridoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "materiaId" INTEGER NOT NULL,
    CONSTRAINT "Anexo_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Anexo" ("id", "inseridoEm", "materiaId", "nomeArquivo") SELECT "id", "inseridoEm", "materiaId", "nomeArquivo" FROM "Anexo";
DROP TABLE "Anexo";
ALTER TABLE "new_Anexo" RENAME TO "Anexo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
