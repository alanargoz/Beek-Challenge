import React, { useEffect, useState } from "react";
import Book from "./components/Book";
import styled from "styled-components";
import { Modal } from "./components/Modal";

function App() {
  const API_GETALL =
    "https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=audiocontent-v11&access_token=CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc";
  const API_SEARCH =
    "https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?select=fields,sys.id&locale=es-MX&content_type=audiocontent-v11&access_token=CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc&query=";

  const [books, setBooks] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.items);
      });
  };

  useEffect(() => {
    getMovies(API_GETALL);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(API_SEARCH + searchTerm);
      setsearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setsearchTerm(e.target.value);
  };

  const Button = styled.button`
    min-width: 50px;
    padding: 4px 8px;
    border-radius: 4px;
    border: none;
    background: #141414;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    margin: 10px;
  `;

  return (
    <>
      <header>
        <img src="https://www.beek.io/los-mejores-libros-para-leer-recomendados-mas-vendidos.svg" alt="icon"/>
        <h3>Audiobook Manager</h3>
        <Button onClick={openModal}>Añadir libro</Button>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Buscar un audiolibro..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="book-container">
        {!showModal ? (
          books.map((book) => <Book key={book.sys.id} {...book} />)
        ) : (
          <Modal showModal={showModal} setShowModal={setShowModal} />
        )}
      </div>
    </>
  );
}

export default App;
