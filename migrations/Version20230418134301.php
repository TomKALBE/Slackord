<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20230418134301 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        $this->addSql('CREATE SEQUENCE abstract_channel_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE channel_group_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE message_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE server_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE user_role_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE abstract_channel (id INT NOT NULL, channel_group_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, channelType VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_4EE8D789E4AAEE ON abstract_channel (channel_group_id)');
        $this->addSql('CREATE TABLE private_channel_user (private_channel_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(private_channel_id, user_id))');
        $this->addSql('CREATE INDEX IDX_47BADD357F300BDD ON private_channel_user (private_channel_id)');
        $this->addSql('CREATE INDEX IDX_47BADD35A76ED395 ON private_channel_user (user_id)');
        $this->addSql('CREATE TABLE server_channel_user_role (server_channel_id INT NOT NULL, user_role_id INT NOT NULL, PRIMARY KEY(server_channel_id, user_role_id))');
        $this->addSql('CREATE INDEX IDX_FAE79827A03A310D ON server_channel_user_role (server_channel_id)');
        $this->addSql('CREATE INDEX IDX_FAE798278E0E3CA6 ON server_channel_user_role (user_role_id)');
        $this->addSql('CREATE TABLE channel_group (id INT NOT NULL, server_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DAE14C5D1844E6B7 ON channel_group (server_id)');
        $this->addSql('CREATE TABLE channel_group_user_role (channel_group_id INT NOT NULL, user_role_id INT NOT NULL, PRIMARY KEY(channel_group_id, user_role_id))');
        $this->addSql('CREATE INDEX IDX_54F1E3A189E4AAEE ON channel_group_user_role (channel_group_id)');
        $this->addSql('CREATE INDEX IDX_54F1E3A18E0E3CA6 ON channel_group_user_role (user_role_id)');
        $this->addSql('CREATE TABLE message (id INT NOT NULL, author_id INT NOT NULL, channel_id INT NOT NULL, content VARCHAR(50000) NOT NULL, posted_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B6BD307FF675F31B ON message (author_id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F72F5A1AA ON message (channel_id)');
        $this->addSql('COMMENT ON COLUMN message.posted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE server (id INT NOT NULL, admin_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5A6DD5F6642B8210 ON server (admin_id)');
        $this->addSql('CREATE TABLE server_user (server_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(server_id, user_id))');
        $this->addSql('CREATE INDEX IDX_613A7A91844E6B7 ON server_user (server_id)');
        $this->addSql('CREATE INDEX IDX_613A7A9A76ED395 ON server_user (user_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, pseudo VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D64986CC499D ON "user" (pseudo)');
        $this->addSql('CREATE TABLE user_user_role (user_id INT NOT NULL, user_role_id INT NOT NULL, PRIMARY KEY(user_id, user_role_id))');
        $this->addSql('CREATE INDEX IDX_2D084B47A76ED395 ON user_user_role (user_id)');
        $this->addSql('CREATE INDEX IDX_2D084B478E0E3CA6 ON user_user_role (user_role_id)');
        $this->addSql('CREATE TABLE user_role (id INT NOT NULL, server_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_2DE8C6A31844E6B7 ON user_role (server_id)');
        $this->addSql('ALTER TABLE abstract_channel ADD CONSTRAINT FK_4EE8D789E4AAEE FOREIGN KEY (channel_group_id) REFERENCES channel_group (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE private_channel_user ADD CONSTRAINT FK_47BADD357F300BDD FOREIGN KEY (private_channel_id) REFERENCES abstract_channel (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE private_channel_user ADD CONSTRAINT FK_47BADD35A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE server_channel_user_role ADD CONSTRAINT FK_FAE79827A03A310D FOREIGN KEY (server_channel_id) REFERENCES abstract_channel (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE server_channel_user_role ADD CONSTRAINT FK_FAE798278E0E3CA6 FOREIGN KEY (user_role_id) REFERENCES user_role (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE channel_group ADD CONSTRAINT FK_DAE14C5D1844E6B7 FOREIGN KEY (server_id) REFERENCES server (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE channel_group_user_role ADD CONSTRAINT FK_54F1E3A189E4AAEE FOREIGN KEY (channel_group_id) REFERENCES channel_group (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE channel_group_user_role ADD CONSTRAINT FK_54F1E3A18E0E3CA6 FOREIGN KEY (user_role_id) REFERENCES user_role (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FF675F31B FOREIGN KEY (author_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F72F5A1AA FOREIGN KEY (channel_id) REFERENCES abstract_channel (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE server ADD CONSTRAINT FK_5A6DD5F6642B8210 FOREIGN KEY (admin_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE server_user ADD CONSTRAINT FK_613A7A91844E6B7 FOREIGN KEY (server_id) REFERENCES server (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE server_user ADD CONSTRAINT FK_613A7A9A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_user_role ADD CONSTRAINT FK_2D084B47A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_user_role ADD CONSTRAINT FK_2D084B478E0E3CA6 FOREIGN KEY (user_role_id) REFERENCES user_role (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_role ADD CONSTRAINT FK_2DE8C6A31844E6B7 FOREIGN KEY (server_id) REFERENCES server (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP SEQUENCE abstract_channel_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE channel_group_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE message_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE server_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE user_role_id_seq CASCADE');
        $this->addSql('ALTER TABLE abstract_channel DROP CONSTRAINT FK_4EE8D789E4AAEE');
        $this->addSql('ALTER TABLE private_channel_user DROP CONSTRAINT FK_47BADD357F300BDD');
        $this->addSql('ALTER TABLE private_channel_user DROP CONSTRAINT FK_47BADD35A76ED395');
        $this->addSql('ALTER TABLE server_channel_user_role DROP CONSTRAINT FK_FAE79827A03A310D');
        $this->addSql('ALTER TABLE server_channel_user_role DROP CONSTRAINT FK_FAE798278E0E3CA6');
        $this->addSql('ALTER TABLE channel_group DROP CONSTRAINT FK_DAE14C5D1844E6B7');
        $this->addSql('ALTER TABLE channel_group_user_role DROP CONSTRAINT FK_54F1E3A189E4AAEE');
        $this->addSql('ALTER TABLE channel_group_user_role DROP CONSTRAINT FK_54F1E3A18E0E3CA6');
        $this->addSql('ALTER TABLE message DROP CONSTRAINT FK_B6BD307FF675F31B');
        $this->addSql('ALTER TABLE message DROP CONSTRAINT FK_B6BD307F72F5A1AA');
        $this->addSql('ALTER TABLE server DROP CONSTRAINT FK_5A6DD5F6642B8210');
        $this->addSql('ALTER TABLE server_user DROP CONSTRAINT FK_613A7A91844E6B7');
        $this->addSql('ALTER TABLE server_user DROP CONSTRAINT FK_613A7A9A76ED395');
        $this->addSql('ALTER TABLE user_user_role DROP CONSTRAINT FK_2D084B47A76ED395');
        $this->addSql('ALTER TABLE user_user_role DROP CONSTRAINT FK_2D084B478E0E3CA6');
        $this->addSql('ALTER TABLE user_role DROP CONSTRAINT FK_2DE8C6A31844E6B7');
        $this->addSql('DROP TABLE abstract_channel');
        $this->addSql('DROP TABLE private_channel_user');
        $this->addSql('DROP TABLE server_channel_user_role');
        $this->addSql('DROP TABLE channel_group');
        $this->addSql('DROP TABLE channel_group_user_role');
        $this->addSql('DROP TABLE message');
        $this->addSql('DROP TABLE server');
        $this->addSql('DROP TABLE server_user');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP TABLE user_user_role');
        $this->addSql('DROP TABLE user_role');
    }
}
