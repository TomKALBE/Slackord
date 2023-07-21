<?php

namespace App\Factory;

use App\Entity\Server;
use App\Repository\ServerRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Server>
 *
 * @method        Server|Proxy create(array|callable $attributes = [])
 * @method static Server|Proxy createOne(array $attributes = [])
 * @method static Server|Proxy find(object|array|mixed $criteria)
 * @method static Server|Proxy findOrCreate(array $attributes)
 * @method static Server|Proxy first(string $sortedField = 'id')
 * @method static Server|Proxy last(string $sortedField = 'id')
 * @method static Server|Proxy random(array $attributes = [])
 * @method static Server|Proxy randomOrCreate(array $attributes = [])
 * @method static ServerRepository|RepositoryProxy repository()
 * @method static Server[]|Proxy[] all()
 * @method static Server[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Server[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static Server[]|Proxy[] findBy(array $attributes)
 * @method static Server[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static Server[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class ServerFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'admin' => UserFactory::random(),
            'name' => self::faker()->domainWord(),
            'members' => UserFactory::randomSet(self::faker()->numberBetween(5, 25)),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            ->afterPersist(function (Server $server): void {
                $userRoles = UserRoleFactory::createMany(self::faker()->numberBetween(2, 4), [
                    'server' => $server,
                ]);

                foreach ($server->getMembers() as $member) {
                    $member->addChannelRole(self::faker()->randomElement($userRoles)->object());
                }

                ChannelGroupFactory::createMany(self::faker()->numberBetween(2, 7), [
                    'authorizedRoles' => self::faker()->randomElements($userRoles, self::faker()->numberBetween(1, \count($userRoles))),
                    'server' => $server,
                ]);
            });;
    }

    protected static function getClass(): string
    {
        return Server::class;
    }
}
