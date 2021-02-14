export default function validateForm(values) {
  let errors = {};
  if (!values.title.trim()) {
    errors.title = "El título es requerido";
  }

  if (!values.cost_per_play.trim()) {
    errors.cost_per_play = "El costo es requerido";
  }

  if (!values.authors.trim()) {
    errors.authors = "Es necesario un autor";
  }

  if (!values.narrators.trim()) {
    errors.narrators = "Es necesario un narrador";
  }

  if (!values.duration.trim()) {
    errors.duration = "Es necesario la duración";
  }

  if (!values.cover.trim()) {
    errors.cover = "Es necesario una imagen";
  }

  return errors;
}
