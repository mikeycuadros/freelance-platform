<?php

namespace App\Controller;

use App\Entity\Message;
use App\Form\MessageType;
use App\Repository\MessageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\Chat;
use App\Entity\User;

final class MessageController extends AbstractController
{
    #[Route(name: 'app_message_index', methods: ['GET'])]
    public function index(MessageRepository $messageRepository): Response
    {
        return $this->render('message/index.html.twig', [
            'messages' => $messageRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_message_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $message = new Message();
        $form = $this->createForm(MessageType::class, $message);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($message);
            $entityManager->flush();

            return $this->redirectToRoute('app_message_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('message/new.html.twig', [
            'message' => $message,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_message_show', methods: ['GET'])]
    public function show(Message $message): Response
    {
        return $this->render('message/show.html.twig', [
            'message' => $message,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_message_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Message $message, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(MessageType::class, $message);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_message_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('message/edit.html.twig', [
            'message' => $message,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_message_delete', methods: ['POST'])]
    public function delete(Request $request, Message $message, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$message->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($message);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_message_index', [], Response::HTTP_SEE_OTHER);
    }

    #[Route('/api/messages', name: 'api_message_index', methods: ['GET'])]
    public function apiIndex(MessageRepository $messageRepository, SerializerInterface $serializer): JsonResponse
    {
        $messages = $messageRepository->findAll();
        $data = $serializer->serialize($messages, 'json', ['groups' => 'message:read']);
        
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/api/messages/{id}', name: 'api_message_show', methods: ['GET'])]
    public function apiShow(Message $message, SerializerInterface $serializer): JsonResponse
    {
        $data = $serializer->serialize($message, 'json', ['groups' => 'message:read']);
        
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/api/messages/new', name: 'api_message_create', methods: ['POST'])]
    public function apiCreate(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $content = $request->getContent();
        try {
            $message = $serializer->deserialize($content, Message::class, 'json');
            
            // Obtener los IDs de los parámetros de consulta
            $chatId = $request->query->get('chatId');
            $senderId = $request->query->get('senderId');
            $receiverId = $request->query->get('receiverId');
            
            // Buscar las entidades correspondientes
            if ($chatId) {
                $chat = $entityManager->getRepository(Chat::class)->find($chatId);
                if ($chat) {
                    $message->setChat($chat);
                }
            }
            
            if ($senderId) {
                $sender = $entityManager->getRepository(User::class)->find($senderId);
                if ($sender) {
                    $message->setSender($sender);
                }
            }
            
            if ($receiverId) {
                $receiver = $entityManager->getRepository(User::class)->find($receiverId);
                if ($receiver) {
                    $message->setReceiver($receiver);
                }
            }
            
            $entityManager->persist($message);
            $entityManager->flush();
            
            $data = $serializer->serialize($message, 'json', ['groups' => 'message:read']);
            
            return new JsonResponse($data, Response::HTTP_CREATED, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/messages/{id}', name: 'api_message_update', methods: ['PUT', 'PATCH'])]
    public function apiUpdate(Request $request, Message $message, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $content = $request->getContent();
        try {
            $serializer->deserialize($content, Message::class, 'json', [
                'object_to_populate' => $message
            ]);
            
            $entityManager->flush();
            
            $data = $serializer->serialize($message, 'json', ['groups' => 'message:read']);
            
            return new JsonResponse($data, Response::HTTP_OK, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/messages/{id}', name: 'api_message_delete', methods: ['DELETE'])]
    public function apiDelete(Message $message, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($message);
        $entityManager->flush();
        
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
