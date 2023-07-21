<?php

namespace App\Factory;

use App\Entity\FriendRequest;
use App\Repository\FriendRequestRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<FriendRequest>
 *
 * @method        FriendRequest|Proxy create(array|callable $attributes = [])
 * @method static FriendRequest|Proxy createOne(array $attributes = [])
 * @method static FriendRequest|Proxy find(object|array|mixed $criteria)
 * @method static FriendRequest|Proxy findOrCreate(array $attributes)
 * @method static FriendRequest|Proxy first(string $sortedField = 'id')
 * @method static FriendRequest|Proxy last(string $sortedField = 'id')
 * @method static FriendRequest|Proxy random(array $attributes = [])
 * @method static FriendRequest|Proxy randomOrCreate(array $attributes = [])
 * @method static FriendRequestRepository|RepositoryProxy repository()
 * @method static FriendRequest[]|Proxy[] all()
 * @method static FriendRequest[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static FriendRequest[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static FriendRequest[]|Proxy[] findBy(array $attributes)
 * @method static FriendRequest[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static FriendRequest[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class FriendRequestFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     */
    protected function getDefaults(): array
    {
        return [
            'issuer' => $issuer = UserFactory::random(),
            'receiver' => $this->generateDifferentUser($issuer),
            'sentAt' => \DateTimeImmutable::createFromMutable(self::faker()->dateTime()),
            'status' => FriendRequest::STATUS_PENDING,
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(FriendRequest $friendRequest): void {})
        ;
    }

    protected static function getClass(): string
    {
        return FriendRequest::class;
    }

    private function generateDifferentUser(Proxy $user): Proxy
    {
        $user2 = UserFactory::random();

        if ($user2->object() === $user->object()) {
            return $this->generateDifferentUser($user);
        }

        return $user2;
    }
}
