<?php

namespace App\EventListener;

use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedEventListener
{
    public function __construct(
        private UserRepository $userRepository
    ) {
    }

    public function onJwtCreated(JWTCreatedEvent $event)
    {
        $payload = $event->getData();
        $user = $this->userRepository->findOneBy([
            'email' => $payload['username'],
        ]);

        $expiresAt = new \DateTime('+1 year');

        $payload['id'] = $user->getId();
        $payload['pseudo'] = $user->getPseudo();
        $payload['exp'] = $expiresAt->getTimestamp();

        $event->setData($payload);
    }
}
