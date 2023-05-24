<?php

namespace App\DataFixtures;

use App\DataFixtures\UserFixtures;
use App\Factory\FriendRequestFactory;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class FriendRequestFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        FriendRequestFactory::createMany(50);
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
