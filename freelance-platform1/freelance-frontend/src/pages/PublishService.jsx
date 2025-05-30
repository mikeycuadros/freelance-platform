import React, { useState } from "react";

const PublicService = () => {
  const [servicio, setServicio] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    precio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServicio({ ...servicio, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí agregar lógica para publicar el servicio
    console.log(servicio);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">
        Publicar un nuevo servicio
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="titulo" className="block font-semibold mb-2">
              Título del servicio
            </label>
            <Input
              type="text"
              id="titulo"
              name="titulo"
              value={servicio.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="descripcion" className="block font-semibold mb-2">
              Descripción
            </label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={servicio.descripcion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="categoria" className="block font-semibold mb-2">
              Categoría
            </label>
            <Input
              type="text"
              id="categoria"
              name="categoria"
              value={servicio.categoria}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="precio" className="block font-semibold mb-2">
              Precio
            </label>
            <Input
              type="number"
              id="precio"
              name="precio"
              value={servicio.precio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-center">
            <Button type="submit" variant="primary" className="w-full">
              Publicar servicio
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicService;
