-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 0,
    "name" TEXT NOT NULL,
    "registration" TEXT,
    "password" TEXT,
    "salt" TEXT
);
INSERT INTO "new_Users" ("id", "name", "password", "registration", "salt") SELECT "id", "name", "password", "registration", "salt" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
