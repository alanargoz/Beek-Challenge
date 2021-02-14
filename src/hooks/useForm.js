import { useState } from "react";

const useForm = (validate) => {
  const API_POST =
    "https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries";

  const [values, setValues] = useState({
    title: "",
    cost_per_play: "",
    authors: "",
    narrators: "",
    duration: "",
    cover: "",
    is_original: false,
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
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    fetch(API_POST, {
      method: "POST",
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
            "es-MX": +values.cost_per_play,
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
