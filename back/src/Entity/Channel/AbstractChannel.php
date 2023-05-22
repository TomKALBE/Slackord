<?php

namespace App\Entity\Channel;

use App\Entity\Message;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ChannelRepository;
use Doctrine\ORM\Mapping\InheritanceType;
use Doctrine\ORM\Mapping\DiscriminatorMap;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\DiscriminatorColumn;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ORM\Entity(repositoryClass: ChannelRepository::class)]
#[InheritanceType('SINGLE_TABLE')]
#[DiscriminatorColumn(name: 'channelType', type: 'string')]
#[DiscriminatorMap(['private' => PrivateChannel::class, 'server' => ServerChannel::class])]
abstract class AbstractChannel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    protected ?int $id = null;

    #[Groups(['user', 'server', 'private_channel', 'server_channel', 'channel_group', 'message', 'user_role'])]
    #[MaxDepth(1)]
    #[ORM\Column(length: 255, nullable: true)]
    protected ?string $name = null;

    #[Groups(['user', 'server', 'private_channel', 'server_channel', 'channel_group', 'message', 'user_role'])]
    #[MaxDepth(1)]
    #[ORM\OneToMany(
        mappedBy: 'channel',
        targetEntity: Message::class,
        orphanRemoval: true,
        cascade: ['persist', 'remove']
    )]
    protected Collection $messages;

    public function __construct()
    {
        $this->messages = new ArrayCollection();
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
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setChannel($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getChannel() === $this) {
                $message->setChannel(null);
            }
        }

        return $this;
    }
}
