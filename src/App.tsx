import { FormEventHandler, ReactEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./App.css";

interface PostDTO {
  id?: string;
  name: string;
  scientificName?: string;
  sighting: string;
  sightingDate: Date;
  sightingHour?: number;
  observation?: string;
  img: string;
}

const getPost = async () => {
  const response = await fetch(
    "http://localhost:3000/post/63517ca8ef19c71cf38c3318"
  );

  const json = await response.json();

  const postEntity: PostDTO = {
    id: json["_id"],
    name: json["name"],
    scientificName: json["scientificName"],
    sighting: json["sighting"],
    sightingDate: json["sightingDate"],
    sightingHour: json["sightingHour"],
    observation: json["observation"],
    img: json["img"],
  };

  return postEntity;
};

const updatePost = async (post: PostDTO) => {
  // const postToJson = JSON.stringify(post);

  const response = await axios.put("http://localhost:3000/posts", post);

  //   const response = await fetch("http://localhost:3000/posts", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "PUT",
  //     body: postToJson,
  //   });

  if (response.data == 1) {
    alert("Usuário atualizado com sucesso!");
  }

  return response.data;
};

function App() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostDTO>();

  getPost().then((post) => {
    setValue("id", post.id);
    setValue("name", post.name);
    setValue("scientificName", post.scientificName);
    setValue("sighting", post.name);
    setValue("sightingDate", post.sightingDate);
    setValue("sightingHour", post.sightingHour);
    setValue("observation", post.observation);
    setValue("img", post.img);
  });

  const onSubmit = handleSubmit((data) => updatePost(data));

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input {...register("name")} />
        </label>
        <label>
          ScientificName:
          <input {...register("scientificName")} />
        </label>
        <label>
          Sighting:
          <input {...register("sighting")} />
        </label>
        <label>
          SightingDate:
          <input {...register("sightingDate")} />
        </label>
        <label>
          SightingHour:
          <input {...register("sightingHour")} />
        </label>
        <label>
          Observation:
          <input {...register("observation")} />
        </label>
        <label>
          Image:
          <input {...register("img")} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
