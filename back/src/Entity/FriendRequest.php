<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\FriendRequestRepository;

#[ApiResource]
#[ORM\Entity(repositoryClass: FriendRequestRepository::class)]
class FriendRequest
{
    public const STATUS_PENDING = 1;
    public const STATUS_ACCEPTED = 2;
    public const STATUS_REFUSED = 3;

    public const STATUS = [
        self::STATUS_PENDING,
        self::STATUS_ACCEPTED,
        self::STATUS_REFUSED,
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'outboundFriendRequests', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $issuer = null;

    #[ORM\ManyToOne(inversedBy: 'inboundFriendRequests', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $receiver = null;

    #[ORM\Column]
    private ?int $status = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $sentAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIssuer(): ?User
    {
        return $this->issuer;
    }

    public function setIssuer(?User $issuer): self
    {
        $this->issuer = $issuer;

        return $this;
    }

    public function getReceiver(): ?User
    {
        return $this->receiver;
    }

    public function setReceiver(?User $receiver): self
    {
        $this->receiver = $receiver;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        if (self::STATUS_PENDING !== $status) {
            $this->getIssuer()->removeOutboundFriendRequest($this);
            $this->getReceiver()->removeInboundFriendRequest($this);

            if (self::STATUS_ACCEPTED === $status) {
                $this->getIssuer()->addFriend($this->getReceiver());
                $this->getReceiver()->addFriend($this->getIssuer());
            }
        }

        return $this;
    }

    public function getSentAt(): ?\DateTimeImmutable
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeImmutable $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }
}
