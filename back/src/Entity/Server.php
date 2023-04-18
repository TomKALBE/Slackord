<?php

namespace App\Entity;

use App\Repository\ServerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ServerRepository::class)]
class Server
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $admin = null;

    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'servers')]
    private Collection $members;

    #[ORM\OneToMany(mappedBy: 'server', targetEntity: UserRole::class, orphanRemoval: true)]
    private Collection $userRoles;

    #[ORM\OneToMany(mappedBy: 'server', targetEntity: ChannelGroup::class, orphanRemoval: true)]
    private Collection $channelGroups;

    public function __construct()
    {
        $this->members = new ArrayCollection();
        $this->userRoles = new ArrayCollection();
        $this->channelGroups = new ArrayCollection();
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

    public function getAdmin(): ?User
    {
        return $this->admin;
    }

    public function setAdmin(?User $admin): self
    {
        $this->admin = $admin;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getMembers(): Collection
    {
        return $this->members;
    }

    public function addMember(User $member): self
    {
        if (!$this->members->contains($member)) {
            $this->members->add($member);
        }

        return $this;
    }

    public function removeMember(User $member): self
    {
        $this->members->removeElement($member);

        return $this;
    }

    /**
     * @return Collection<int, UserRole>
     */
    public function getUserRoles(): Collection
    {
        return $this->userRoles;
    }

    public function addUserRole(UserRole $userRole): self
    {
        if (!$this->userRoles->contains($userRole)) {
            $this->userRoles->add($userRole);
            $userRole->setServer($this);
        }

        return $this;
    }

    public function removeUserRole(UserRole $userRole): self
    {
        if ($this->userRoles->removeElement($userRole)) {
            // set the owning side to null (unless already changed)
            if ($userRole->getServer() === $this) {
                $userRole->setServer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ChannelGroup>
     */
    public function getChannelGroups(): Collection
    {
        return $this->channelGroups;
    }

    public function addChannelGroup(ChannelGroup $channelGroup): self
    {
        if (!$this->channelGroups->contains($channelGroup)) {
            $this->channelGroups->add($channelGroup);
            $channelGroup->setServer($this);
        }

        return $this;
    }

    public function removeChannelGroup(ChannelGroup $channelGroup): self
    {
        if ($this->channelGroups->removeElement($channelGroup)) {
            // set the owning side to null (unless already changed)
            if ($channelGroup->getServer() === $this) {
                $channelGroup->setServer(null);
            }
        }

        return $this;
    }
}
