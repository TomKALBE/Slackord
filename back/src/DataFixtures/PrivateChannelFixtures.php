<?php

namespace App\DataFixtures;

use App\Factory\Channel\PrivateChannelFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class PrivateChannelFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        PrivateChannelFactory::createMany(30);
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
        ];
    }
}
