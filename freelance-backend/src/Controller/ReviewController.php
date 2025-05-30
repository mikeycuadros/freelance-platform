<?php

namespace App\Controller;

use App\Entity\Review;
use App\Form\ReviewType;
use App\Repository\ReviewRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\User;
use App\Entity\Freelancer;

final class ReviewController extends AbstractController
{
    #[Route(name: 'app_review_index', methods: ['GET'])]
    public function index(ReviewRepository $reviewRepository): Response
    {
        return $this->render('review/index.html.twig', [
            'reviews' => $reviewRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_review_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $review = new Review();
        $form = $this->createForm(ReviewType::class, $review);
        $form->handleRequest($request);
    
        if ($form->isSubmitted() && $form->isValid()) {
            $review->setCreatedAt(new \DateTimeImmutable()); // Establecer fecha de creación
            $entityManager->persist($review);
            $entityManager->flush();
    
            return $this->redirectToRoute('app_review_index', [], Response::HTTP_SEE_OTHER);
        }
    
        return $this->render('review/new.html.twig', [
            'review' => $review,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_review_show', methods: ['GET'])]
    public function show(Review $review): Response
    {
        return $this->render('review/show.html.twig', [
            'review' => $review,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_review_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Review $review, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ReviewType::class, $review);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_review_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('review/edit.html.twig', [
            'review' => $review,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_review_delete', methods: ['POST'])]
    public function delete(Request $request, Review $review, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$review->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($review);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_review_index', [], Response::HTTP_SEE_OTHER);
    }

    #[Route('/api/reviews/new', name: 'api_review_create', methods: ['POST'])]
    public function apiCreate(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $content = $request->getContent();
        try {
            // Decodificar el JSON para obtener los datos de la reseña
            $data = json_decode($content, true);
            
            if (!isset($data['rating']) || !isset($data['comment']) || !isset($data['freelancerId'])) {
                return new JsonResponse(['error' => 'Se requieren rating, comment y freelancerId'], Response::HTTP_BAD_REQUEST);
            }
            
            // Obtener el usuario autenticado
            $user = $this->getUser();
            if (!$user) {
                return new JsonResponse(['error' => 'Usuario no autenticado'], Response::HTTP_UNAUTHORIZED);
            }
            
            // Buscar el freelancer por ID
            $freelancerRepository = $entityManager->getRepository(Freelancer::class);
            $freelancer = $freelancerRepository->find($data['freelancerId']);
            
            if (!$freelancer) {
                return new JsonResponse(['error' => 'Freelancer no encontrado'], Response::HTTP_BAD_REQUEST);
            }
            
            // Crear la nueva reseña
            $review = new Review();
            $review->setRating($data['rating']);
            $review->setComment($data['comment']);
            $review->setFreelancer($freelancer);
            $review->setUser($user);
            $review->setCreatedAt(new \DateTimeImmutable()); // Añadir esta línea
            
            $entityManager->persist($review);
            $entityManager->flush();
            
            $data = $serializer->serialize($review, 'json', ['groups' => 'user:read']);
            
            return new JsonResponse($data, Response::HTTP_CREATED, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
