<?php

namespace App\Repository;

use App\Entity\ChannelGroup;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ChannelGroup>
 *
 * @method ChannelGroup|null find($id, $lockMode = null, $lockVersion = null)
 * @method ChannelGroup|null findOneBy(array $criteria, array $orderBy = null)
 * @method ChannelGroup[]    findAll()
 * @method ChannelGroup[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChannelGroupRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ChannelGroup::class);
    }

    public function save(ChannelGroup $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ChannelGroup $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
