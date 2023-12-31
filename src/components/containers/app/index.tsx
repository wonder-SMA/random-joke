import { FC, useCallback, useEffect, useRef } from 'react';
import { getJokes } from '@/store/jokes-slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import Header from '@/components/elements/header';
import Main from '@/components/elements/main';
import Favorites from '@/components/elements/favorites';
import './app.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const favoritesRef = useRef<HTMLHtmlElement | null>(null);

  useEffect(() => {
    dispatch(getJokes());
  }, [dispatch]);

  const getNewJokes = useCallback(() => dispatch(getJokes()), [dispatch]);

  const onOpenFavorites = useCallback(() => {
    // Убираем скролл у body и показываем у всплывающего aside
    document.body.style.overflowY = 'hidden';
    favoritesRef.current!.style.overflowY = 'auto';
    favoritesRef.current!.classList.add('favorites_open');
    console.log('onOpenFavorites');
  }, []);

  const onCloseFavorites = useCallback(() => {
    /* Убираем скролл у всплывающего aside и показываем у body, но с задержкой, чтобы не было сдвига при aside без скролла*/
    const timerId = setTimeout(() => {
      favoritesRef.current!.style.overflowY = 'hidden';
      document.body.style.overflowY = 'auto';
      clearTimeout(timerId);
    }, 300);
    favoritesRef.current!.classList.remove('favorites_open');
  }, []);

  return (
    <div className="app">
      <Header onOpenFavorites={onOpenFavorites} />
      <Main onGetMore={getNewJokes} />
      <Favorites onCloseFavorites={onCloseFavorites} ref={favoritesRef} />
    </div>
  );
};

export default App;
