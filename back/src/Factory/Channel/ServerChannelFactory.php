<?php

namespace App\Factory\Channel;

use App\Entity\Channel\ServerChannel;
use App\Repository\ChannelRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<ServerChannel>
 *
 * @method        ServerChannel|Proxy create(array|callable $attributes = [])
 * @method static ServerChannel|Proxy createOne(array $attributes = [])
 * @method static ServerChannel|Proxy find(object|array|mixed $criteria)
 * @method static ServerChannel|Proxy findOrCreate(array $attributes)
 * @method static ServerChannel|Proxy first(string $sortedField = 'id')
 * @method static ServerChannel|Proxy last(string $sortedField = 'id')
 * @method static ServerChannel|Proxy random(array $attributes = [])
 * @method static ServerChannel|Proxy randomOrCreate(array $attributes = [])
 * @method static ChannelRepository|RepositoryProxy repository()
 * @method static ServerChannel[]|Proxy[] all()
 * @method static ServerChannel[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static ServerChannel[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static ServerChannel[]|Proxy[] findBy(array $attributes)
 * @method static ServerChannel[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static ServerChannel[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class ServerChannelFactory extends ModelFactory
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
        return [];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            ->afterInstantiate(function (ServerChannel $serverChannel): void {
                $roles = $serverChannel->getChannelGroup()->getAuthorizedRoles();

                foreach (self::faker()->randomElements($roles, self::faker()->numberBetween(1, \count($roles))) as $role) {
                    $serverChannel->addAuthorizedRole($role);
                }
            });
    }

    protected static function getClass(): string
    {
        return ServerChannel::class;
    }
}
