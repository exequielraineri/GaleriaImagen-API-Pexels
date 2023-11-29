import { createClient } from "pexels";
import { lazy, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css";
function App() {
  const API_KEY = "wTtiqvGxGBDiR6KAd4odsCdpy3p8jbOhgTjNzCIM8LKuwuF2gqDOwaSQ";
  const client = createClient(API_KEY); 
  const [fotosApi,setFotosApi]=useState([]);
  const [fotoPop,setFotoPop]=useState(null);

  const [pagina,setPagina]=useState(1);

  const fetchPhotos=async()=>{ 
    await client.photos.curated({
      page:pagina,
      per_page:15,
    })
    .then((data) => {
      setFotosApi(data.photos);
    })
    .catch(err=>console.log(err));

  }


  useEffect(()=>{
      fetchPhotos();
  },[pagina]);

  return (
    <main className="bloque-galeria">

      <h1>Galeria de imagenes</h1>
      <section className="section-fotos">
        {fotosApi.map((elem) => {
          return (
            <article key={elem.id} onClick={()=>setFotoPop(elem)}>
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
