<?php

namespace App\Factory\Channel;

use App\Factory\UserFactory;
use Zenstruck\Foundry\Proxy;
use App\Factory\MessageFactory;
use Zenstruck\Foundry\ModelFactory;
use App\Entity\Channel\PrivateChannel;
use Zenstruck\Foundry\RepositoryProxy;
use App\Repository\PrivateChannelRepository;

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
            'name' => PrivateChannelFactory::faker()->unique()->domainWord()
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            ->afterPersist(function (PrivateChannel $privateChannel): void {
                foreach (range(5, random_int(5, 25)) as $timesUsersPosted) {
                    foreach (UserFactory::randomSet(random_int(2, 5)) as $user) {
                        $privateChannel->addMember($user->object());
                        $messagePostedAt = \DateTimeImmutable::createFromMutable(MessageFactory::faker()->dateTimeThisYear());

                        foreach (range(1, random_int(1, 4)) as $successiveMessagesCount) {
                            $messagePostedAt = $messagePostedAt->modify(sprintf('+%d seconds', random_int(45, 300)));

                            MessageFactory::createOne([
                                'author' => $user,
                                'channel' => $privateChannel,
                                'postedAt' => $messagePostedAt,
                            ]);
                        }
                    }
                }
            });
    }

    protected static function getClass(): string
    {
        return PrivateChannel::class;
    }
}
