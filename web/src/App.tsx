import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios, { AxiosResponse } from 'axios';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';

import './styles/main.css';

import { Game } from './interfaces/game';

import logoImg from './assets/logo-nlw-esports.svg';

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    axios('http://localhost:3333/games')
      .then((response: AxiosResponse<Game[], any>) => setGames(response.data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu
        {' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span>
        {' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}

      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
