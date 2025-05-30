import React from "react";

const HowWorks = () => {
  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">¿Cómo funciona?</h1>

      <section className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">
          1. Regístrate y crea tu perfil
        </h2>
        <p className="text-lg mb-6">
          Únete a nuestra plataforma y crea un perfil que destaque tus
          habilidades y experiencia como freelancer.
        </p>
        <img
          src="https://via.placeholder.com/100"
          alt="Perfil"
          className="mx-auto mb-6"
        />

        <h2 className="text-2xl font-semibold mb-6">
          2. Publica tus servicios
        </h2>
        <p className="text-lg mb-6">
          Ofrece tus servicios creando publicaciones detalladas que describan tu
          oferta y tarifas.
        </p>
        <img
          src="https://via.placeholder.com/100"
          alt="Publicar servicio"
          className="mx-auto mb-6"
        />

        <h2 className="text-2xl font-semibold mb-6">
          3. Explora proyectos y comienza a trabajar
        </h2>
        <p className="text-lg mb-6">
          Explora proyectos disponibles y contacta a los clientes para empezar a
          trabajar en sus necesidades.
        </p>
        <img
          src="https://via.placeholder.com/100"
          alt="Explorar proyectos"
          className="mx-auto mb-6"
        />

        <h2 className="text-2xl font-semibold mb-6">
          4. Gestiona tus pagos de forma segura
        </h2>
        <p className="text-lg mb-6">
          Una vez que completes el trabajo, recibirás tu pago a través de la
          plataforma de forma rápida y segura.
        </p>
        <img
          src="https://via.placeholder.com/100"
          alt="Pagos seguros"
          className="mx-auto mb-6"
        />
      </section>
    </div>
  );
};

export default HowWorks;
