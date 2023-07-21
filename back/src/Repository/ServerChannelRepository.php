<?php

namespace App\Repository;

use App\Entity\Channel\ServerChannel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ServerChannel>
 *
 * @method ServerChannel|null find($id, $lockMode = null, $lockVersion = null)
 * @method ServerChannel|null findOneBy(array $criteria, array $orderBy = null)
 * @method ServerChannel[]    findAll()
 * @method ServerChannel[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ServerChannelRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ServerChannel::class);
    }

    public function save(ServerChannel $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ServerChannel $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
