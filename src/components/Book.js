import React, { useState } from "react";
import styled from "styled-components";
import useEditForm from "../hooks/useEditForm";
import validate from "../helpers/validateForm";

const Button = styled.button`
  min-width: 50px;
  padding: 4px 8px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  justify-content: center;
  margin: 10px;
`;

function Book({ fields, sys }) {
  const API_DELETE =
    "https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries/";
  const deleteBook = () => {
    fetch(API_DELETE + sys.id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data)); // Leaving this for reviewing later
    setTimeout(() => window.location.reload(true), 1500);
  };

  const { handleChange, values, handleSubmit, errors } = useEditForm(validate);
  values.id = sys.id;
  values.version = sys.version;

  const [updateBook, setUpdateEditBook] = useState(false);

  const editBook = () => {
    setUpdateEditBook((prev) => !prev);
  };

  return (
    <>
      {!updateBook ? (
        <div className="book">
          <img src={fields.cover["es-MX"]} alt={fields.title["es-MX"]} />
          <div className="book-info">
            <h3>{fields.title["es-MX"]}</h3>
          </div>
          <div className="book-over">
            <h2>Autor(es): {fields.authors["es-MX"]}</h2>
            <h2>Duración: {fields.duration["es-MX"]}</h2>
            <h2>Narrador(es): {fields.narrators["es-MX"]}</h2>
            <h2>Costo: ${fields.cost_per_play["es-MX"]} MXN</h2>
            <Button onClick={editBook}>Editar</Button>
            <Button onClick={deleteBook}>Eliminar</Button>
          </div>
        </div>
      ) : (
        <div className="book">
          <form onSubmit={handleSubmit}>
            <h1>Edita el libro</h1>
            <div className="edit-form-inputs">
              <label htmlFor="title" className="form-label">
                Titulo
              </label>
              <input
                id="title"
                className="edit-form-input"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>
            <div className="edit-form-inputs">
              <label className="form-label">Costo</label>
              <input
                id="cost_per_play"
                className="edit-form-input"
                type="text"
                name="cost_per_play"
                value={values.cost_per_play}
                onChange={handleChange}
              />
            </div>
            <div className="edit-form-inputs">
              <label className="form-label">Autor(es)</label>
              <input
                id="authors"
                className="edit-form-input"
                type="text"
                name="authors"
                value={values.authors}
                onChange={handleChange}
              />
            </div>
            <div className="edit-form-inputs">
              <label className="form-label">Narrador(es)</label>
              <input
                id="narrators"
                className="edit-form-input"
                type="text"
                name="narrators"
                value={values.narrators}
                onChange={handleChange}
              />
            </div>
            <div className="edit-form-inputs">
              <label className="form-label">Duración</label>
              <input
                id="duration"
                className="edit-form-input"
                type="text"
                name="duration"
                value={values.duration}
                onChange={handleChange}
              />
            </div>
            <div className="edit-form-inputs">
              <label className="form-label">Cover</label>
              <input
                id="cover"
                className="edit-form-input"
                type="text"
                name="cover"
                value={values.cover}
                onChange={handleChange}
              />
            </div>
            <div className="edit-form-inputs">
              <label className="form-label">Beek original</label>
              <input
                id="is_original"
                className="edit-form-input"
                type="checkbox"
                name="is_original"
              />
            </div>
            <Button>Enviar</Button>
          </form>
        </div>
      )}
    </>
  );
}

export default Book;
