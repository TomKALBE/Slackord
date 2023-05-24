<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\MessageRepository;
use App\Entity\Channel\AbstractChannel;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ApiResource(normalizationContext: ['groups' => ['message'], 'enable_max_depth' => true])]
#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['user', 'server', 'private_channel', 'server_channel', 'channel_group', 'message', 'user_role'])]
    #[MaxDepth(1)]
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $author = null;

    #[Groups(['user', 'server', 'private_channel', 'server_channel', 'channel_group', 'message', 'user_role'])]
    #[MaxDepth(1)]
    #[ORM\ManyToOne(inversedBy: 'messages', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?AbstractChannel $channel = null;

    #[Groups(['user', 'server', 'private_channel', 'server_channel', 'channel_group', 'message', 'user_role'])]
    #[MaxDepth(1)]
    #[ORM\Column(length: 50000)]
    private ?string $content = null;

    #[Groups(['user', 'server', 'private_channel', 'server_channel', 'channel_group', 'message', 'user_role'])]
    #[MaxDepth(1)]
    #[ORM\Column]
    private ?\DateTimeImmutable $postedAt = null;

    #[Groups(['user', 'server', 'private_channel', 'server_channel', 'channel_group', 'message', 'user_role'])]
    #[MaxDepth(1)]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updatedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getChannel(): ?AbstractChannel
    {
        return $this->channel;
    }

    public function setChannel(?AbstractChannel $channel): self
    {
        $this->channel = $channel;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getPostedAt(): ?\DateTimeImmutable
    {
        return $this->postedAt;
    }

    public function setPostedAt(\DateTimeImmutable $postedAt): self
    {
        $this->postedAt = $postedAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
