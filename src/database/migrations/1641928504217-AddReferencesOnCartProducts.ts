import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddReferencesOnCartProducts1641928504217 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "cart_products",
            new TableForeignKey({
              name: "CartsFK",
              columnNames: ["cartId"],
              referencedColumnNames: ["id"],
              referencedTableName: "carts",
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            })
          );
        await queryRunner.createForeignKey(
            "cart_products",
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
        await queryRunner.dropForeignKey("cart_products", "CartsFK");
        await queryRunner.dropForeignKey("cart_products", "ProductsFK");
    }
}
