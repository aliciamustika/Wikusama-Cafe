-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
