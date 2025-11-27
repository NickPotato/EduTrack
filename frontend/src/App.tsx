import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Sobre } from './pages/Sobre/Sobre';
import { Curso } from './pages/Curso/Curso';
import { Gestao } from './pages/Gestao/Gestao';
import { NovoCurso } from './pages/NovoCurso/NovoCurso';
import { EditarCurso } from './pages/EditarCurso/EditarCurso';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/curso/:id" element={<Curso />} />
      <Route path="/gestao" element={<Gestao />} />
      <Route path="/novo-curso" element={<NovoCurso />} />
      <Route path="/editar-curso/:id" element={<EditarCurso />} />
    </Routes>
  );
}

export default App;