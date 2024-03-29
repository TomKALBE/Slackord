<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Channel\PrivateChannel;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ApiResource(
    normalizationContext: ['groups' => ['user:read'], 'enable_max_depth' => true]
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[Groups(['user:read', 'private_channel:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[Groups(['user:read', 'private_channel:read'])]
    #[MaxDepth(1)]
    #[ORM\Column(length: 180, unique: true, nullable: false)]
    private string $email;

    #[Groups(['user:read', 'private_channel:read', 'server:read'])]
    #[MaxDepth(1)]
    #[ORM\Column(length: 180, unique: true, nullable: false)]
    private string $pseudo;

    #[Groups(['server:read'])]
    #[MaxDepth(1)]
    #[ORM\Column]
    private array $roles = [];

    #[MaxDepth(1)]
    #[ORM\Column]
    private string $password;

    #[Groups(['user:read'])]
    #[MaxDepth(1)]
    #[ORM\ManyToMany(targetEntity: Server::class, mappedBy: 'members')]
    private Collection $servers;

    #[MaxDepth(1)]
    #[ORM\ManyToMany(targetEntity: UserRole::class)]
    private Collection $channel_roles;

    #[Groups(['user:read'])]
    #[MaxDepth(1)]
    #[ORM\ManyToMany(targetEntity: PrivateChannel::class, mappedBy: 'members')]
    private Collection $privateChannels;

    #[ORM\OneToMany(mappedBy: 'issuer', targetEntity: FriendRequest::class, orphanRemoval: true)]
    private Collection $outboundFriendRequests;

    #[ORM\OneToMany(mappedBy: 'receiver', targetEntity: FriendRequest::class, orphanRemoval: true)]
    private Collection $inboundFriendRequests;

    #[ORM\ManyToMany(targetEntity: self::class, inversedBy: 'friends')]
    private Collection $friends;

    public function __construct()
    {
        $this->servers = new ArrayCollection();
        $this->channel_roles = new ArrayCollection();
        $this->privateChannels = new ArrayCollection();
        $this->outboundFriendRequests = new ArrayCollection();
        $this->inboundFriendRequests = new ArrayCollection();
        $this->friends = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPseudo(): string
    {
        return $this->pseudo;
    }

    public function setPseudo(string $pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Server>
     */
    public function getServers(): Collection
    {
        return $this->servers;
    }

    public function addServer(Server $server): self
    {
        if (!$this->servers->contains($server)) {
            $this->servers->add($server);
            $server->addMember($this);
        }

        return $this;
    }

    public function removeServer(Server $server): self
    {
        if ($this->servers->removeElement($server)) {
            $server->removeMember($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, UserRole>
     */
    public function getChannelRoles(): Collection
    {
        return $this->channel_roles;
    }

    public function addChannelRole(UserRole $channelRole): self
    {
        if (!$this->channel_roles->contains($channelRole)) {
            $this->channel_roles->add($channelRole);
        }

        return $this;
    }

    public function removeChannelRole(UserRole $channelRole): self
    {
        $this->channel_roles->removeElement($channelRole);

        return $this;
    }

    /**
     * @return Collection<int, PrivateChannel>
     */
    public function getPrivateChannels(): Collection
    {
        return $this->privateChannels;
    }

    public function addPrivateChannel(PrivateChannel $privateChannel): self
    {
        if (!$this->privateChannels->contains($privateChannel)) {
            $this->privateChannels->add($privateChannel);
            $privateChannel->addMember($this);
        }

        return $this;
    }

    public function removePrivateChannel(PrivateChannel $privateChannel): self
    {
        if ($this->privateChannels->removeElement($privateChannel)) {
            $privateChannel->removeMember($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, FriendRequest>
     */
    public function getOutboundFriendRequests(): Collection
    {
        return $this->outboundFriendRequests;
    }

    public function addOutboundFriendRequest(FriendRequest $friendRequest): self
    {
        if (!$this->outboundFriendRequests->contains($friendRequest)) {
            $this->outboundFriendRequests->add($friendRequest);
            $friendRequest->setIssuer($this);
        }

        return $this;
    }

    public function removeOutboundFriendRequest(FriendRequest $friendRequest): self
    {
        if ($this->outboundFriendRequests->removeElement($friendRequest)) {
            // set the owning side to null (unless already changed)
            if ($friendRequest->getIssuer() === $this) {
                $friendRequest->setIssuer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, FriendRequest>
     */
    public function getInboundFriendRequests(): Collection
    {
        return $this->inboundFriendRequests;
    }

    public function addInboundFriendRequest(FriendRequest $inboundFriendRequest): self
    {
        if (!$this->inboundFriendRequests->contains($inboundFriendRequest)) {
            $this->inboundFriendRequests->add($inboundFriendRequest);
            $inboundFriendRequest->setReceiver($this);
        }

        return $this;
    }

    public function removeInboundFriendRequest(FriendRequest $inboundFriendRequest): self
    {
        if ($this->inboundFriendRequests->removeElement($inboundFriendRequest)) {
            // set the owning side to null (unless already changed)
            if ($inboundFriendRequest->getReceiver() === $this) {
                $inboundFriendRequest->setReceiver(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getFriends(): Collection
    {
        return $this->friends;
    }

    public function addFriend(self $friend): self
    {
        if (!$this->friends->contains($friend)) {
            $this->friends->add($friend);
        }

        return $this;
    }

    public function removeFriend(self $friend): self
    {
        $this->friends->removeElement($friend);

        return $this;
    }
}
