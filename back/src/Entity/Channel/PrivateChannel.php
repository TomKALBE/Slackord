<?php

namespace App\Entity\Channel;

use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Channel\AbstractChannel;
use Doctrine\Common\Collections\Collection;
use App\Repository\PrivateChannelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ApiResource(normalizationContext: ['groups' => ['private_channel'], 'enable_max_depth' => true])]
#[ORM\Entity(repositoryClass: PrivateChannelRepository::class)]
class PrivateChannel extends AbstractChannel
{
    #[Groups(['private_channel'])]
    #[MaxDepth(1)]
    #[ORM\ManyToMany(
        targetEntity: User::class,
        inversedBy: 'privateChannels'
    )]
    private Collection $members;

    public function __construct()
    {
        $this->members = new ArrayCollection();
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
            $member->addPrivateChannel($this);
        }

        return $this;
    }

    public function removeMember(User $member): self
    {
        if ($this->members->removeElement($member)) {
            $member->removePrivateChannel($this);
        }

        return $this;
    }
}
