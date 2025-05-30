<?php

namespace App\Repository;

use App\Entity\Chat;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Chat>
 */
class ChatRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Chat::class);
    }

    /**
     * Encuentra todos los chats donde el usuario es user1 o user2
     * @return Chat[] Returns an array of Chat objects
     */
    public function findByUser($user): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.user1 = :user OR c.user2 = :user')
            ->setParameter('user', $user)
            ->orderBy('c.id', 'DESC')
            ->getQuery()
            ->getResult()
        ;
    }
}
