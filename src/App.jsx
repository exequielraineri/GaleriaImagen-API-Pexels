import { lazy, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css";
import Aos from 'aos';
import 'aos/dist/aos.css';


function App() {

  const API_KEY = "wTtiqvGxGBDiR6KAd4odsCdpy3p8jbOhgTjNzCIM8LKuwuF2gqDOwaSQ";
  const [fotosApi,setFotosApi]=useState([]);
  const [fotoPop,setFotoPop]=useState(null);

  const [pagina,setPagina]=useState(1);

  const fetchPhotosApi=async()=>{
      await fetch('https://api.pexels.com/v1/curated?page=' + pagina + '&per_page=15', {
        headers: {
          'Authorization': API_KEY,
        },
      })
      .then(res=>res.json())
      .then(data=>{
        setFotosApi(data.photos);
      })
      .catch(err=>console.log(err));    
  }



  useEffect(()=>{
      Aos.init();
      fetchPhotosApi();
    },[pagina]);

  return (
    <main className="bloque-galeria">

      <h1>Galeria de imagenes</h1>
      <section className="section-fotos">
        {fotosApi.map((elem) => {
          return (
            <article data-aos="fade-up" key={elem.id} onClick={()=>setFotoPop(elem)}>
              <img
                src={elem.src.original}
                alt={elem.alt}
                loading={lazy}
              />
            </article>
          );
        })}
      </section>

      {
        fotoPop 
        ? <div className="bloque-imgPop">
          <div>
            <button className="btn btn-sm btn-danger" onClick={()=>setFotoPop(null)}>Cerrar</button>
          </div>
          <img src={fotoPop?.src?.original} alt={fotoPop?.alt} />
        </div>
        : ""
      }


      <div className="paginacion">
        <button className="btn btn-dark"  onClick={()=>{
          if(pagina>1){
            setPagina(pagina-1);
          }
        }}>Volver</button>
        <p>Pagina {pagina} de 15</p>
        <button className="btn btn-dark" onClick={()=>{
          if(pagina<15){
            setPagina(pagina+1);
          }
        }}>Siguiente</button>
      </div>

      </main>
  );
}

export default App;
