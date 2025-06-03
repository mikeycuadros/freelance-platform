<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Category;
use App\Entity\Chat;
use App\Entity\Message;
use App\Entity\Freelancer;
use App\Entity\Review;
use App\Entity\Experience;
use App\Entity\Portfolio;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher) {}

    public function load(ObjectManager $manager): void
    {

        // Crear dos usuarios
        $user1 = new User();
        $user1->setUsername('usuario1');
        $user1->setEmail('usuario1@email.com');
        $user1->setRoles(['ROLE_FREELANCER', 'ROLE_ADMIN']);
        $user1->setPassword($this->passwordHasher->hashPassword($user1, '123456'));
        $manager->persist($user1);

        // Crear perfil de freelancer para usuario1
        $freelancer = new Freelancer();
        $freelancer->setUserId($user1);
        $freelancer->setTitle('Desarrollador Web Full Stack');
        $freelancer->setDescription('Especialista en desarrollo web con más de 5 años de experiencia en tecnologías frontend y backend. Experto en PHP, JavaScript, React y Symfony.');
        $freelancer->setSkills(['PHP', 'JavaScript', 'React', 'Symfony', 'MySQL', 'Docker', 'Git']);
        $freelancer->setHourlyRate(35);
        $freelancer->setCreatedAt(new \DateTimeImmutable('-6 months'));
        
        // Crear y añadir experiencias para el freelancer
        $experience1 = new Experience();
        $experience1->setCompany('Tech Solutions');
        $experience1->setPosition('Backend Developer');
        $experience1->setStartDate(new \DateTime('2018-01-01'));
        $experience1->setEndDate(new \DateTime('2020-12-31'));
        $experience1->setDescription('Desarrollo de APIs RESTful y mantenimiento de bases de datos MySQL.');
        $experience1->setFreelancer($freelancer);
        $manager->persist($experience1);
        
        $experience2 = new Experience();
        $experience2->setCompany('Web Innovators');
        $experience2->setPosition('Full Stack Developer');
        $experience2->setStartDate(new \DateTime('2021-01-01'));
        $experience2->setEndDate(new \DateTime('2023-12-31'));
        $experience2->setDescription('Desarrollo de aplicaciones web usando React y Symfony.');
        $experience2->setFreelancer($freelancer);
        $manager->persist($experience2);
        
        // Crear y añadir portfolios para el freelancer
        $portfolio1 = new Portfolio();
        $portfolio1->setTitle('Sistema de Gestión de Inventario');
        $portfolio1->setDescription('Desarrollo de un sistema completo de gestión de inventario con React y Symfony.');
        $portfolio1->setUrl('https://ejemplo.com/inventario');
        $portfolio1->setFreelancer($freelancer);
        $manager->persist($portfolio1);
        
        $portfolio2 = new Portfolio();
        $portfolio2->setTitle('Plataforma E-commerce');
        $portfolio2->setDescription('Creación de una tienda online con carrito de compras, pasarela de pagos y panel de administración.');
        $portfolio2->setUrl('https://ejemplo.com/ecommerce');
        $portfolio2->setFreelancer($freelancer);
        $manager->persist($portfolio2);
        
        $manager->persist($freelancer);

        $user2 = new User();
        $user2->setUsername('usuario2');
        $user2->setEmail('usuario2@email.com');
        $user2->setRoles(['ROLE_CLIENT']);
        $user2->setPassword($this->passwordHasher->hashPassword($user2, '123456'));
        $manager->persist($user2);

        // Crear una reseña del usuario2 hacia el usuario1 (freelancer)
        $review = new Review();
        $review->setUser($user2);
        $review->setFreelancer($freelancer);
        $review->setRating(5);
        $review->setComment('Excelente trabajo. El desarrollador entregó el proyecto antes de tiempo y con una calidad excepcional. Su conocimiento en React y Symfony es impresionante. Definitivamente volveré a contratarlo para futuros proyectos.');
        $review->setCreatedAt(new \DateTimeImmutable('-2 months'));
        $manager->persist($review);
        
        // Crear una segunda reseña para tener más datos
        $review2 = new Review();
        $review2->setUser($user2);
        $review2->setFreelancer($freelancer);
        $review2->setRating(4);
        $review2->setComment('Muy buen trabajo en el desarrollo de mi sitio web. Resolvió todos los problemas técnicos rápidamente y la comunicación fue fluida. Recomendado para proyectos de desarrollo web.');
        $review2->setCreatedAt(new \DateTimeImmutable('-1 month'));
        $manager->persist($review2);

        // Crear un chat entre los dos usuarios
        $chat = new Chat();
        $chat->setUser1($user1);
        $chat->setUser2($user2);
        $manager->persist($chat);

        // Crear mensajes en el chat
        $message1 = new Message();
        $message1->setContent('¡Hola! ¿Cómo estás?');
        $message1->setDate(new \DateTime('-10 minutes'));
        $message1->setSender($user1);
        $message1->setReceiver($user2);
        $message1->setChat($chat);
        $manager->persist($message1);

        $message2 = new Message();
        $message2->setContent('¡Hola! Muy bien, ¿y tú?');
        $message2->setDate(new \DateTime('-8 minutes'));
        $message2->setSender($user2);
        $message2->setReceiver($user1);
        $message2->setChat($chat);
        $manager->persist($message2);

        $message3 = new Message();
        $message3->setContent('Todo bien, gracias por preguntar.');
        $message3->setDate(new \DateTime('-5 minutes'));
        $message3->setSender($user1);
        $message3->setReceiver($user2);
        $message3->setChat($chat);
        $manager->persist($message3);

        // Añadir más usuarios freelancers
        // Usuario 3 - Diseñador UX/UI
        $user3 = new User();
        $user3->setUsername('maria_design');
        $user3->setEmail('maria@design.com');
        $user3->setRoles(['ROLE_FREELANCER']);
        $user3->setPassword($this->passwordHasher->hashPassword($user3, '123456'));
        $manager->persist($user3);

        $freelancer3 = new Freelancer();
        $freelancer3->setUserId($user3);
        $freelancer3->setTitle('Diseñadora UX/UI Senior');
        $freelancer3->setDescription('Diseñadora con 7 años de experiencia creando interfaces intuitivas y atractivas. Especializada en experiencia de usuario y diseño de interfaces para aplicaciones web y móviles.');
        $freelancer3->setSkills(['UI/UX', 'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'Diseño de Logos', 'Wireframing', 'Prototipos']);
        $freelancer3->setHourlyRate(40);
        $freelancer3->setCreatedAt(new \DateTimeImmutable('-5 months'));
        
        // Crear y añadir experiencias para el freelancer3
        $experience3 = new Experience();
        $experience3->setCompany('Creative Studio');
        $experience3->setPosition('UX Designer');
        $experience3->setStartDate(new \DateTime('2016-01-01'));
        $experience3->setEndDate(new \DateTime('2019-12-31'));
        $experience3->setDescription('Diseño de interfaces para aplicaciones móviles.');
        $experience3->setFreelancer($freelancer3);
        $manager->persist($experience3);
        
        $experience4 = new Experience();
        $experience4->setCompany('DesignPro');
        $experience4->setPosition('UI/UX Lead');
        $experience4->setStartDate(new \DateTime('2020-01-01'));
        $experience4->setEndDate(new \DateTime('2023-12-31'));
        $experience4->setDescription('Liderazgo de proyectos de diseño web y experiencia de usuario.');
        $experience4->setFreelancer($freelancer3);
        $manager->persist($experience4);
        
        $manager->persist($freelancer3);

        // Usuario 4 - Desarrollador Móvil
        $user4 = new User();
        $user4->setUsername('carlos_mobile');
        $user4->setEmail('carlos@mobile.com');
        $user4->setRoles(['ROLE_FREELANCER']);
        $user4->setPassword($this->passwordHasher->hashPassword($user4, '123456'));
        $manager->persist($user4);

        $freelancer4 = new Freelancer();
        $freelancer4->setUserId($user4);
        $freelancer4->setTitle('Desarrollador de Aplicaciones Móviles');
        $freelancer4->setDescription('Especialista en desarrollo de aplicaciones nativas para iOS y Android. Experiencia en Flutter para desarrollo multiplataforma y en integración con APIs REST.');
        $freelancer4->setSkills(['Swift', 'Kotlin', 'Flutter', 'React Native', 'Firebase', 'RESTful APIs', 'Git', 'Android Studio', 'Xcode']);
        $freelancer4->setHourlyRate(45);
        $freelancer4->setCreatedAt(new \DateTimeImmutable('-4 months'));
        $manager->persist($freelancer4);

        // Usuario 5 - Especialista en Marketing Digital
        $user5 = new User();
        $user5->setUsername('ana_marketing');
        $user5->setEmail('ana@marketing.com');
        $user5->setRoles(['ROLE_FREELANCER']);
        $user5->setPassword($this->passwordHasher->hashPassword($user5, '123456'));
        $manager->persist($user5);

        $freelancer5 = new Freelancer();
        $freelancer5->setUserId($user5);
        $freelancer5->setTitle('Especialista en Marketing Digital y SEO');
        $freelancer5->setDescription('Experta en estrategias de marketing digital, posicionamiento SEO y campañas SEM. Enfoque en análisis de datos y optimización de conversiones.');
        $freelancer5->setSkills(['SEO', 'SEM', 'Google Ads', 'Facebook Ads', 'Instagram Ads', 'Email Marketing', 'Análisis de Datos', 'Google Analytics', 'Marketing de Contenidos']);
        $freelancer5->setHourlyRate(38);
        $freelancer5->setCreatedAt(new \DateTimeImmutable('-3 months'));
        $manager->persist($freelancer5);

        // Usuario 6 - Científico de Datos
        $user6 = new User();
        $user6->setUsername('pablo_data');
        $user6->setEmail('pablo@data.com');
        $user6->setRoles(['ROLE_FREELANCER']);
        $user6->setPassword($this->passwordHasher->hashPassword($user6, '123456'));
        $manager->persist($user6);

        $freelancer6 = new Freelancer();
        $freelancer6->setUserId($user6);
        $freelancer6->setTitle('Científico de Datos y Machine Learning');
        $freelancer6->setDescription('Especialista en análisis de datos, modelos predictivos y aprendizaje automático. Experiencia en proyectos de big data y visualización de datos.');
        $freelancer6->setSkills(['Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 'Pandas', 'TensorFlow', 'Scikit-learn', 'Tableau', 'Power BI']);
        $freelancer6->setHourlyRate(50);
        $freelancer6->setCreatedAt(new \DateTimeImmutable('-2 months'));
        $manager->persist($freelancer6);

        // Usuario 7 - Redactor de Contenidos
        $user7 = new User();
        $user7->setUsername('laura_content');
        $user7->setEmail('laura@content.com');
        $user7->setRoles(['ROLE_FREELANCER']);
        $user7->setPassword($this->passwordHasher->hashPassword($user7, '123456'));
        $manager->persist($user7);

        $freelancer7 = new Freelancer();
        $freelancer7->setUserId($user7);
        $freelancer7->setTitle('Redactora de Contenidos SEO');
        $freelancer7->setDescription('Redactora especializada en contenidos optimizados para SEO. Experiencia en blogs, artículos, copywriting y traducción español-inglés.');
        $freelancer7->setSkills(['Copywriting', 'Redacción SEO', 'Blogs', 'Artículos', 'Traducción', 'Corrección', 'Marketing de Contenidos']);
        $freelancer7->setHourlyRate(30);
        $freelancer7->setCreatedAt(new \DateTimeImmutable('-1 month'));
        $manager->persist($freelancer7);

        // Usuario 8 - Cliente adicional
        $user8 = new User();
        $user8->setUsername('cliente_empresa');
        $user8->setEmail('cliente@empresa.com');
        $user8->setRoles(['ROLE_CLIENT']);
        $user8->setPassword($this->passwordHasher->hashPassword($user8, '123456'));
        $manager->persist($user8);

        // Añadir algunas reseñas para los nuevos freelancers
        $review3 = new Review();
        $review3->setUser($user8);
        $review3->setFreelancer($freelancer3);
        $review3->setRating(5);
        $review3->setComment('María diseñó una interfaz increíble para nuestra aplicación. Su trabajo en UX/UI transformó completamente la experiencia de usuario. Muy profesional y creativa.');
        $review3->setCreatedAt(new \DateTimeImmutable('-3 weeks'));
        $manager->persist($review3);

        $review4 = new Review();
        $review4->setUser($user2);
        $review4->setFreelancer($freelancer4);
        $review4->setRating(4);
        $review4->setComment('Carlos desarrolló nuestra app para iOS y Android con gran calidad. El código es limpio y la app funciona perfectamente en ambas plataformas.');
        $review4->setCreatedAt(new \DateTimeImmutable('-2 weeks'));
        $manager->persist($review4);

        $review5 = new Review();
        $review5->setUser($user8);
        $review5->setFreelancer($freelancer5);
        $review5->setRating(5);
        $review5->setComment('Ana implementó una estrategia de marketing digital que aumentó nuestro tráfico web en un 200%. Su conocimiento en SEO y publicidad en redes sociales es excelente.');
        $review5->setCreatedAt(new \DateTimeImmutable('-1 week'));
        $manager->persist($review5);

        $categories = [
            [
                'name' => 'Desarrollo Web',
                'icon' => 'Code',
                'description' => 'Sitios web, aplicaciones web y desarrollo de software personalizado',
                'skills' => ['HTML', 'CSS', 'JavaScript', 'PHP', 'React', 'Angular', 'Vue.js', 'Node.js', 'Laravel', 'Symfony', 'WordPress', 'Shopify', 'Wix', 'Webflow']
            ],
            [
                'name' => 'Diseño y Creatividad',
                'icon' => 'PencilAlt',
                'description' => 'Diseño gráfico, diseño UI/UX y trabajo creativo',
                'skills' => ['Photoshop', 'Illustrator', 'Figma', 'Sketch', 'InDesign', 'UI/UX', 'Diseño de Logos', 'Branding', 'Ilustración', 'Animación', 'Diseño Editorial']
            ],
            [
                'name' => 'Redacción y Traducción',
                'icon' => 'Newspaper',
                'description' => 'Redacción de contenido, copywriting y servicios de traducción',
                'skills' => ['Copywriting', 'Redacción SEO', 'Traducción', 'Corrección', 'Transcripción', 'Redacción Técnica', 'Ghostwriting', 'Blogs', 'Artículos', 'Guiones']
            ],
            [
                'name' => 'Marketing y SEO',
                'icon' => 'ChartPie',
                'description' => 'Marketing digital, optimización SEO y publicidad',
                'skills' => ['SEO', 'SEM', 'Google Ads', 'Facebook Ads', 'Instagram Ads', 'Email Marketing', 'Marketing de Contenidos', 'Análisis de Datos', 'Growth Hacking', 'Estrategia Digital']
            ],
            [
                'name' => 'Video y Animación',
                'icon' => 'Video',
                'description' => 'Edición de video, gráficos en movimiento y servicios de animación',
                'skills' => ['Edición de Video', 'After Effects', 'Premiere Pro', 'Animación 2D', 'Animación 3D', 'Motion Graphics', 'VFX', 'Videografía', 'Producción de Video', 'Storyboarding']
            ],
            [
                'name' => 'Ciencia de Datos',
                'icon' => 'Database',
                'description' => 'Análisis de datos, visualización y aprendizaje automático',
                'skills' => ['Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 'Tableau', 'Power BI', 'Estadística', 'Big Data', 'Data Mining', 'NLP', 'Computer Vision']
            ],
            // Categorías adicionales basadas en la imagen
            [
                'name' => 'Desarrollo Móvil',
                'icon' => 'Mobile',
                'description' => 'iOS, Android y desarrollo de aplicaciones móviles multiplataforma',
                'skills' => ['Swift', 'Kotlin', 'Java', 'Flutter', 'React Native', 'Xamarin', 'Ionic', 'Android Studio', 'Xcode', 'Firebase', 'App Store Optimization']
            ],
            [
                'name' => 'Contabilidad y Finanzas',
                'icon' => 'MoneyBillAlt',
                'description' => 'Contabilidad, análisis financiero y preparación de impuestos',
                'skills' => ['Contabilidad', 'Finanzas', 'Impuestos', 'Auditoría', 'Presupuestos', 'Análisis Financiero', 'Planificación Fiscal', 'QuickBooks', 'Excel Financiero', 'SAP']
            ],
            [
                'name' => 'Servicios Legales',
                'icon' => 'Briefcase',
                'description' => 'Asesoramiento legal, revisión de contratos y cumplimiento normativo',
                'skills' => ['Contratos', 'Propiedad Intelectual', 'Derecho Mercantil', 'Derecho Laboral', 'Términos y Condiciones', 'RGPD', 'Compliance', 'Asesoría Legal', 'Patentes', 'Marcas']
            ],
            [
                'name' => 'Atención al Cliente',
                'icon' => 'UserTie',
                'description' => 'Servicio al cliente, soporte técnico y asistencia virtual',
                'skills' => ['Atención al Cliente', 'Soporte Técnico', 'Asistencia Virtual', 'Gestión de Tickets', 'Chat en Vivo', 'Email Support', 'CRM', 'Zendesk', 'Intercom', 'Freshdesk']
            ],
            [
                'name' => 'Audio y Música',
                'icon' => 'Microphone',
                'description' => 'Locución, producción musical y edición de audio',
                'skills' => ['Producción Musical', 'Mezcla', 'Masterización', 'Composición', 'Locución', 'Efectos de Sonido', 'Podcast', 'Jingles', 'Edición de Audio', 'Logic Pro', 'Ableton Live']
            ],
            [
                'name' => 'Ingeniería y Arquitectura',
                'icon' => 'Building',
                'description' => 'Diseño CAD, ingeniería de productos y servicios arquitectónicos',
                'skills' => ['AutoCAD', 'Revit', 'SketchUp', 'SolidWorks', 'Diseño 3D', 'Modelado BIM', 'Renderizado', 'Planos Arquitectónicos', 'Diseño de Interiores', 'Ingeniería Civil']
            ],
        ];

        foreach ($categories as $categoryData) {
            $category = new Category();
            $category->setName($categoryData['name']);
            $category->setIcon($categoryData['icon']);
            $category->setDescription($categoryData['description']);
            $category->setSkills($categoryData['skills']);
            
            $manager->persist($category);
            $this->addReference('category_' . strtolower(str_replace(' ', '_', $categoryData['name'])), $category);
        }

        // Crear más chats entre diferentes usuarios
        
        // Chat entre usuario2 (cliente) y usuario3 (diseñadora)
        $chat2 = new Chat();
        $chat2->setUser1($user2);
        $chat2->setUser2($user3);
        $manager->persist($chat2);
        
        // Mensajes del chat2
        $message4 = new Message();
        $message4->setContent('Hola María, estoy interesado en tu servicio de diseño UX/UI para mi aplicación.');
        $message4->setDate(new \DateTime('-2 days'));
        $message4->setSender($user2);
        $message4->setReceiver($user3);
        $message4->setChat($chat2);
        $manager->persist($message4);
        
        $message5 = new Message();
        $message5->setContent('¡Hola! Gracias por contactarme. Me encantaría saber más sobre tu proyecto.');
        $message5->setDate(new \DateTime('-2 days +30 minutes'));
        $message5->setSender($user3);
        $message5->setReceiver($user2);
        $message5->setChat($chat2);
        $manager->persist($message5);
        
        $message6 = new Message();
        $message6->setContent('Es una aplicación de gestión de tareas. Necesito un diseño moderno e intuitivo.');
        $message6->setDate(new \DateTime('-2 days +45 minutes'));
        $message6->setSender($user2);
        $message6->setReceiver($user3);
        $message6->setChat($chat2);
        $manager->persist($message6);
        
        $message7 = new Message();
        $message7->setContent('Perfecto, puedo ayudarte con eso. ¿Tienes alguna referencia visual o requisitos específicos?');
        $message7->setDate(new \DateTime('-2 days +1 hour'));
        $message7->setSender($user3);
        $message7->setReceiver($user2);
        $message7->setChat($chat2);
        $manager->persist($message7);
        
        // Chat entre usuario8 (cliente_empresa) y usuario4 (desarrollador móvil)
        $chat3 = new Chat();
        $chat3->setUser1($user8);
        $chat3->setUser2($user4);
        $manager->persist($chat3);
        
        // Mensajes del chat3
        $message8 = new Message();
        $message8->setContent('Buenos días Carlos, necesitamos desarrollar una app para nuestra empresa.');
        $message8->setDate(new \DateTime('-5 days'));
        $message8->setSender($user8);
        $message8->setReceiver($user4);
        $message8->setChat($chat3);
        $manager->persist($message8);
        
        $message9 = new Message();
        $message9->setContent('Buenos días. Claro, estaría encantado de ayudarles. ¿Qué tipo de app necesitan?');
        $message9->setDate(new \DateTime('-5 days +2 hours'));
        $message9->setSender($user4);
        $message9->setReceiver($user8);
        $message9->setChat($chat3);
        $manager->persist($message9);
        
        $message10 = new Message();
        $message10->setContent('Necesitamos una app para iOS y Android que permita a nuestros clientes hacer pedidos y seguir su estado.');
        $message10->setDate(new \DateTime('-5 days +3 hours'));
        $message10->setSender($user8);
        $message10->setReceiver($user4);
        $message10->setChat($chat3);
        $manager->persist($message10);
        
        $message11 = new Message();
        $message11->setContent('Entiendo. Podría desarrollarla con Flutter para que funcione en ambas plataformas. ¿Tienen algún diseño o wireframe?');
        $message11->setDate(new \DateTime('-5 days +4 hours'));
        $message11->setSender($user4);
        $message11->setReceiver($user8);
        $message11->setChat($chat3);
        $manager->persist($message11);
        
        $message12 = new Message();
        $message12->setContent('Aún no, pero podríamos contratar también a un diseñador. ¿Podrías recomendarnos a alguien?');
        $message12->setDate(new \DateTime('-4 days'));
        $message12->setSender($user8);
        $message12->setReceiver($user4);
        $message12->setChat($chat3);
        $manager->persist($message12);
        
        $message13 = new Message();
        $message13->setContent('Sí, conozco a María (maria_design), es excelente diseñadora UX/UI y ha trabajado conmigo en varios proyectos.');
        $message13->setDate(new \DateTime('-4 days +1 hour'));
        $message13->setSender($user4);
        $message13->setReceiver($user8);
        $message13->setChat($chat3);
        $manager->persist($message13);
        
        // Chat entre usuario1 (freelancer desarrollador) y usuario5 (especialista marketing)
        $chat4 = new Chat();
        $chat4->setUser1($user1);
        $chat4->setUser2($user5);
        $manager->persist($chat4);
        
        // Mensajes del chat4
        $message14 = new Message();
        $message14->setContent('Hola Ana, estoy desarrollando una web para un cliente y necesitaríamos ayuda con el SEO.');
        $message14->setDate(new \DateTime('-3 days'));
        $message14->setSender($user1);
        $message14->setReceiver($user5);
        $message14->setChat($chat4);
        $manager->persist($message14);
        
        $message15 = new Message();
        $message15->setContent('¡Hola! Claro, puedo ayudarte con eso. ¿De qué tipo de web se trata?');
        $message15->setDate(new \DateTime('-3 days +15 minutes'));
        $message15->setSender($user5);
        $message15->setReceiver($user1);
        $message15->setChat($chat4);
        $manager->persist($message15);
        
        $message16 = new Message();
        $message16->setContent('Es una tienda online de productos artesanales. Necesitamos mejorar su visibilidad en Google.');
        $message16->setDate(new \DateTime('-3 days +30 minutes'));
        $message16->setSender($user1);
        $message16->setReceiver($user5);
        $message16->setChat($chat4);
        $manager->persist($message16);
        
        $message17 = new Message();
        $message17->setContent('Perfecto, tengo experiencia en SEO para e-commerce. Podría hacer un análisis de keywords y optimizar el contenido.');
        $message17->setDate(new \DateTime('-3 days +45 minutes'));
        $message17->setSender($user5);
        $message17->setReceiver($user1);
        $message17->setChat($chat4);
        $manager->persist($message17);
        
        $message18 = new Message();
        $message18->setContent('Suena bien. ¿Cuál sería tu tarifa para este tipo de trabajo?');
        $message18->setDate(new \DateTime('-3 days +1 hour'));
        $message18->setSender($user1);
        $message18->setReceiver($user5);
        $message18->setChat($chat4);
        $manager->persist($message18);
        
        $message19 = new Message();
        $message19->setContent('Para un análisis completo y optimización inicial, serían aproximadamente 20 horas a mi tarifa habitual de 38€/hora.');
        $message19->setDate(new \DateTime('-3 days +1 hour 15 minutes'));
        $message19->setSender($user5);
        $message19->setReceiver($user1);
        $message19->setChat($chat4);
        $manager->persist($message19);
        
        // Chat entre usuario7 (redactora) y usuario8 (cliente_empresa)
        $chat5 = new Chat();
        $chat5->setUser1($user7);
        $chat5->setUser2($user8);
        $manager->persist($chat5);
        
        // Mensajes del chat5
        $message20 = new Message();
        $message20->setContent('Buenas tardes Laura, necesitamos contenido para nuestro blog corporativo.');
        $message20->setDate(new \DateTime('-1 day'));
        $message20->setSender($user8);
        $message20->setReceiver($user7);
        $message20->setChat($chat5);
        $manager->persist($message20);
        
        $message21 = new Message();
        $message21->setContent('Buenas tardes. Encantada de conocerle. ¿Qué tipo de contenido necesitan y con qué frecuencia?');
        $message21->setDate(new \DateTime('-1 day +10 minutes'));
        $message21->setSender($user7);
        $message21->setReceiver($user8);
        $message21->setChat($chat5);
        $manager->persist($message21);
        
        $message22 = new Message();
        $message22->setContent('Necesitamos 4 artículos mensuales sobre tecnología empresarial, optimizados para SEO.');
        $message22->setDate(new \DateTime('-1 day +20 minutes'));
        $message22->setSender($user8);
        $message22->setReceiver($user7);
        $message22->setChat($chat5);
        $manager->persist($message22);
        
        $message23 = new Message();
        $message23->setContent('Perfecto, puedo encargarme de eso. ¿Tienen ya un estudio de palabras clave o necesitan que lo incluya en el servicio?');
        $message23->setDate(new \DateTime('-1 day +30 minutes'));
        $message23->setSender($user7);
        $message23->setReceiver($user8);
        $message23->setChat($chat5);
        $manager->persist($message23);

        $manager->flush();
    }
}

