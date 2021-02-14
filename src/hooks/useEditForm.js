import { useState } from "react";

const useForm = (validate) => {
  const API_PUT =
    "https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries/";

  const [values, setValues] = useState({
    title: "",
    cost_per_play: "",
    authors: "",
    narrators: "",
    duration: "",
    cover: "",
    is_original: false,
    id: "",
    version: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log(values.id);
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    fetch(API_PUT + values.id, {
      method: "PUT",
      body: JSON.stringify({
        fields: {
          title: {
            "es-MX": values.title,
          },
          is_original: {
            "es-MX": false,
          },
          street_date: {
            "es-MX": `${new Date().toISOString()}`,
          },
          cost_per_play: {
            "es-MX": +values.duration,
          },
          authors: {
            "es-MX": [values.authors],
          },
          narrators: {
            "es-MX": [values.narrators],
          },
          duration: {
            "es-MX": +values.duration,
          },
          cover: {
            "es-MX": values.cover,
          },
        },
      }),
      headers: {
        "X-Contentful-Content-Type": "audiocontent-v11",
        "X-Contentful-Version": values.version,
        Authorization:
          "Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data)); // Leaving this for reviewing later
    setTimeout(() => window.location.reload(true), 1500);
  };

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
