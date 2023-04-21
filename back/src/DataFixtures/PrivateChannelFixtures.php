<?php

namespace App\DataFixtures;

use App\Factory\Channel\PrivateChannelFactory;
use App\Factory\MessageFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class PrivateChannelFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        foreach (range(1, 30) as $privateChannelCount) {
            $privateChannel = PrivateChannelFactory::createOne([
                'name' => $channelName = PrivateChannelFactory::faker()->unique()->domainWord(),
            ]);

            foreach (range(2, random_int(2, 5)) as $memberCount) {
                $username = sprintf('%sUser%d', $channelName, $memberCount);

                $userProxy = UserFactory::createOne([
                    'pseudo' => $username,
                    'password' => $username,
                    'email' => sprintf('%s@zombocom.com', $username),
                    'privateChannels' => [$privateChannel],
                ]);

                MessageFactory::createSequence(function () use ($userProxy, $privateChannel) {
                    $user = $userProxy->object();
                    $messagePostedAt = \DateTimeImmutable::createFromMutable(MessageFactory::faker()->dateTimeThisYear());

                    foreach (range(1, random_int(1, 4)) as $messageCount) {
                        $messagePostedAt = $messagePostedAt->modify(sprintf('+%d seconds', random_int(45, 300)));

                        yield [
                            'author' => $user,
                            'channel' => $privateChannel,
                            'postedAt' => $messagePostedAt,
                        ];
                    }
                });
            }
        }

        $manager->flush();
    }
}
