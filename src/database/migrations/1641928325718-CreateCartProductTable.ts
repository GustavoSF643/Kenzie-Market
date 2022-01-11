import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCartProductTable1641928325718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "cart_products",
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                  generationStrategy: "uuid",
                  default: "uuid_generate_v4()",
                },
                {
                  name: "productId",
                  type: "uuid",
                },
                {
                  name: "cartId",
                  type: "uuid",
                },
                {
                  name: "price",
                  type: "decimal",
                  precision: 10,
                  scale: 2,
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()",
                },
                {
                  name: "updated_at",
                  type: "timestamp",
                  default: "now()",
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cart_products");
    }

}
