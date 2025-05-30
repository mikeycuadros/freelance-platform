<?php

namespace App\Controller;

use App\Entity\Chat;
use App\Entity\User;
use App\Form\ChatType;
use App\Repository\ChatRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class ChatController extends AbstractController
{
    #[Route(name: 'app_chat_index', methods: ['GET'])]
    public function index(ChatRepository $chatRepository): Response
    {
        return $this->render('chat/index.html.twig', [
            'chats' => $chatRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_chat_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $chat = new Chat();
        $form = $this->createForm(ChatType::class, $chat);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($chat);
            $entityManager->flush();

            return $this->redirectToRoute('app_chat_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('chat/new.html.twig', [
            'chat' => $chat,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_chat_show', methods: ['GET'])]
    public function show(Chat $chat): Response
    {
        return $this->render('chat/show.html.twig', [
            'chat' => $chat,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_chat_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Chat $chat, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ChatType::class, $chat);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_chat_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('chat/edit.html.twig', [
            'chat' => $chat,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_chat_delete', methods: ['POST'])]
    public function delete(Request $request, Chat $chat, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$chat->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($chat);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_chat_index', [], Response::HTTP_SEE_OTHER);
    }

    #[Route('/api/chats', name: 'api_chat_index', methods: ['GET'])]
    public function apiIndex(ChatRepository $chatRepository): JsonResponse
    {
        $user = $this->getUser();
        
        // Verificar si el usuario está autenticado
        if (!$user) {
            return $this->json([
                'message' => 'Necesitas iniciar sesión para ver tus chats',
                'status' => 'error'
            ], Response::HTTP_UNAUTHORIZED);
        }
        
        // Usar el método findByUser() para obtener los chats donde participa el usuario
        $chats = $chatRepository->findByUser($user);
        return $this->json($chats, 200, [], ['groups' => 'chat:read']);
    }

    #[Route('/api/chats/{id}', name: 'api_chat_show', methods: ['GET'])]
    public function apiShow(Chat $chat, SerializerInterface $serializer): JsonResponse
    {
        $data = $serializer->serialize($chat, 'json', ['groups' => 'chat:read']);
        
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/api/chats/new', name: 'api_chat_create', methods: ['POST'])]
    public function apiCreate(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $content = $request->getContent();
        try {
            // Decodificar el JSON para obtener los IDs de usuario
            $data = json_decode($content, true);
            
            if (!isset($data['user1_id']) || !isset($data['user2_id'])) {
                return new JsonResponse(['error' => 'Se requieren user1_id y user2_id'], Response::HTTP_BAD_REQUEST);
            }
            
            // Buscar los usuarios por ID
            $userRepository = $entityManager->getRepository(User::class);
            $user1 = $userRepository->find($data['user1_id']);
            $user2 = $userRepository->find($data['user2_id']);
            
            if (!$user1 || !$user2) {
                return new JsonResponse(['error' => 'Uno o ambos usuarios no existen'], Response::HTTP_BAD_REQUEST);
            }
            
            // Crear el nuevo chat
            $chat = new Chat();
            $chat->setUser1($user1);
            $chat->setUser2($user2);
            
            $entityManager->persist($chat);
            $entityManager->flush();
            
            $data = $serializer->serialize($chat, 'json', ['groups' => 'chat:read']);
            
            return new JsonResponse($data, Response::HTTP_CREATED, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/chats/{id}', name: 'api_chat_update', methods: ['PUT', 'PATCH'])]
    public function apiUpdate(Request $request, Chat $chat, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $content = $request->getContent();
        try {
            $serializer->deserialize($content, Chat::class, 'json', [
                'object_to_populate' => $chat
            ]);
            
            $entityManager->flush();
            
            $data = $serializer->serialize($chat, 'json', ['groups' => 'chat:read']);
            
            return new JsonResponse($data, Response::HTTP_OK, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/chats/{id}', name: 'api_chat_delete', methods: ['DELETE'])]
    public function apiDelete(Chat $chat, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($chat);
        $entityManager->flush();
        
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
