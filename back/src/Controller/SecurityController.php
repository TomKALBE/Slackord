<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SecurityController extends AbstractController
{
    #[Route('/api/register', name: 'register', methods: 'POST')]
    public function register(
        Request $request,
        SerializerInterface $serializer,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $em,
        JWTTokenManagerInterface $jWTTokenManager,
    ): JsonResponse {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');

        $user->setPassword($passwordHasher->hashPassword($user, $user->getPassword()));

        $em->persist($user);
        $em->flush();

        return $this->json([
            'token' => $jWTTokenManager->create($user),
            'user' => $user,
        ]);
    }
}
