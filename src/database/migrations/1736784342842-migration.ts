import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736784342842 implements MigrationInterface {
    name = 'Migration1736784342842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`phone\` varchar(255) NOT NULL, \`surname\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
