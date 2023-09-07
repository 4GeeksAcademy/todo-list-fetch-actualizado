import React, { useEffect, useState } from "react";
// import { todoList } from "./lista.jsx";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Note } from "./lista";
//create your first component
const Home = () => {
  return (
    <div className="fondo">
      <div className="fondo-de-cartas">
        <h1 className="titulo">todos</h1>
        <div className="notas">
          <Note/>
        </div>
      </div>
    </div>
  );
};

export default Home;
