<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRoleRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ApiResource(normalizationContext: ['groups' => ['user_role'], 'enable_max_depth' => true])]
#[ORM\Entity(repositoryClass: UserRoleRepository::class)]
class UserRole
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['user', 'server', 'private_channel', 'server_channel', 'channel_group', 'message', 'user_role'])]
    #[MaxDepth(1)]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['user_role'])]
    #[MaxDepth(1)]
    #[ORM\ManyToOne(inversedBy: 'userRoles')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Server $server = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getServer(): ?Server
    {
        return $this->server;
    }

    public function setServer(?Server $server): self
    {
        $this->server = $server;

        return $this;
    }
}
