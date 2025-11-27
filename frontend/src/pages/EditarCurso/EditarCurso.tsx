import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Input } from '../../components/UI/Input';
import { Textarea } from '../../components/UI/Textarea';
import { Button } from '../../components/UI/Button';
import styles from './EditarCurso.module.css';
import Swal from 'sweetalert2';

export function EditarCurso() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [linkAuxiliar, setLinkAuxiliar] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);

  useEffect(() => {
    api.get(`/materias/${id}`)
      .then(resp => {
        setTitulo(resp.data.titulo);
        setTexto(resp.data.texto);
        setLinkAuxiliar(resp.data.linkAuxiliar || '');
      })
      .catch(() => {
        Swal.fire('Erro!', 'Erro ao carregar os dados.', 'error');
        navigate('/gestao');
      });
  }, [id, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.patch(`/materias/${id}`, {
        titulo,
        texto,
        linkAuxiliar
      });

      if (arquivo) {
        const base64 = await converterBase64(arquivo);

        await api.post('/anexos', {
          materiaId: Number(id),
          fileName: arquivo.name,
          base64
        });
      }

      Swal.fire('Sucesso!', 'Curso atualizado!', 'success');
      navigate('/gestao');
    } catch {
      Swal.fire('Erro!', 'Não foi possível atualizar.', 'error');
    }
  }

  function converterBase64(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(String(reader.result));
      reader.readAsDataURL(file);
    });
  }

  return (
    <div>
      <Header />
      
      <div className={styles.container}>
        <h1 className={styles.title}>Editar Curso</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input 
            label="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <Textarea
            label="Conteúdo"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />

          <Input 
            label="Link auxiliar"
            value={linkAuxiliar}
            onChange={(e) => setLinkAuxiliar(e.target.value)}
          />

          <div className={styles.uploadBox}>
            <label>Alterar imagem (opcional)</label>
            <input type="file" onChange={(e) => setArquivo(e.target.files?.[0] || null)} />
          </div>

          <Button type="submit">Salvar alterações</Button>
        </form>
      </div>
    </div>
  );
}
