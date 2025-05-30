<?php

namespace App\Entity;

use App\Repository\ChatRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ChatRepository::class)]
class Chat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['chat:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'chats')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['chat:read'])]
    private ?User $user1 = null;

    #[ORM\ManyToOne(inversedBy: 'chats')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['chat:read'])]
    private ?User $user2 = null;

    /**
     * @var Collection<int, Message>
     */
    #[ORM\OneToMany(targetEntity: Message::class, mappedBy: 'chat')]
    #[Groups(['chat:read'])]
    private Collection $menssage;

    public function __construct()
    {
        $this->menssage = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser1(): ?User
    {
        return $this->user1;
    }

    public function setUser1(?User $user1): static
    {
        $this->user1 = $user1;

        return $this;
    }

    public function getUser2(): ?User
    {
        return $this->user2;
    }

    public function setUser2(?User $user2): static
    {
        $this->user2 = $user2;

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMenssage(): Collection
    {
        return $this->menssage;
    }

    public function addMenssage(Message $menssage): static
    {
        if (!$this->menssage->contains($menssage)) {
            $this->menssage->add($menssage);
            $menssage->setChat($this);
        }

        return $this;
    }

    public function removeMenssage(Message $menssage): static
    {
        if ($this->menssage->removeElement($menssage)) {
            // set the owning side to null (unless already changed)
            if ($menssage->getChat() === $this) {
                $menssage->setChat(null);
            }
        }

        return $this;
    }
}
