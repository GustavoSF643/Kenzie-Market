import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddReferencesOnPurchaseProducts1642002548337 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "purchase_products",
            new TableForeignKey({
              name: "PurchasesFK",
              columnNames: ["purchaseId"],
              referencedColumnNames: ["id"],
              referencedTableName: "purchases",
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            })
          );
        await queryRunner.createForeignKey(
            "purchase_products",
            new TableForeignKey({
              name: "ProductsFK",
              columnNames: ["productId"],
              referencedColumnNames: ["id"],
              referencedTableName: "products",
              onDelete: "SET NULL",
              onUpdate: "CASCADE",
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("purchase_products", "PurchasesFK");
        await queryRunner.dropForeignKey("purchase_products", "ProductsFK");
    }

}
