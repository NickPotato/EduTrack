import { useState } from 'react';
import { api } from '../../services/api';
import { Header } from '../../components/Header/Header';
import { Input } from '../../components/UI/Input';
import { Textarea } from '../../components/UI/Textarea';
import { Button } from '../../components/UI/Button';
import styles from './NovoCurso.module.css';
import Swal from 'sweetalert2';

export function NovoCurso() {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [linkAuxiliar, setLinkAuxiliar] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function converterBase64(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(String(reader.result));
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/materias', {
        titulo,
        texto,
        linkAuxiliar
      });

      const materiaId = response.data.id;

      if (arquivo) {
        const base64 = await converterBase64(arquivo);
        await api.post('/anexos', {
          materiaId,
          fileName: arquivo.name,
          base64
        });
      }

      Swal.fire('Sucesso!', 'Curso criado com sucesso!', 'success');
      // limpar formulário opcional:
      setTitulo(''); setTexto(''); setLinkAuxiliar(''); setArquivo(null);
    } catch (error) {
      console.error(error);
      Swal.fire('Erro!', 'Não foi possível criar o curso.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className={styles.container}>
        <h1 className={styles.title}>Novo Curso</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Título do curso"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <Textarea
            label="Conteúdo"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />

          <Input
            label="Link auxiliar (opcional)"
            value={linkAuxiliar}
            onChange={(e) => setLinkAuxiliar(e.target.value)}
          />

          <div className={styles.uploadBox}>
            <label className={styles.uploadLabel}>Anexo (imagem)</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => setArquivo(e.target.files?.[0] || null)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
			<Button type="submit">
			  {loading ? 'Salvando...' : 'Publicar Curso'}
			</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
