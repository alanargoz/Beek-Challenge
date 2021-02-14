import React from "react";
import useForm from "../hooks/useForm";
import validate from "../helpers/validateForm";

function AddForm({ submitForm }) {
  const { handleChange, values, handleSubmit, errors } = useForm(
    validate,
    submitForm
  );

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Añade un libro</h1>
        <div className="form-inputs">
          <label htmlFor="title" className="form-label">
            Titulo
          </label>
          <input
            id="title"
            className="form-input"
            type="text"
            name="title"
            placeholder={errors.title ? errors.title : "Ingresa el titulo"}
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Costo</label>
          <input
            id="cost_per_play"
            className="form-input"
            type="text"
            name="cost_per_play"
            placeholder={
              errors.cost_per_play ? errors.cost_per_play : "Ingresa el titulo"
            }
            value={values.cost_per_play}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Autor(es)</label>
          <input
            id="authors"
            className="form-input"
            type="text"
            name="authors"
            placeholder={
              errors.authors ? errors.authors : "Ingresa el nombre del autor"
            }
            value={values.authors}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Narrador(es)</label>
          <input
            id="narrators"
            className="form-input"
            type="text"
            name="narrators"
            placeholder={
              errors.narrators
                ? errors.narrators
                : "Ingresa el nombre del autor"
            }
            value={values.narrators}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Duración</label>
          <input
            id="duration"
            className="form-input"
            type="text"
            name="duration"
            placeholder={
              errors.duration ? errors.duration : "Ingresa el nombre del autor"
            }
            value={values.duration}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Cover</label>
          <input
            id="cover"
            className="form-input"
            type="text"
            name="cover"
            placeholder={
              errors.cover ? errors.cover : "Ingresa el nombre del autor"
            }
            value={values.cover}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Beek original</label>
          <input
            id="is_original"
            className="form-input"
            type="checkbox"
            name="is_original"
          />
        </div>
        <button>Añadir</button>
      </form>
    </div>
  );
}

export default AddForm;
