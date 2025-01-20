import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1737378524332 implements MigrationInterface {
  name = ' $npmConfigName1737378524332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`chat\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`text\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_7f3e04a25760adbd8ac4a60cab\` (\`text\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`phone\` varchar(255) NOT NULL, \`surname\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_7f3e04a25760adbd8ac4a60cab\` ON \`chat\``,
    );
    await queryRunner.query(`DROP TABLE \`chat\``);
  }
}
