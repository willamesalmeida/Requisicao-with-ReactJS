import { useState, useEffect } from "react";

//4 - custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  //5 - refatorando o POST
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(null);

  //6 - Loading
  const [loading, setLoading] = useState(false);

  //7 tratando erros
  const [error, setError] = useState(null);
  const [emptyForm, setEmptyForm] = useState(null);

  //8 - desafio delete
  const [itemId, setItemId] = useState(null);

  //4 - Custom Hook
  useEffect(() => {
    const fetchData = async () => {
      //6 - Loading
      setLoading(true);
      try {
        const res = await fetch(url);
        const dataJson = await res.json();

        setData(dataJson);
      } catch (error) {
        console.log(error.message);
        console.log(error.name);
        /*
        console.log(error.fileName)
        console.log(error.lineNumber)
        console.log(error.columnNumber)
        console.log(error.stack)
        */
        setError("Ocorreu um erro no carregamento dos dados");
      }
      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  //5 - refatorando POST

  const httpConfig = (data, method) => {
    try {
      if (data.name === "" && data.price === "") {
        throw new Error("Os campos estão vazios!");
      }

      if (method === "POST") {
        setConfig({
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        setMethod(method);
      }
      //desafio do Delete
      else if (method === "DELETE") {
        setConfig({
          method,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMethod(method);
        setItemId(data);
      }
      setEmptyForm(null);
    } catch (error) {
      setEmptyForm(error.message);
    }
  };

  useEffect(() => {
    const httpRequest = async () => {
      let json;
      if (method === "POST") {
        let fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        json = await res.json();
      } else if (method === "DELETE") {
        const urlDelete = `${url}/${itemId}`;
        const res = await fetch(urlDelete, config);
        json = await res.json();
      }
      setCallFetch(json);
    };
    httpRequest();
  }, [config, method, url, itemId]);

  return { data, httpConfig, loading, error, emptyForm };
};
