<?php

namespace App\Controller;

use App\Entity\Client;
use App\Entity\Freelancer;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class SecurityController extends AbstractController
{
    private $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    #[Route(path: '/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): JsonResponse
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return new JsonResponse([
            'last_username' => $lastUsername,
            'error' => $error ? $error->getMessage() : null
        ]);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function apiLogin(#[CurrentUser] ?User $user): JsonResponse
    {
        if (null === $user) {
            return new JsonResponse([
                'message' => 'Credenciales inválidas'
            ], Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse([
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'username' => $user->getUsername(),
                'roles' => $user->getRoles(),
            ],
        ]);
    }

    #[Route(path: '/api/logout', name: 'api_logout')]
    public function apiLogout(): void
    {
        throw new \LogicException('Este método nunca debería ser llamado. Está aquí solo por completitud.');
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request, 
        UserPasswordHasherInterface $passwordHasher, 
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        // Validar datos requeridos
        if (!isset($data['email']) || !isset($data['password']) || !isset($data['username'])) {
            return new JsonResponse([
                'message' => 'Faltan datos requeridos (email, password, username)'
            ], Response::HTTP_BAD_REQUEST);
        }
        
        // Verificar si el email ya existe
        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return new JsonResponse([
                'message' => 'El email ya está registrado'
            ], Response::HTTP_CONFLICT);
        }
        
        // Crear nuevo usuario
        $user = new User();
        $user->setEmail($data['email']);
        $user->setUsername($data['username']);
    
        // Procesar roles si se envían
        if (isset($data['roles']) && is_array($data['roles'])) {
            $user->setRoles($data['roles']);
        }
    
        // Hashear la contraseña
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $data['password']
        );
        $user->setPassword($hashedPassword);
    
        // Validar entidad
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            
            return new JsonResponse([
                'message' => 'Error de validación',
                'errors' => $errorMessages
            ], Response::HTTP_BAD_REQUEST);
        }
    
        // Guardar primero el usuario para que tenga ID
        $entityManager->persist($user);
        $entityManager->flush();
    
        // Ahora sí, crear Freelancer o Client si corresponde
        if (in_array('ROLE_FREELANCER', $user->getRoles())) {
            $freelancer = new Freelancer();
            $freelancer->setUserId($user);
            $freelancer->setTitle('Sin título');
            $freelancer->setDescription('Sin descripción');
            $freelancer->setSkills([]);
            $freelancer->setHourlyRate('20');
            $freelancer->setCreatedAt(new \DateTimeImmutable()); // Establecer fecha de registro
            $entityManager->persist($freelancer);
        }
        if (in_array('ROLE_CLIENT', $user->getRoles())) {
            $client = new Client();
            $client->setUserId($user);
            $entityManager->persist($client);
        }
    
        // Guardar las entidades relacionadas
        $entityManager->flush();

        // Generar el token JWT
        $token = $this->jwtManager->create($user);
    
        return new JsonResponse([
            'message' => 'Usuario registrado correctamente',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'username' => $user->getUsername(),
                'roles' => $user->getRoles()
            ],
            'token' => $token
        ], Response::HTTP_CREATED);
    }
}
