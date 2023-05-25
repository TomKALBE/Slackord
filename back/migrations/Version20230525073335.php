<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20230525073335 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE channel_group_user_role DROP CONSTRAINT fk_54f1e3a189e4aaee');
        $this->addSql('ALTER TABLE channel_group_user_role DROP CONSTRAINT fk_54f1e3a18e0e3ca6');
        $this->addSql('DROP TABLE channel_group_user_role');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE channel_group_user_role (channel_group_id INT NOT NULL, user_role_id INT NOT NULL, PRIMARY KEY(channel_group_id, user_role_id))');
        $this->addSql('CREATE INDEX idx_54f1e3a18e0e3ca6 ON channel_group_user_role (user_role_id)');
        $this->addSql('CREATE INDEX idx_54f1e3a189e4aaee ON channel_group_user_role (channel_group_id)');
        $this->addSql('ALTER TABLE channel_group_user_role ADD CONSTRAINT fk_54f1e3a189e4aaee FOREIGN KEY (channel_group_id) REFERENCES channel_group (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE channel_group_user_role ADD CONSTRAINT fk_54f1e3a18e0e3ca6 FOREIGN KEY (user_role_id) REFERENCES user_role (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
