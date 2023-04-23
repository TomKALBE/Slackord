<?php

namespace App\Factory;

use App\Entity\ChannelGroup;
use App\Factory\Channel\ServerChannelFactory;
use App\Repository\ChannelGroupRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<ChannelGroup>
 *
 * @method        ChannelGroup|Proxy create(array|callable $attributes = [])
 * @method static ChannelGroup|Proxy createOne(array $attributes = [])
 * @method static ChannelGroup|Proxy find(object|array|mixed $criteria)
 * @method static ChannelGroup|Proxy findOrCreate(array $attributes)
 * @method static ChannelGroup|Proxy first(string $sortedField = 'id')
 * @method static ChannelGroup|Proxy last(string $sortedField = 'id')
 * @method static ChannelGroup|Proxy random(array $attributes = [])
 * @method static ChannelGroup|Proxy randomOrCreate(array $attributes = [])
 * @method static ChannelGroupRepository|RepositoryProxy repository()
 * @method static ChannelGroup[]|Proxy[] all()
 * @method static ChannelGroup[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static ChannelGroup[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static ChannelGroup[]|Proxy[] findBy(array $attributes)
 * @method static ChannelGroup[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static ChannelGroup[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class ChannelGroupFactory extends ModelFactory
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
            'name' => self::faker()->word(),
            'server' => ServerFactory::randomOrCreate(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            ->afterInstantiate(function (ChannelGroup $channelGroup): void {
                ServerChannelFactory::createMany(self::faker()->numberBetween(2, 5), [
                    'channelGroup' => $channelGroup,
                ]);
            });
    }

    protected static function getClass(): string
    {
        return ChannelGroup::class;
    }
}
