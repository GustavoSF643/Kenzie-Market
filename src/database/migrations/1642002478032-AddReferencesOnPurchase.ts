import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddReferencesOnPurchase1642002478032 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "purchases",
            new TableForeignKey({
              name: "usersFK",
              columnNames: ["userId"],
              referencedColumnNames: ["id"],
              referencedTableName: "users",
              onDelete: "RESTRICT",
              onUpdate: "CASCADE",
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("purchases", "usersFK");
    }

}
