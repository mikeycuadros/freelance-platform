-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 02-06-2025 a las 09:06:11
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `freelance_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skills` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `name`, `icon`, `description`, `skills`) VALUES
(1, 'Desarrollo Web', 'code', 'Sitios web, aplicaciones web y desarrollo de software personalizado', 'a:14:{i:0;s:4:\"HTML\";i:1;s:3:\"CSS\";i:2;s:10:\"JavaScript\";i:3;s:3:\"PHP\";i:4;s:5:\"React\";i:5;s:7:\"Angular\";i:6;s:6:\"Vue.js\";i:7;s:7:\"Node.js\";i:8;s:7:\"Laravel\";i:9;s:7:\"Symfony\";i:10;s:9:\"WordPress\";i:11;s:7:\"Shopify\";i:12;s:3:\"Wix\";i:13;s:7:\"Webflow\";}'),
(2, 'Diseño y Creatividad', 'design', 'Diseño gráfico, diseño UI/UX y trabajo creativo', 'a:11:{i:0;s:9:\"Photoshop\";i:1;s:11:\"Illustrator\";i:2;s:5:\"Figma\";i:3;s:6:\"Sketch\";i:4;s:8:\"InDesign\";i:5;s:5:\"UI/UX\";i:6;s:16:\"Diseño de Logos\";i:7;s:8:\"Branding\";i:8;s:12:\"Ilustración\";i:9;s:10:\"Animación\";i:10;s:17:\"Diseño Editorial\";}'),
(3, 'Redacción y Traducción', 'writing', 'Redacción de contenido, copywriting y servicios de traducción', 'a:10:{i:0;s:11:\"Copywriting\";i:1;s:14:\"Redacción SEO\";i:2;s:11:\"Traducción\";i:3;s:11:\"Corrección\";i:4;s:14:\"Transcripción\";i:5;s:19:\"Redacción Técnica\";i:6;s:12:\"Ghostwriting\";i:7;s:5:\"Blogs\";i:8;s:10:\"Artículos\";i:9;s:7:\"Guiones\";}'),
(4, 'Marketing y SEO', 'marketing', 'Marketing digital, optimización SEO y publicidad', 'a:10:{i:0;s:3:\"SEO\";i:1;s:3:\"SEM\";i:2;s:10:\"Google Ads\";i:3;s:12:\"Facebook Ads\";i:4;s:13:\"Instagram Ads\";i:5;s:15:\"Email Marketing\";i:6;s:23:\"Marketing de Contenidos\";i:7;s:18:\"Análisis de Datos\";i:8;s:14:\"Growth Hacking\";i:9;s:18:\"Estrategia Digital\";}'),
(5, 'Video y Animación', 'video', 'Edición de video, gráficos en movimiento y servicios de animación', 'a:10:{i:0;s:17:\"Edición de Video\";i:1;s:13:\"After Effects\";i:2;s:12:\"Premiere Pro\";i:3;s:13:\"Animación 2D\";i:4;s:13:\"Animación 3D\";i:5;s:15:\"Motion Graphics\";i:6;s:3:\"VFX\";i:7;s:12:\"Videografía\";i:8;s:20:\"Producción de Video\";i:9;s:13:\"Storyboarding\";}'),
(6, 'Ciencia de Datos', 'data', 'Análisis de datos, visualización y aprendizaje automático', 'a:12:{i:0;s:6:\"Python\";i:1;s:1:\"R\";i:2;s:3:\"SQL\";i:3;s:16:\"Machine Learning\";i:4;s:13:\"Deep Learning\";i:5;s:7:\"Tableau\";i:6;s:8:\"Power BI\";i:7;s:12:\"Estadística\";i:8;s:8:\"Big Data\";i:9;s:11:\"Data Mining\";i:10;s:3:\"NLP\";i:11;s:15:\"Computer Vision\";}'),
(7, 'Desarrollo Móvil', 'mobile', 'iOS, Android y desarrollo de aplicaciones móviles multiplataforma', 'a:11:{i:0;s:5:\"Swift\";i:1;s:6:\"Kotlin\";i:2;s:4:\"Java\";i:3;s:7:\"Flutter\";i:4;s:12:\"React Native\";i:5;s:7:\"Xamarin\";i:6;s:5:\"Ionic\";i:7;s:14:\"Android Studio\";i:8;s:5:\"Xcode\";i:9;s:8:\"Firebase\";i:10;s:22:\"App Store Optimization\";}'),
(8, 'Contabilidad y Finanzas', 'accounting', 'Contabilidad, análisis financiero y preparación de impuestos', 'a:10:{i:0;s:12:\"Contabilidad\";i:1;s:8:\"Finanzas\";i:2;s:9:\"Impuestos\";i:3;s:10:\"Auditoría\";i:4;s:12:\"Presupuestos\";i:5;s:20:\"Análisis Financiero\";i:6;s:21:\"Planificación Fiscal\";i:7;s:10:\"QuickBooks\";i:8;s:16:\"Excel Financiero\";i:9;s:3:\"SAP\";}'),
(9, 'Servicios Legales', 'legal', 'Asesoramiento legal, revisión de contratos y cumplimiento normativo', 'a:10:{i:0;s:9:\"Contratos\";i:1;s:21:\"Propiedad Intelectual\";i:2;s:17:\"Derecho Mercantil\";i:3;s:15:\"Derecho Laboral\";i:4;s:23:\"Términos y Condiciones\";i:5;s:4:\"RGPD\";i:6;s:10:\"Compliance\";i:7;s:15:\"Asesoría Legal\";i:8;s:8:\"Patentes\";i:9;s:6:\"Marcas\";}'),
(10, 'Atención al Cliente', 'support', 'Servicio al cliente, soporte técnico y asistencia virtual', 'a:10:{i:0;s:20:\"Atención al Cliente\";i:1;s:16:\"Soporte Técnico\";i:2;s:18:\"Asistencia Virtual\";i:3;s:19:\"Gestión de Tickets\";i:4;s:12:\"Chat en Vivo\";i:5;s:13:\"Email Support\";i:6;s:3:\"CRM\";i:7;s:7:\"Zendesk\";i:8;s:8:\"Intercom\";i:9;s:9:\"Freshdesk\";}'),
(11, 'Audio y Música', 'audio', 'Locución, producción musical y edición de audio', 'a:11:{i:0;s:19:\"Producción Musical\";i:1;s:6:\"Mezcla\";i:2;s:14:\"Masterización\";i:3;s:12:\"Composición\";i:4;s:9:\"Locución\";i:5;s:17:\"Efectos de Sonido\";i:6;s:7:\"Podcast\";i:7;s:7:\"Jingles\";i:8;s:17:\"Edición de Audio\";i:9;s:9:\"Logic Pro\";i:10;s:12:\"Ableton Live\";}'),
(12, 'Ingeniería y Arquitectura', 'engineering', 'Diseño CAD, ingeniería de productos y servicios arquitectónicos', 'a:10:{i:0;s:7:\"AutoCAD\";i:1;s:5:\"Revit\";i:2;s:8:\"SketchUp\";i:3;s:10:\"SolidWorks\";i:4;s:10:\"Diseño 3D\";i:5;s:12:\"Modelado BIM\";i:6;s:11:\"Renderizado\";i:7;s:23:\"Planos Arquitectónicos\";i:8;s:21:\"Diseño de Interiores\";i:9;s:17:\"Ingeniería Civil\";}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user1_id` int NOT NULL,
  `user2_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_659DF2AA56AE248B` (`user1_id`),
  KEY `IDX_659DF2AA441B8B65` (`user2_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `chat`
--

INSERT INTO `chat` (`id`, `user1_id`, `user2_id`) VALUES
(1, 1, 2),
(2, 2, 3),
(3, 8, 4),
(4, 1, 5),
(5, 7, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_C74404559D86650F` (`user_id_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experience`
--

DROP TABLE IF EXISTS `experience`;
CREATE TABLE IF NOT EXISTS `experience` (
  `id` int NOT NULL AUTO_INCREMENT,
  `freelancer_id` int DEFAULT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_590C1038545BDF5` (`freelancer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `experience`
--

INSERT INTO `experience` (`id`, `freelancer_id`, `company`, `position`, `start_date`, `end_date`, `description`) VALUES
(1, 1, 'Tech Solutions', 'Backend Developer', '2018-01-01 00:00:00', '2020-12-31 00:00:00', 'Desarrollo de APIs RESTful y mantenimiento de bases de datos MySQL.'),
(2, 1, 'Web Innovators', 'Full Stack Developer', '2021-01-01 00:00:00', '2023-12-31 00:00:00', 'Desarrollo de aplicaciones web usando React y Symfony.'),
(3, 2, 'Creative Studio', 'UX Designer', '2016-01-01 00:00:00', '2019-12-31 00:00:00', 'Diseño de interfaces para aplicaciones móviles.'),
(4, 2, 'DesignPro', 'UI/UX Lead', '2020-01-01 00:00:00', '2023-12-31 00:00:00', 'Liderazgo de proyectos de diseño web y experiencia de usuario.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `freelancer`
--

DROP TABLE IF EXISTS `freelancer`;
CREATE TABLE IF NOT EXISTS `freelancer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skills` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `hourly_rate` int NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_4C2ED1E89D86650F` (`user_id_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `freelancer`
--

INSERT INTO `freelancer` (`id`, `user_id_id`, `title`, `description`, `skills`, `hourly_rate`, `created_at`) VALUES
(1, 1, 'Desarrollador Web Full Stack', 'Especialista en desarrollo web con más de 5 años de experiencia en tecnologías frontend y backend. Experto en PHP, JavaScript, React y Symfony.', 'a:7:{i:0;s:3:\"PHP\";i:1;s:10:\"JavaScript\";i:2;s:5:\"React\";i:3;s:7:\"Symfony\";i:4;s:5:\"MySQL\";i:5;s:6:\"Docker\";i:6;s:3:\"Git\";}', 35, '2024-12-02 09:05:19'),
(2, 3, 'Diseñadora UX/UI Senior', 'Diseñadora con 7 años de experiencia creando interfaces intuitivas y atractivas. Especializada en experiencia de usuario y diseño de interfaces para aplicaciones web y móviles.', 'a:9:{i:0;s:5:\"UI/UX\";i:1;s:5:\"Figma\";i:2;s:6:\"Sketch\";i:3;s:8:\"Adobe XD\";i:4;s:9:\"Photoshop\";i:5;s:11:\"Illustrator\";i:6;s:16:\"Diseño de Logos\";i:7;s:11:\"Wireframing\";i:8;s:10:\"Prototipos\";}', 40, '2025-01-02 09:05:19'),
(3, 4, 'Desarrollador de Aplicaciones Móviles', 'Especialista en desarrollo de aplicaciones nativas para iOS y Android. Experiencia en Flutter para desarrollo multiplataforma y en integración con APIs REST.', 'a:9:{i:0;s:5:\"Swift\";i:1;s:6:\"Kotlin\";i:2;s:7:\"Flutter\";i:3;s:12:\"React Native\";i:4;s:8:\"Firebase\";i:5;s:12:\"RESTful APIs\";i:6;s:3:\"Git\";i:7;s:14:\"Android Studio\";i:8;s:5:\"Xcode\";}', 45, '2025-02-02 09:05:20'),
(4, 5, 'Especialista en Marketing Digital y SEO', 'Experta en estrategias de marketing digital, posicionamiento SEO y campañas SEM. Enfoque en análisis de datos y optimización de conversiones.', 'a:9:{i:0;s:3:\"SEO\";i:1;s:3:\"SEM\";i:2;s:10:\"Google Ads\";i:3;s:12:\"Facebook Ads\";i:4;s:13:\"Instagram Ads\";i:5;s:15:\"Email Marketing\";i:6;s:18:\"Análisis de Datos\";i:7;s:16:\"Google Analytics\";i:8;s:23:\"Marketing de Contenidos\";}', 38, '2025-03-02 09:05:20'),
(5, 6, 'Científico de Datos y Machine Learning', 'Especialista en análisis de datos, modelos predictivos y aprendizaje automático. Experiencia en proyectos de big data y visualización de datos.', 'a:10:{i:0;s:6:\"Python\";i:1;s:1:\"R\";i:2;s:3:\"SQL\";i:3;s:16:\"Machine Learning\";i:4;s:13:\"Deep Learning\";i:5;s:6:\"Pandas\";i:6;s:10:\"TensorFlow\";i:7;s:12:\"Scikit-learn\";i:8;s:7:\"Tableau\";i:9;s:8:\"Power BI\";}', 50, '2025-04-02 09:05:20'),
(6, 7, 'Redactora de Contenidos SEO', 'Redactora especializada en contenidos optimizados para SEO. Experiencia en blogs, artículos, copywriting y traducción español-inglés.', 'a:7:{i:0;s:11:\"Copywriting\";i:1;s:14:\"Redacción SEO\";i:2;s:5:\"Blogs\";i:3;s:10:\"Artículos\";i:4;s:11:\"Traducción\";i:5;s:11:\"Corrección\";i:6;s:23:\"Marketing de Contenidos\";}', 30, '2025-05-02 09:05:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `chat_id` int DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_B6BD307FF624B39D` (`sender_id`),
  KEY `IDX_B6BD307FCD53EDB6` (`receiver_id`),
  KEY `IDX_B6BD307F1A9A7125` (`chat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `message`
--

INSERT INTO `message` (`id`, `sender_id`, `receiver_id`, `chat_id`, `content`, `date`) VALUES
(1, 1, 2, 1, '¡Hola! ¿Cómo estás?', '2025-06-02 08:55:19'),
(2, 2, 1, 1, '¡Hola! Muy bien, ¿y tú?', '2025-06-02 08:57:19'),
(3, 1, 2, 1, 'Todo bien, gracias por preguntar.', '2025-06-02 09:00:19'),
(4, 2, 3, 2, 'Hola María, estoy interesado en tu servicio de diseño UX/UI para mi aplicación.', '2025-05-31 09:05:21'),
(5, 3, 2, 2, '¡Hola! Gracias por contactarme. Me encantaría saber más sobre tu proyecto.', '2025-05-31 09:35:21'),
(6, 2, 3, 2, 'Es una aplicación de gestión de tareas. Necesito un diseño moderno e intuitivo.', '2025-05-31 09:50:21'),
(7, 3, 2, 2, 'Perfecto, puedo ayudarte con eso. ¿Tienes alguna referencia visual o requisitos específicos?', '2025-05-31 10:05:21'),
(8, 8, 4, 3, 'Buenos días Carlos, necesitamos desarrollar una app para nuestra empresa.', '2025-05-28 09:05:21'),
(9, 4, 8, 3, 'Buenos días. Claro, estaría encantado de ayudarles. ¿Qué tipo de app necesitan?', '2025-05-28 11:05:21'),
(10, 8, 4, 3, 'Necesitamos una app para iOS y Android que permita a nuestros clientes hacer pedidos y seguir su estado.', '2025-05-28 12:05:21'),
(11, 4, 8, 3, 'Entiendo. Podría desarrollarla con Flutter para que funcione en ambas plataformas. ¿Tienen algún diseño o wireframe?', '2025-05-28 13:05:21'),
(12, 8, 4, 3, 'Aún no, pero podríamos contratar también a un diseñador. ¿Podrías recomendarnos a alguien?', '2025-05-29 09:05:21'),
(13, 4, 8, 3, 'Sí, conozco a María (maria_design), es excelente diseñadora UX/UI y ha trabajado conmigo en varios proyectos.', '2025-05-29 10:05:21'),
(14, 1, 5, 4, 'Hola Ana, estoy desarrollando una web para un cliente y necesitaríamos ayuda con el SEO.', '2025-05-30 09:05:21'),
(15, 5, 1, 4, '¡Hola! Claro, puedo ayudarte con eso. ¿De qué tipo de web se trata?', '2025-05-30 09:20:21'),
(16, 1, 5, 4, 'Es una tienda online de productos artesanales. Necesitamos mejorar su visibilidad en Google.', '2025-05-30 09:35:21'),
(17, 5, 1, 4, 'Perfecto, tengo experiencia en SEO para e-commerce. Podría hacer un análisis de keywords y optimizar el contenido.', '2025-05-30 09:50:21'),
(18, 1, 5, 4, 'Suena bien. ¿Cuál sería tu tarifa para este tipo de trabajo?', '2025-05-30 10:05:21'),
(19, 5, 1, 4, 'Para un análisis completo y optimización inicial, serían aproximadamente 20 horas a mi tarifa habitual de 38€/hora.', '2025-05-30 10:20:21'),
(20, 8, 7, 5, 'Buenas tardes Laura, necesitamos contenido para nuestro blog corporativo.', '2025-06-01 09:05:21'),
(21, 7, 8, 5, 'Buenas tardes. Encantada de conocerle. ¿Qué tipo de contenido necesitan y con qué frecuencia?', '2025-06-01 09:15:21'),
(22, 8, 7, 5, 'Necesitamos 4 artículos mensuales sobre tecnología empresarial, optimizados para SEO.', '2025-06-01 09:25:21'),
(23, 7, 8, 5, 'Perfecto, puedo encargarme de eso. ¿Tienen ya un estudio de palabras clave o necesitan que lo incluya en el servicio?', '2025-06-01 09:35:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messenger_messages`
--

DROP TABLE IF EXISTS `messenger_messages`;
CREATE TABLE IF NOT EXISTS `messenger_messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `headers` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue_name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  KEY `IDX_75EA56E016BA31DB` (`delivered_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `portfolio`
--

DROP TABLE IF EXISTS `portfolio`;
CREATE TABLE IF NOT EXISTS `portfolio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `freelancer_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_A9ED10628545BDF5` (`freelancer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `portfolio`
--

INSERT INTO `portfolio` (`id`, `freelancer_id`, `title`, `description`, `url`) VALUES
(1, 1, 'Sistema de Gestión de Inventario', 'Desarrollo de un sistema completo de gestión de inventario con React y Symfony.', 'https://ejemplo.com/inventario'),
(2, 1, 'Plataforma E-commerce', 'Creación de una tienda online con carrito de compras, pasarela de pagos y panel de administración.', 'https://ejemplo.com/ecommerce');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `review`
--

DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `freelancer_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_794381C68545BDF5` (`freelancer_id`),
  KEY `IDX_794381C6A76ED395` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `review`
--

INSERT INTO `review` (`id`, `freelancer_id`, `user_id`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 2, 5, 'Excelente trabajo. El desarrollador entregó el proyecto antes de tiempo y con una calidad excepcional. Su conocimiento en React y Symfony es impresionante. Definitivamente volveré a contratarlo para futuros proyectos.', '2025-04-02 09:05:19'),
(2, 1, 2, 4, 'Muy buen trabajo en el desarrollo de mi sitio web. Resolvió todos los problemas técnicos rápidamente y la comunicación fue fluida. Recomendado para proyectos de desarrollo web.', '2025-05-02 09:05:19'),
(3, 2, 8, 5, 'María diseñó una interfaz increíble para nuestra aplicación. Su trabajo en UX/UI transformó completamente la experiencia de usuario. Muy profesional y creativa.', '2025-05-12 09:05:21'),
(4, 3, 2, 4, 'Carlos desarrolló nuestra app para iOS y Android con gran calidad. El código es limpio y la app funciona perfectamente en ambas plataformas.', '2025-05-19 09:05:21'),
(5, 4, 8, 5, 'Ana implementó una estrategia de marketing digital que aumentó nuestro tráfico web en un 200%. Su conocimiento en SEO y publicidad en redes sociales es excelente.', '2025-05-26 09:05:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `username`) VALUES
(1, 'usuario1@email.com', '[\"ROLE_FREELANCER\", \"ROLE_ADMIN\"]', '$2y$13$VZvGPwdRiURPLg0OXCT33OeKEU3HTkPvgaiT7EKd8NlPYI82.DRnq', 'usuario1'),
(2, 'usuario2@email.com', '[\"ROLE_CLIENT\"]', '$2y$13$BbuE2LQyzd2JIAkr2PZKLek/gGQRL1v0eu/JtWtHIu93GU67cyaem', 'usuario2'),
(3, 'maria@design.com', '[\"ROLE_FREELANCER\"]', '$2y$13$N4UFRQl0hsBLTrPDxIygee4QA5gbiOHLwdwV299.kPbkvr1XoYiuO', 'maria_design'),
(4, 'carlos@mobile.com', '[\"ROLE_FREELANCER\"]', '$2y$13$GUqgM1Ps04ADFZGNtIVkM.ecZZwV3xo4hYvvQn/qmMpDB.2tTGKdG', 'carlos_mobile'),
(5, 'ana@marketing.com', '[\"ROLE_FREELANCER\"]', '$2y$13$9RY2civziMHK/nSjsxxxYetQBq1nQ1Gstfcwm6vx2N5kHcTBRCO6e', 'ana_marketing'),
(6, 'pablo@data.com', '[\"ROLE_FREELANCER\"]', '$2y$13$eBseC4ZMjN7xjszcYQh6XexvyPNJMjIgXEWPQhVosX8dJ07.wyf7u', 'pablo_data'),
(7, 'laura@content.com', '[\"ROLE_FREELANCER\"]', '$2y$13$xapnOXnOPrho3voQAPQGDOLIQmHcF1HQete/25t0qmAQW4yM/1Asm', 'laura_content'),
(8, 'cliente@empresa.com', '[\"ROLE_CLIENT\"]', '$2y$13$PauYdcjVv7q0K3RV8OI.8OpfrpoGxdCn/SOVhQNCAWQqw9y6wd76.', 'cliente_empresa');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `FK_659DF2AA441B8B65` FOREIGN KEY (`user2_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_659DF2AA56AE248B` FOREIGN KEY (`user1_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `FK_C74404559D86650F` FOREIGN KEY (`user_id_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `experience`
--
ALTER TABLE `experience`
  ADD CONSTRAINT `FK_590C1038545BDF5` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancer` (`id`);

--
-- Filtros para la tabla `freelancer`
--
ALTER TABLE `freelancer`
  ADD CONSTRAINT `FK_4C2ED1E89D86650F` FOREIGN KEY (`user_id_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `FK_B6BD307F1A9A7125` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`),
  ADD CONSTRAINT `FK_B6BD307FCD53EDB6` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_B6BD307FF624B39D` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `portfolio`
--
ALTER TABLE `portfolio`
  ADD CONSTRAINT `FK_A9ED10628545BDF5` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancer` (`id`);

--
-- Filtros para la tabla `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK_794381C68545BDF5` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancer` (`id`),
  ADD CONSTRAINT `FK_794381C6A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
