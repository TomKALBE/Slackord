<?php

namespace App\DataFixtures;

use App\Factory\Channel\PrivateChannelFactory;
use App\Factory\MessageFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class PrivateChannelFixtures extends Fixture
{
    /**
     * The PrivateChannelFixtures will load all the data it needs to instantiate a PrivateChannel:
     *  - the channels themselves
     *  - the involved users
     *  - the messages
     */
    public function load(ObjectManager $manager): void
    {
        // First, create the channel
        foreach (range(1, 5) as $privateChannelIndex) {
            $privateChannel = PrivateChannelFactory::createOne([
                'name' => sprintf('privateChannel%d', $privateChannelIndex),
            ]);

            // Then create the users participating
            foreach (range(1, random_int(1, 5)) as $userIndex) {
                $user = UserFactory::createOne([
                    'email' => sprintf('privateChannel%dUser%d', $privateChannelIndex, $userIndex),
                    'pseudo' => sprintf('privateChannel%dUser%d', $privateChannelIndex, $userIndex),
                    'password' => sprintf('privateChannel%dUser%d', $privateChannelIndex, $userIndex),
                ]);

                $user->addPrivateChannel($privateChannel->object());
            }

            // And finally create some messages for each user
            MessageFactory::createSequence(function () use ($privateChannel): \Generator {
                $messageDate = MessageFactory::faker()->dateTimeThisYear();

                foreach (range(5, random_int(5, 25)) as $timesUsersPosted) {
                    foreach ($privateChannel->getUsers() as $user) {
                        $messageDate = MessageFactory::faker()->dateTimeInInterval(
                            $messageDate,
                            sprintf('+%d hours', random_int(1, 72))
                        );

                        // Users may post successive messages
                        foreach (range(1, random_int(1, 4)) as $successiveMessagesCount) {
                            $messageDate = MessageFactory::faker()->dateTimeInInterval(
                                $messageDate,
                                sprintf('+%d seconds', random_int(45, 300))
                            );

                            yield [
                                'author' => $user,
                                'channel' => $privateChannel,
                                'postedAt' => \DateTimeImmutable::createFromMutable($messageDate),
                            ];
                        }
                    }
                }
            });
        }

        $manager->flush();
    }
}
