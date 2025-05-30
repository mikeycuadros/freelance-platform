<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250521075018 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE client CHANGE user_id_id user_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE freelancer ADD hourly_rate INT NOT NULL, CHANGE user_id_id user_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE service CHANGE category_id category_id INT NOT NULL, CHANGE user_id user_id INT NOT NULL, CHANGE delivery_time delivery_time VARCHAR(255) NOT NULL');
        $this->addSql('DROP INDEX UNIQ_IDENTIFIER_USERNAME ON user');
        $this->addSql('ALTER TABLE user CHANGE username username VARCHAR(255) NOT NULL, CHANGE email email VARCHAR(180) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE client CHANGE user_id_id user_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE service CHANGE category_id category_id INT DEFAULT NULL, CHANGE user_id user_id INT DEFAULT NULL, CHANGE delivery_time delivery_time INT NOT NULL');
        $this->addSql('ALTER TABLE freelancer DROP hourly_rate, CHANGE user_id_id user_id_id INT DEFAULT NULL');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74 ON user');
        $this->addSql('ALTER TABLE user CHANGE email email VARCHAR(255) NOT NULL, CHANGE username username VARCHAR(180) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_USERNAME ON user (username)');
    }
}
