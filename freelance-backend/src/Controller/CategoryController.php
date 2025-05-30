<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

final class CategoryController extends AbstractController
{
    // Rutas para la interfaz web (HTML)
    
    #[Route('/category', name: 'app_category_index', methods: ['GET'])]
    public function index(CategoryRepository $categoryRepository): Response
    {
        return $this->render('category/index.html.twig', [
            'categories' => $categoryRepository->findAll(),
        ]);
    }

    #[Route('/category/new', name: 'app_category_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $category = new Category();
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($category);
            $entityManager->flush();

            return $this->redirectToRoute('app_category_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('category/new.html.twig', [
            'category' => $category,
            'form' => $form,
        ]);
    }

    #[Route('/category/{id}', name: 'app_category_show', methods: ['GET'])]
    public function show(Category $category): Response
    {
        return $this->render('category/show.html.twig', [
            'category' => $category,
        ]);
    }

    #[Route('/category/{id}/edit', name: 'app_category_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Category $category, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_category_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('category/edit.html.twig', [
            'category' => $category,
            'form' => $form,
        ]);
    }

    #[Route('/category/{id}', name: 'app_category_delete', methods: ['POST'])]
    public function delete(Request $request, Category $category, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$category->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($category);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_category_index', [], Response::HTTP_SEE_OTHER);
    }
    
    // Rutas para la API (JSON)
    
    #[Route('/api/categories', name: 'api_categories_list', methods: ['GET'])]
    public function apiList(CategoryRepository $categoryRepository): JsonResponse
    {
        $categories = $categoryRepository->findAll();
        return $this->json($categories, 200, [], ['groups' => 'category:read']);
    }
    
    #[Route('/api/categories', name: 'api_categories_create', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN')]
    public function apiCreate(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!isset($data['name']) || empty($data['name'])) {
            return $this->json(['error' => 'El nombre de la categoría es obligatorio'], Response::HTTP_BAD_REQUEST);
        }
        
        $category = new Category();
        $category->setName($data['name']);
        
        // Añadir los nuevos campos si están presentes en la solicitud
        if (isset($data['icon'])) {
            $category->setIcon($data['icon']);
        }
        
        if (isset($data['description'])) {
            $category->setDescription($data['description']);
        }
        
        $entityManager->persist($category);
        $entityManager->flush();
        
        return $this->json([
            'id' => $category->getId(),
            'name' => $category->getName(),
            'icon' => $category->getIcon(),
            'description' => $category->getDescription()
        ], Response::HTTP_CREATED);
    }

    #[Route('/api/categories/{id}', name: 'api_categories_show', methods: ['GET'])]
    public function apiShow(Category $category): JsonResponse
    {
        return $this->json($category, 200, [], ['groups' => 'category:read']);
    }
    
    #[Route('/api/categories/{id}', name: 'api_categories_update', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN')]
    public function apiUpdate(Category $category, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!isset($data['name']) || empty($data['name'])) {
            return $this->json(['error' => 'El nombre de la categoría es obligatorio'], Response::HTTP_BAD_REQUEST);
        }
        
        $category->setName($data['name']);
        
        // Actualizar los nuevos campos si están presentes en la solicitud
        if (isset($data['icon'])) {
            $category->setIcon($data['icon']);
        }
        
        if (isset($data['description'])) {
            $category->setDescription($data['description']);
        }
        
        $entityManager->flush();
        
        return $this->json([
            'id' => $category->getId(),
            'name' => $category->getName(),
            'icon' => $category->getIcon(),
            'description' => $category->getDescription()
        ]);
    }
    
    #[Route('/api/categories/{id}', name: 'api_categories_delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN')]
    public function apiDelete(Category $category, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($category);
        $entityManager->flush();
        
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
