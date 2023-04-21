<?php

namespace App\Entity\Channel;

use App\Entity\UserRole;
use App\Entity\ChannelGroup;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ChannelRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: ChannelRepository::class)]
class ServerChannel extends AbstractChannel
{
    #[ORM\ManyToMany(targetEntity: UserRole::class)]
    private Collection $authorized_roles;

    #[ORM\ManyToOne(inversedBy: 'channels')]
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
