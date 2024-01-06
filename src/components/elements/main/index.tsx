import { FC, memo, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { addToFavorites, removeFromFavorites } from '@/store/jokes-slice';
import IconButton from '@/components/elements/ui/icon-button';
import HeartIcon from '@/components/elements/ui/icon/heart-icon';
import Joke from '@/components/elements/joke';
import JokeList from '@/components/elements/joke-list';
import Button from '@/components/elements/ui/button';
import UploadIndicator from '@/components/elements/ui/upload-indicator';
import { IJoke } from '@/types/joke';
import './main.scss';

type MainProps = {
  className?: string;
  onGetMore: () => void;
};

const Main: FC<MainProps> = ({ className = '', onGetMore }) => {
  const { jokes, favoriteJokes, loading } = useAppSelector(state => state.jokes);
  const dispatch = useAppDispatch();

  const mainClass = classNames({
    main: true,
    container: true,
    [className]: className,
  });

  const data = useMemo(() => Object.values(jokes), [jokes]);

  // При обработке добавления в избранное если шутка уже в избранном, то удаляем ее из избранного.
  // Возвращает функцию с замыканием на id шутки
  const onAddToFavorites = useCallback(
    (id: number) => {
      return () => {
        if (id in favoriteJokes) {
          dispatch(removeFromFavorites(id));
        } else {
          dispatch(addToFavorites(id));
        }
      };
    },
    [dispatch, favoriteJokes]
  );

  const renderJoke = useCallback(
    (data: IJoke) => (
      <Joke data={data}>
        <IconButton
          className={`joke__heart-button ${
            data.id in favoriteJokes ? 'joke__heart-button_filled' : ''
          }`}
          onClick={onAddToFavorites(data.id)}>
          <HeartIcon strokeWidth={0} />
        </IconButton>
      </Joke>
    ),
    [favoriteJokes, onAddToFavorites]
  );

  return (
    <main className={mainClass}>
      <h1 className="main__title">The Jokes</h1>
      {loading ? (
        <UploadIndicator fill="#0d1730" />
      ) : (
        <JokeList data={data} renderJoke={renderJoke} />
      )}
      {!loading && <Button onClick={onGetMore}>ЕЩЕ</Button>}
    </main>
  );
};

export default memo(Main);
