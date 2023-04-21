<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Channel\ServerChannel;
use App\Repository\ChannelGroupRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ApiResource]
#[ORM\Entity(repositoryClass: ChannelGroupRepository::class)]
class ChannelGroup
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToMany(targetEntity: UserRole::class)]
    private Collection $authorized_roles;

    #[ORM\OneToMany(mappedBy: 'channelGroup', targetEntity: ServerChannel::class, orphanRemoval: true)]
    private Collection $channels;

    #[ORM\ManyToOne(inversedBy: 'channelGroups')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Server $server = null;

    public function __construct()
    {
        $this->authorized_roles = new ArrayCollection();
        $this->channels = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, ServerChannel>
     */
    public function getChannels(): Collection
    {
        return $this->channels;
    }

    public function addChannel(ServerChannel $channel): self
    {
        if (!$this->channels->contains($channel)) {
            $this->channels->add($channel);
            $channel->setChannelGroup($this);
        }

        return $this;
    }

    public function removeChannel(ServerChannel $channel): self
    {
        if ($this->channels->removeElement($channel)) {
            // set the owning side to null (unless already changed)
            if ($channel->getChannelGroup() === $this) {
                $channel->setChannelGroup(null);
            }
        }

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
