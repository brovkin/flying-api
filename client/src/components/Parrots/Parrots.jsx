import React, { useEffect, useState } from "react";
import axios from "axios";
import { MAIN_API } from "../../constants";

const Parrots = () => {
  const [data, setData] = useState({});
  const [formSended, setFormSended] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [parrots, setParrots] = useState([]);
  const getData = () => {
    axios
      .get(`${MAIN_API}/parrots`)
      .then((result) => {
        const data = result.data;
        setParrots(data);
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [formSended]);

  const changeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const deleteParrot = (id) => {
    axios.delete(`${MAIN_API}/parrots/${id}`).then((result) => {
      console.log("result", result);
      const response = result.data;
      if (response.status === "ok") {
        const newParrots = parrots.filter((item) => item._id !== id);
        setParrots(newParrots);
      }
    });
  };

  const uploadImage = (e) => {
    const data = e.target.files[0];
    setData((prevValue) => ({ ...prevValue, image: data }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("image", data.image);
    formdata.append("name", data.name);
    formdata.append("description", data.description);

    axios.post(`${MAIN_API}/parrots/add`, formdata).then((result) => {
      console.log("result", result);
      const response = result.data;

      if (response.status === "ok") {
        setFormSended(true);
      }
    });
  };

  const renderParrots = parrots.map((parrot) => {
    return (
      <li key={parrot.id}>
        {!!parrot.name && <div>{parrot.name}</div>}
        {!!parrot.description && <div>{parrot.description}</div>}
        {!!parrot.image && (
          <div style={{ width: "100px", height: "100px" }}>
            <img
              style={{ width: "auto", height: "inherit" }}
              src={parrot.image}
              alt={parrot.name}
            />
          </div>
        )}
        {!!editMode && (
          <button onClick={() => deleteParrot(parrot._id)}>X</button>
        )}
      </li>
    );
  });

  return (
    <div>
      <h1>Parrots</h1>
      <button onClick={() => setEditMode((prevValue) => !prevValue)}>
        {editMode ? "Обычный режим" : "Режим редатирования"}
      </button>
      {!formSended && (
        <div>
          <p>
            <input
              type="text"
              name="name"
              placeholder="Введите имя попуга"
              onChange={changeHandler}
            />
          </p>
          <p>
            <textarea
              name="description"
              placeholder="Введите описание попуга"
              onChange={changeHandler}
            />
          </p>
          <p>
            <input type="file" onChange={uploadImage} />
          </p>

          <button onClick={submitForm}>Отправить</button>
        </div>
      )}
      {!!formSended && (
        <div>
          <button onClick={() => setFormSended(false)}>
            Создать еще одного попуга?
          </button>
        </div>
      )}

      <div>
        <ul>{renderParrots}</ul>
      </div>
    </div>
  );
};

export default Parrots;
