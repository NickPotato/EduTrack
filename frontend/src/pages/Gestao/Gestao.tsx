import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './Gestao.module.css';
import Swal from 'sweetalert2';

interface Curso {
  id: number;
  titulo: string;
  inseridoEm: string;
  anexos?: any[];
  imagemSrc?: string;
}

export function Gestao() {
  const [cursos, setCursos] = useState<Curso[]>([]);

  async function carregar() {
    try {
      const resp = await api.get('/materias');
      const lista = resp.data;

      const listaComImagens = await Promise.all(
        lista.map(async (curso: any) => {
          const anexos = curso.anexos || [];
          let imagemSrc = null;

          const ultimoAnexo = anexos.length > 0 ? anexos[anexos.length - 1] : null;

          if (ultimoAnexo) {
            try {
              const imgResp = await api.get(`/anexos/${ultimoAnexo.id}`);
              imagemSrc = imgResp.data.base64 || null;
            } catch {
              console.warn("Falha ao carregar imagem:", ultimoAnexo.id);
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

  async function handleDelete(id: number) {
    const confirm = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja excluir este curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/materias/${id}`);
      await carregar();
      Swal.fire('Excluído!', 'O curso foi removido.', 'success');
    } catch (err) {
      Swal.fire('Erro', 'Não foi possível excluir.', 'error');
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Gestão dos cursos</h1>

          <Link to="/novo-curso" className={styles.addButton}>
            + Novo Curso
          </Link>
        </div>

        <div className={styles.grid}>
          {cursos.map(curso => (
            <div key={curso.id} className={styles.card}>
              
              <div className={styles.cardImage}>
                {curso.imagemSrc ? (
                  <img src={curso.imagemSrc} alt={curso.titulo} />
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80"
                    alt="Sem imagem"
                  />
                )}
              </div>

              <h3 className={styles.cardTitle}>{curso.titulo}</h3>

              <span className={styles.cardDate}>
                Publicado em: {new Date(curso.inseridoEm).toLocaleDateString()}
              </span>

              <div className={styles.actions}>
                <Link to={`/curso/${curso.id}`} className={styles.btnView}>Ver</Link>
                <Link to={`/editar-curso/${curso.id}`} className={styles.btnEdit}>Editar</Link>

                <button
                  onClick={() => handleDelete(curso.id)}
                  className={styles.btnDelete}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
