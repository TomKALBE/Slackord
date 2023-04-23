<?php

namespace App\DataFixtures;

use App\Factory\ServerFactory;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ServerFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        ServerFactory::createMany(30);
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
        ];
    }
}
