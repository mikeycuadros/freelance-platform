<?php

namespace App\Security;

use App\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

class JWTSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    private $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token): Response
    {
        $user = $token->getUser();
        
        // Usa el método create() que automáticamente usará getJWTCustomClaims()
        // Con la configuración user_identity_field: email, el JWT tendrá email como identificador
        $jwt = $this->jwtManager->create($user);

        $data = [
            'token' => $jwt,
            'user' => [
                'id' => $user instanceof User ? $user->getId() : null,
                'email' => $user->getUserIdentifier(),
                'username' => $user instanceof User ? $user->getUsername() : null,
                'roles' => $user->getRoles(),
            ]
        ];

        return new JsonResponse($data);
    }
}