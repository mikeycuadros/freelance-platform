import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setData(await fetchFunction());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // abortController es un objeto que me permite abortar una peticion fetch
    const abortController = new AbortController();
    // me pongo de carga
    setLoading(true);
    //  llamo a la funcion que me pasan por parametro
    fetchData();
    // limpiar los errores
    setError(null);

    return () => {
      // lo que pongamos aqui se ejecutara cuando el componente se desmonte
      abortController.abort();
    };
  }, dependencies);
  
  // retorno los datos, si estoy cargando o hay un error
  return { data, loading, error };
};
