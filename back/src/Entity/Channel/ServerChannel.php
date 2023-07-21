<?php

namespace App\Entity\Channel;

use App\Entity\UserRole;
use App\Entity\ChannelGroup;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ServerChannelRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ApiResource(normalizationContext: ['groups' => ['server_channel:read'], 'enable_max_depth' => true])]
#[ORM\Entity(repositoryClass: ServerChannelRepository::class)]
class ServerChannel extends AbstractChannel
{
    #[Groups(['server_channel:read', 'server:read'])]
    #[MaxDepth(1)]
    #[ORM\ManyToMany(targetEntity: UserRole::class)]
    private Collection $authorized_roles;

    #[ORM\ManyToOne(inversedBy: 'channels', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    private ?ChannelGroup $channelGroup = null;

    public function __construct()
    {
        $this->authorized_roles = new ArrayCollection();
    }

    /**
     * @return Collection<int, UserRole>
     */
    public function getAuthorizedRoles(): Collection
    {
        return $this->authorized_roles;
    }

    public function addAuthorizedRole(UserRole $authorizedRole): self
    {
        if (!$this->authorized_roles->contains($authorizedRole)) {
            $this->authorized_roles->add($authorizedRole);
        }

        return $this;
    }

    public function removeAuthorizedRole(UserRole $authorizedRole): self
    {
        $this->authorized_roles->removeElement($authorizedRole);

        return $this;
    }

    public function getChannelGroup(): ?ChannelGroup
    {
        return $this->channelGroup;
    }

    public function setChannelGroup(?ChannelGroup $channelGroup): self
    {
        $this->channelGroup = $channelGroup;

        return $this;
    }
}
