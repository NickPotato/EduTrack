import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './Home.module.css';

interface Curso {
  id: number;
  titulo: string;
  texto: string;
  anexos?: { id: number }[];
}

export function Home() {
  const [cursos, setCursos] = useState<Curso[]>([]);

	useEffect(() => {
	  async function carregarCursos() {
		try {
		  const resp = await api.get('/materias');
		  const lista = resp.data;

		  // adiciona imagemSrc para cada curso (usa o último anexo, se houver)
		  const listaComImagens = await Promise.all(
			lista.map(async (curso: any) => {
			  let imagemSrc = null;

			  const anexos = curso.anexos || [];
			  const ultimoAnexo = anexos.length ? anexos[anexos.length - 1] : null;

			  if (ultimoAnexo) {
				const anexoId = ultimoAnexo.id;
				try {
				  const imgResp = await api.get(`/anexos/${anexoId}`);
				  imagemSrc = imgResp.data.base64 || null;
				} catch (e) {
				  console.warn('Falha ao carregar imagem do anexo', anexoId);
				}
			  }

			  return { ...curso, imagemSrc };
			})
		  );

		  setCursos(listaComImagens);
		} catch (err) {
		  console.error(err);
		}
	  }

	  carregarCursos();
	}, []);

  return (
    <div>
      <Header />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Organize com o EduTrack</h1>
          <p>
            Organização fácil dos seus cursos pra facilitar o aprendizado
          </p>

          <a href="#cursos" className={styles.heroButton}>
            Ver cursos
          </a>
        </div>
      </section>

      {/* LISTA DE CURSOS */}
      <section id="cursos" className={styles.cursosSection}>
        <h2 className={styles.sectionTitle}>Seus cursos</h2>

        <div className={styles.grid}>
          {cursos.map(curso => (
            <div key={curso.id} className={styles.card}>
							  
				<div className={styles.cardImage}>
				  {curso.anexos && curso.anexos.length > 0 ? (
					<img 
					  src={curso.imagemSrc || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"}
					  alt={curso.titulo}
					/>
				  ) : (
					<div className={styles.placeholder}>Sem imagem</div>
				  )}
				</div>


              <h3 className={styles.cardTitle}>{curso.titulo}</h3>

              <p className={styles.cardText}>
                {curso.texto.length > 120
                  ? curso.texto.substring(0, 120) + '…'
                  : curso.texto}
              </p>

              <Link to={`/curso/${curso.id}`} className={styles.cardButton}>
                Ver curso
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
