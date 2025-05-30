<?php

namespace App\Entity;

use App\Repository\FreelancerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FreelancerRepository::class)]
class Freelancer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'freelancer:read'])]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'freelancer', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['freelancer:read'])]
    private ?User $userId = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'freelancer:read'])]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'freelancer:read'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::ARRAY)]
    #[Groups(['user:read', 'freelancer:read'])]
    private array $skills = [];

    #[ORM\Column]
    #[Groups(['user:read', 'freelancer:read'])]
    private ?int $hourlyRate = null;

    /**
     * @var Collection<int, Review>
     */
    #[ORM\OneToMany(targetEntity: Review::class, mappedBy: 'freelancer')]
    #[Groups(['freelancer:read'])]
    private Collection $reviews;

    #[ORM\Column]
    #[Groups(['user:read', 'freelancer:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, Experience>
     */
    #[ORM\OneToMany(targetEntity: Experience::class, mappedBy: 'freelancer')]
    #[Groups(['freelancer:read'])]
    private Collection $experiences;

    /**
     * @var Collection<int, Portfolio>
     */
    #[ORM\OneToMany(targetEntity: Portfolio::class, mappedBy: 'freelancer')]
    #[Groups(['freelancer:read'])]
    private Collection $portfolios;

    public function __construct()
    {
        $this->reviews = new ArrayCollection();
        $this->experiences = new ArrayCollection();
        $this->portfolios = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?User
    {
        return $this->userId;
    }

    public function setUserId(?User $userId): static
    {
        $this->userId = $userId;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getSkills(): array
    {
        return $this->skills;
    }

    public function setSkills(array $skills): static
    {
        $this->skills = $skills;

        return $this;
    }

    public function getHourlyRate(): ?int
    {
        return $this->hourlyRate;
    }

    public function setHourlyRate(int $hourlyRate): static
    {
        $this->hourlyRate = $hourlyRate;

        return $this;
    }

    /**
     * @return Collection<int, Review>
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): static
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews->add($review);
            $review->setFreelancer($this);
        }

        return $this;
    }

    public function removeReview(Review $review): static
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getFreelancer() === $this) {
                $review->setFreelancer(null);
            }
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection<int, Experience>
     */
    public function getExperiences(): Collection
    {
        return $this->experiences;
    }

    public function addExperience(Experience $experience): static
    {
        if (!$this->experiences->contains($experience)) {
            $this->experiences->add($experience);
            $experience->setFreelancer($this);
        }

        return $this;
    }

    public function removeExperience(Experience $experience): static
    {
        if ($this->experiences->removeElement($experience)) {
            // set the owning side to null (unless already changed)
            if ($experience->getFreelancer() === $this) {
                $experience->setFreelancer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Portfolio>
     */
    public function getPortfolios(): Collection
    {
        return $this->portfolios;
    }

    public function addPortfolio(Portfolio $portfolio): static
    {
        if (!$this->portfolios->contains($portfolio)) {
            $this->portfolios->add($portfolio);
            $portfolio->setFreelancer($this);
        }

        return $this;
    }

    public function removePortfolio(Portfolio $portfolio): static
    {
        if ($this->portfolios->removeElement($portfolio)) {
            // set the owning side to null (unless already changed)
            if ($portfolio->getFreelancer() === $this) {
                $portfolio->setFreelancer(null);
            }
        }

        return $this;
    }
}
