import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './Gestao.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface Curso {
    id: number;
    titulo: string;
    inseridoEm: string;
}

export function Gestao() {
    const [cursos, setCursos] = useState<Curso[]>([]);

	useEffect(() => {
	  async function carregar() {
		try {
		  const resp = await api.get('/materias');
		  const lista = resp.data;

		  const listaComImagens = await Promise.all(
			lista.map(async (curso: any) => {
			  let imagemSrc = null;

			  const anexos = curso.anexos || [];
			  const ultimoAnexo = anexos.length ? anexos[anexos.length - 1] : null;

			  if (ultimoAnexo) {
				try {
				  const imgResp = await api.get(`/anexos/${ultimoAnexo.id}`);
				  imagemSrc = imgResp.data.base64 || null;
				} catch (err) {
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

	  carregar();
	}, []);

    async function handleDelete(id: number) {
        const result = await MySwal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#4b5563',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/materias/${id}`);   // << CORRIGIDO

                await MySwal.fire({
                    title: 'Deletado!',
                    text: 'O curso foi excluído com sucesso.',
                    icon: 'success',
                    confirmButtonColor: '#fd6925'
                });

                carregarCursos();
            } catch (error) {
                MySwal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao tentar excluir.',
                    icon: 'error',
                    confirmButtonColor: '#d33'
                });
            }
        }
    }

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
				{cursos.map(curso => {
					const anexos = (curso as any).anexos || [];
					const ultimo = anexos.length ? anexos[anexos.length - 1] : null;

					return (
						<div key={curso.id} className={styles.card}>

							{/* IMAGEM DO CURSO */}
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
								<Link to={`/curso/${curso.id}`} className={styles.btnView}>
									Ver
								</Link>

								<Link to={`/editar-curso/${curso.id}`} className={styles.btnEdit}>
									Editar
								</Link>

								<button onClick={() => handleDelete(curso.id)} className={styles.btnDelete}>
									Excluir
								</button>
							</div>
						</div>
					);
				})}
			</div>

            </div>
        </div>
    );
}
