<?php

namespace App\Controller;

use App\Repository\MessageRepository;
use App\Repository\ReviewRepository;
use App\Repository\UserRepository;
use App\Repository\FreelancerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_ADMIN')]
class AdminController extends AbstractController
{
    #[Route('api/stats', name: 'app_admin_stats', methods: ['GET'])]
    public function getStats(
        EntityManagerInterface $entityManager,
        UserRepository $userRepository,
        FreelancerRepository $freelancerRepository
    ): JsonResponse {
        // Usuarios que reciben más mensajes (solo freelancers)
        $topMessageReceivers = $entityManager->createQuery(
            'SELECT u.id, u.username, COUNT(m.id) as messageCount
            FROM App\\Entity\\User u
            JOIN App\\Entity\\Freelancer f WITH f.userId = u
            JOIN App\\Entity\\Chat c WITH (c.user1 = u OR c.user2 = u)
            JOIN App\\Entity\\Message m WITH m.chat = c AND m.sender != u
            GROUP BY u.id
            ORDER BY messageCount DESC'
        )
        ->setMaxResults(5)
        ->getResult();
        
        // Freelancers con más reseñas
        $topReviewReceivers = $entityManager->createQuery(
            'SELECT u.id, u.username, COUNT(r.id) as reviewCount
            FROM App\\Entity\\User u
            JOIN App\\Entity\\Freelancer f WITH f.userId = u
            JOIN App\\Entity\\Review r WITH r.freelancer = f
            GROUP BY u.id
            ORDER BY reviewCount DESC'
        )
        ->setMaxResults(5)
        ->getResult();
        
        // Freelancers con mejor rating promedio
        $topRatedFreelancers = $entityManager->createQuery(
            'SELECT u.id, u.username, AVG(r.rating) as averageRating
            FROM App\\Entity\\User u
            JOIN App\\Entity\\Freelancer f WITH f.userId = u
            JOIN App\\Entity\\Review r WITH r.freelancer = f
            GROUP BY u.id
            HAVING COUNT(r.id) >= 1
            ORDER BY averageRating DESC'
        )
        ->setMaxResults(5)
        ->getResult();
        
        return $this->json([
            'topMessageReceivers' => $topMessageReceivers,
            'topReviewReceivers' => $topReviewReceivers,
            'topRatedFreelancers' => $topRatedFreelancers
        ]);
    }
}