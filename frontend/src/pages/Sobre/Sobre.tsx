import { Header } from '../../components/Header/Header';
import styles from './Sobre.module.css';

export function Sobre() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className={styles.container}>
        <div className={styles.card}>
          
          <img 
            src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80" 
            alt="Educação e aprendizado" 
            className={styles.image}
          />

          <div className={styles.content}>
            <span className={styles.subtitle}>ODS 4 • Educação de Qualidade</span>

            <h1 className={styles.title}>Plataforma EduTrack</h1>
            
            <p className={styles.text}>
              O <strong>EduTrack</strong> é um portal criado com o objetivo de organizar o acesso 
              de materiais e apoiar estudantes na sua jornada de aprendizado. 
              O projeto segue os princípios do <strong>ODS 4</strong>, buscando promover 
              uma educação inclusiva, acessível e de qualidade para todos.
            </p>

            <p className={styles.text}>
              Aqui, seus cursos, conteúdos e materiais são organizados de forma clara, 
              permitindo que qualquer pessoa explore temas diversos e aprimore suas habilidades. 
              A plataforma foi construída para ser simples, intuitiva e acessível.
            </p>

            <p className={styles.text}>
              É de alta importância acompanhar a educação. Por isso, o EduTrack foi pensado 
              para ser uma ferramenta prática, moderna e útil em ambientes acadêmicos.
            </p>

            <div className={styles.techStack}>
              <h3 className={styles.techTitle}>Tecnologias Utilizadas no Projeto:</h3>
              <div className={styles.badges}>
                <span className={styles.badge}>React</span>
                <span className={styles.badge}>NestJS</span>
                <span className={styles.badge}>Prisma ORM</span>
                <span className={styles.badge}>API REST</span>
                <span className={styles.badge}>SQLite</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
