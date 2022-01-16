import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddReferencesOnTokens1642194542119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "tokens",
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
        await queryRunner.dropForeignKey("tokens", "usersFK");
    }

}
