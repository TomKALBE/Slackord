<?php

namespace App\Factory\Channel;

use App\Entity\Channel\PrivateChannel;
use App\Repository\PrivateChannelRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<PrivateChannel>
 *
 * @method        PrivateChannel|Proxy create(array|callable $attributes = [])
 * @method static PrivateChannel|Proxy createOne(array $attributes = [])
 * @method static PrivateChannel|Proxy find(object|array|mixed $criteria)
 * @method static PrivateChannel|Proxy findOrCreate(array $attributes)
 * @method static PrivateChannel|Proxy first(string $sortedField = 'id')
 * @method static PrivateChannel|Proxy last(string $sortedField = 'id')
 * @method static PrivateChannel|Proxy random(array $attributes = [])
 * @method static PrivateChannel|Proxy randomOrCreate(array $attributes = [])
 * @method static PrivateChannelRepository|RepositoryProxy repository()
 * @method static PrivateChannel[]|Proxy[] all()
 * @method static PrivateChannel[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static PrivateChannel[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static PrivateChannel[]|Proxy[] findBy(array $attributes)
 * @method static PrivateChannel[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static PrivateChannel[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class PrivateChannelFactory extends ModelFactory
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
            'name' => self::faker()->text(255),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(PrivateChannel $privateChannel): void {})
        ;
    }

    protected static function getClass(): string
    {
        return PrivateChannel::class;
    }
}
