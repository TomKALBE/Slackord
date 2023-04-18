<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use App\Entity\Channel\PrivateChannel;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[ORM\Column(length: 180, unique: true, nullable: false)]
    private string $email;

    #[ORM\Column(length: 180, unique: true, nullable: false)]
    private string $pseudo;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private string $password;

    #[ORM\ManyToMany(targetEntity: Server::class, mappedBy: 'members')]
    private Collection $servers;

    #[ORM\ManyToMany(targetEntity: UserRole::class)]
    private Collection $channel_roles;

    #[ORM\ManyToMany(targetEntity: PrivateChannel::class, mappedBy: 'members')]
    private Collection $PrivateChannels;

    public function __construct()
    {
        $this->servers = new ArrayCollection();
        $this->channel_roles = new ArrayCollection();
        $this->PrivateChannels = new ArrayCollection();
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
        return $this->PrivateChannels;
    }

    public function addPrivateChannel(PrivateChannel $PrivateChannel): self
    {
        if (!$this->PrivateChannels->contains($PrivateChannel)) {
            $this->PrivateChannels->add($PrivateChannel);
            $PrivateChannel->addMember($this);
        }

        return $this;
    }

    public function removePrivateChannel(PrivateChannel $PrivateChannel): self
    {
        if ($this->PrivateChannels->removeElement($PrivateChannel)) {
            $PrivateChannel->removeMember($this);
        }

        return $this;
    }
}
