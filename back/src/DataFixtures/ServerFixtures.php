<?php

namespace App\DataFixtures;

use App\Factory\ServerFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ServerFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        foreach (range(1, 20) as $serverCount) {
            $server = ServerFactory::createOne([
                'name' => $channelName = ServerFactory::faker()->unique()->domainWord(),
                'admin'
            ]);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            PrivateChannelFixtures::class,
        ];
    }
}
