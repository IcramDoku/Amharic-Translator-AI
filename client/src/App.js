import React from 'react';
import Translators from './components/Translator';
import backgroundImage from './components/Artificial_Intelligence.gif';

const style = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: `linear-gradient(rgba(245, 247, 246, 0.8), rgba(203, 222, 209, 0.8)), url(${backgroundImage})`,
    backgroundSize: 'cover',
  },
}
function App() {
  return (
    <header style={style.app}>
      <Translators />
    </header>
  );
}

export default App;
