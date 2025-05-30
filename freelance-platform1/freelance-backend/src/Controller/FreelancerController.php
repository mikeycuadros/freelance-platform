<?php

namespace App\Controller;

use App\Entity\Freelancer;
use App\Entity\User;
use App\Form\FreelancerType;
use App\Repository\FreelancerRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

final class FreelancerController extends AbstractController
{
    #[Route(name: 'app_freelancer_index', methods: ['GET'])]
    public function index(FreelancerRepository $freelancerRepository): Response
    {
        return $this->render('freelancer/index.html.twig', [
            'freelancers' => $freelancerRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_freelancer_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $freelancer = new Freelancer();
        $form = $this->createForm(FreelancerType::class, $freelancer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($freelancer);
            $entityManager->flush();

            return $this->redirectToRoute('app_freelancer_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('freelancer/new.html.twig', [
            'freelancer' => $freelancer,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_freelancer_show', methods: ['GET'])]
    public function show(Freelancer $freelancer): Response
    {
        return $this->render('freelancer/show.html.twig', [
            'freelancer' => $freelancer,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_freelancer_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Freelancer $freelancer, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(FreelancerType::class, $freelancer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_freelancer_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('freelancer/edit.html.twig', [
            'freelancer' => $freelancer,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_freelancer_delete', methods: ['POST'])]
    public function delete(Request $request, Freelancer $freelancer, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$freelancer->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($freelancer);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_freelancer_index', [], Response::HTTP_SEE_OTHER);
    }
    
    
    #[Route("/api/freelancers", name:"api_freelancer_index", methods:["GET"])]
    public function apiIndex(FreelancerRepository $freelancerRepository, SerializerInterface $serializer): JsonResponse
    {
        $freelancers = $freelancerRepository->findAll();
        $data = $serializer->serialize($freelancers, 'json', ['groups' => 'freelancer:read']);
        
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }
    
    #[Route("/api/freelancers/{id}", name:"api_freelancer_show", methods:["GET"])]
    public function apiShow(Freelancer $freelancer, SerializerInterface $serializer): JsonResponse
    {
        $jsonData = $serializer->serialize($freelancer, 'json', ['groups' => 'freelancer:read']);
        
        return new JsonResponse($jsonData, Response::HTTP_OK, [], true);
    }
    
    #[Route("/api/freelancers/{id}", name:"api_freelancer_update", methods:["PUT", "PATCH"])]
    public function apiUpdate(Request $request, Freelancer $freelancer, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        // Verificar que el usuario actual tiene permiso para actualizar este freelancer
        $user = $this->getUser();
        if (!$user || $freelancer->getUserId() !== $user) {
            throw new AccessDeniedException('No tienes permiso para actualizar este perfil de freelancer');
        }
        
        $data = json_decode($request->getContent(), true);
        
        // Actualizar los campos del freelancer con los datos recibidos
        if (isset($data['title'])) {
            $freelancer->setTitle($data['title']);
        }
        
        if (isset($data['description'])) {
            $freelancer->setDescription($data['description']);
        }
        
        if (isset($data['hourlyRate'])) {
            $freelancer->setHourlyRate((int)$data['hourlyRate']);
        }
        
        if (isset($data['skills']) && is_array($data['skills'])) {
            $freelancer->setSkills($data['skills']);
        }
        
        // Actualizar experiencias
        if (isset($data['experiences']) && is_array($data['experiences'])) {
            // Eliminar experiencias existentes que no están en la nueva lista
            foreach ($freelancer->getExperiences() as $existingExperience) {
                $found = false;
                foreach ($data['experiences'] as $expData) {
                    if (isset($expData['id']) && $expData['id'] === $existingExperience->getId()) {
                        $found = true;
                        break;
                    }
                }
                
                if (!$found) {
                    $entityManager->remove($existingExperience);
                }
            }
            
            // Actualizar o crear nuevas experiencias
            foreach ($data['experiences'] as $expData) {
                $experience = null;
                
                // Si tiene ID, buscar la experiencia existente
                if (isset($expData['id'])) {
                    foreach ($freelancer->getExperiences() as $existingExperience) {
                        if ($existingExperience->getId() === $expData['id']) {
                            $experience = $existingExperience;
                            break;
                        }
                    }
                }
                
                // Si no se encontró, crear una nueva experiencia
                if (!$experience) {
                    $experience = new \App\Entity\Experience();
                    $experience->setFreelancer($freelancer);
                }
                
                // Actualizar los campos de la experiencia
                if (isset($expData['company'])) {
                    $experience->setCompany($expData['company']);
                }
                
                if (isset($expData['position'])) {
                    $experience->setPosition($expData['position']);
                }
                
                if (isset($expData['description'])) {
                    $experience->setDescription($expData['description']);
                }
                
                if (isset($expData['startDate'])) {
                    $experience->setStartDate(new \DateTime($expData['startDate']));
                }
                
                if (isset($expData['endDate'])) {
                    $experience->setEndDate(new \DateTime($expData['endDate']));
                }
                
                $entityManager->persist($experience);
            }
        }
        
        // Actualizar portfolio
        if (isset($data['portfolios']) && is_array($data['portfolios'])) {
            // Eliminar portfolios existentes que no están en la nueva lista
            foreach ($freelancer->getPortfolios() as $existingPortfolio) {
                $found = false;
                foreach ($data['portfolios'] as $portData) {
                    if (isset($portData['id']) && $portData['id'] === $existingPortfolio->getId()) {
                        $found = true;
                        break;
                    }
                }
                
                if (!$found) {
                    $entityManager->remove($existingPortfolio);
                }
            }
            
            // Actualizar o crear nuevos portfolios
            foreach ($data['portfolios'] as $portData) {
                $portfolio = null;
                
                // Si tiene ID, buscar el portfolio existente
                if (isset($portData['id'])) {
                    foreach ($freelancer->getPortfolios() as $existingPortfolio) {
                        if ($existingPortfolio->getId() === $portData['id']) {
                            $portfolio = $existingPortfolio;
                            break;
                        }
                    }
                }
                
                // Si no se encontró, crear un nuevo portfolio
                if (!$portfolio) {
                    $portfolio = new \App\Entity\Portfolio();
                    $portfolio->setFreelancer($freelancer);
                }
                
                // Actualizar los campos del portfolio
                if (isset($portData['title'])) {
                    $portfolio->setTitle($portData['title']);
                }
                
                if (isset($portData['description'])) {
                    $portfolio->setDescription($portData['description']);
                }
                
                if (isset($portData['url'])) {
                    $portfolio->setUrl($portData['url']);
                }
                
                $entityManager->persist($portfolio);
            }
        }
        
        $entityManager->flush();
        
        $jsonData = $serializer->serialize($freelancer, 'json', ['groups' => 'freelancer:read']);
        
        return new JsonResponse($jsonData, Response::HTTP_OK, [], true);
    }
    
    #[Route("/api/freelancers/{id}", name:"api_freelancer_delete", methods:["DELETE"])]
    public function apiDelete(Freelancer $freelancer, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($freelancer);
        $entityManager->flush();
        
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
