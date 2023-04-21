<?php

namespace App\Factory;

use App\Entity\UserRole;
use App\Repository\UserRoleRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<UserRole>
 *
 * @method        UserRole|Proxy create(array|callable $attributes = [])
 * @method static UserRole|Proxy createOne(array $attributes = [])
 * @method static UserRole|Proxy find(object|array|mixed $criteria)
 * @method static UserRole|Proxy findOrCreate(array $attributes)
 * @method static UserRole|Proxy first(string $sortedField = 'id')
 * @method static UserRole|Proxy last(string $sortedField = 'id')
 * @method static UserRole|Proxy random(array $attributes = [])
 * @method static UserRole|Proxy randomOrCreate(array $attributes = [])
 * @method static UserRoleRepository|RepositoryProxy repository()
 * @method static UserRole[]|Proxy[] all()
 * @method static UserRole[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static UserRole[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static UserRole[]|Proxy[] findBy(array $attributes)
 * @method static UserRole[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static UserRole[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class UserRoleFactory extends ModelFactory
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
            'server' => ServerFactory::new(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(UserRole $userRole): void {})
        ;
    }

    protected static function getClass(): string
    {
        return UserRole::class;
    }
}
