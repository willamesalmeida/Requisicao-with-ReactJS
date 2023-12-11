import "./App.css";
import loadingInfinito from "./assets/loading_infinito.svg";
import { useState, useEffect } from "react";

//4 - custom hook
import { useFetch } from "./hook/useFetch";
function App() {
  const [createProductButton, setCreatePorductButton] = useState(false);
  const [listProductButton, setListProductButton] = useState(false);

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [deletar, setDeletar] = useState("");

  const url = "http://localhost:3000/products";

  //4-custom hook
  const {
    data: item,
    httpConfig,
    loading,
    error,
    emptyForm,
  } = useFetch(url);

  //1 - Resgatando dados com fetch
  /*  useEffect(() => {
    setTimeout(() => {
      const dataFetch = async () => {
        const data = await fetch(url);
        const jsonData = await data.json();

        setProducts(jsonData);

      };
      dataFetch();
    }, 200);
  }, []); */

  //Fetch de forma mais volumosa com dados sobre a requisição

  /* useEffect(() => {
    const getData = async () => {
       await fetch(url)
        .then((response) => {
          response.json();
          console.log("response: ", response);
        })
        .catch((error) => {
          console.log("error: " + error);
        })
        .finally(console.log("finalizou"));
    };
    getData();
  }, []); */

  //2 - Adicionando produtos ao banco com requisição POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      //Quando o nome do state se iguala ao do que será passado para o POST não precisa reescrever name:name deixa como ata embaixo
      name,
      price,
    };
    /*
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        product

        {
        //se colocar somente product a inserção do produto no banco ficara com a estrutura completa por causa da desestruturação
        //product : {name: name, price: price}
        name,
        price
      }
      ),
    }); */

    /*  const addProduct = await res.json();
    setProducts((prevProducts) => [...prevProducts, addProduct]); */

    //5 - refatorando  POST
    httpConfig(product, "POST");

    setName("");
    setPrice("");
    setCreatePorductButton(false);
    setListProductButton(false);
  };

  const hundleButtonAdd = () => {
    setCreatePorductButton(true);
  };
  const hundleButtonList = () => {
    setListProductButton(true);
  };

  const handleRemove = (id) => {
    httpConfig(id,"DELETE")
  }
  return (
    <div className="App">
      <div className="buttonsListAndCreate">
        <button onClick={hundleButtonAdd}>Adicionar Podutos</button>
        <button onClick={hundleButtonList}>Listar produtos Cadastrados</button>
      </div>

      {
        createProductButton && <div className="add-product">
          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome: </span>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label>
              <span>Price </span>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                min="1"
              />
            </label>
            {/* 7 - State de Loading no post */}
            {emptyForm}
            {loading && (
              <input
                type="submit"
                className="input_botton"
                disabled
                value="Aguarde"
              />
            )}
            {!loading && (
              <input
                type="submit"
                className="input_botton"
                value="Adicionar Produto"
              />
            )}
          </form>
        </div>
      }

      {listProductButton && (
        <div className="lista-produtos">
          <h1>Lista de Produtos</h1>
          {/* 6 - loading */}
          {loading && <img src={loadingInfinito} alt="Carregando" />}
          {error && <p>{error}</p>}
          {!error && (
            <ul>
              {item &&
                item.map((product) => (
                  <li key={product.id}>
                    Produto: {product.name} <br /> R$: {product.price}
                    <button onClick={() => handleRemove(product.id)}>Deletar</button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
