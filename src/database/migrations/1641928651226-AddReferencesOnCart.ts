import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddReferencesOnCart1641928651226 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "carts",
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
        await queryRunner.dropForeignKey("carts", "usersFK");
    }

}
