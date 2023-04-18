<?php

namespace App\Repository;

use App\Entity\Channel\PrivateChannel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PrivateChannel>
 *
 * @method PrivateChannel|null find($id, $lockMode = null, $lockVersion = null)
 * @method PrivateChannel|null findOneBy(array $criteria, array $orderBy = null)
 * @method PrivateChannel[]    findAll()
 * @method PrivateChannel[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PrivateChannelRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PrivateChannel::class);
    }

    public function save(PrivateChannel $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(PrivateChannel $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
