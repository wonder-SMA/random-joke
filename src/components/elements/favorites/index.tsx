import { forwardRef, memo, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { removeFromFavorites, likeJoke, dislikeJoke } from '@/store/jokes-slice';
import Joke from '@/components/elements/joke';
import JokeList from '@/components/elements/joke-list';
import DislikeIcon from '../ui/icon/dislike-icon';
import LikeIcon from '../ui/icon/like-icon';
import IconButton from '../ui/icon-button';
import HeartIcon from '../ui/icon/heart-icon';
import DeleteIcon from '../ui/icon/delete-icon';
import { IFavoriteJoke, IJoke } from '@/types/joke';
import './favorites.scss';

type FavoritesProps = {
  onCloseFavorites: () => void;
  className?: string;
};

const Favorites = forwardRef<HTMLHtmlElement, FavoritesProps>(
  ({ onCloseFavorites, className = '' }, ref) => {
    const { favoriteJokes } = useAppSelector(state => state.jokes);
    const dispatch = useAppDispatch();

    const favoritesClass = classNames({
      favorites: true,
      [className]: className,
    });

    const data = useMemo(() => Object.values(favoriteJokes), [favoriteJokes]);

    // Возвращает функцию с замыканием на id шутки
    const onLikeJoke = useCallback((id: number) => () => dispatch(likeJoke(id)), [dispatch]);

    // Возвращает функцию с замыканием на id шутки
    const onDislikeJoke = useCallback((id: number) => () => dispatch(dislikeJoke(id)), [dispatch]);

    // Возвращает функцию с замыканием на id шутки
    const onRemoveFromFavorites = useCallback(
      (id: number) => {
        return () => {
          dispatch(removeFromFavorites(id));
          if (Object.keys(favoriteJokes).length === 1) {
            onCloseFavorites();
          }
        };
      },
      [dispatch, favoriteJokes, onCloseFavorites]
    );

    const renderJoke = useCallback(
      (data: IJoke | IFavoriteJoke) => (
        <Joke data={data}>
          <IconButton
            className={`joke__like-button ${
              (data as IFavoriteJoke).isLiked ? 'joke__like-button_filled' : ''
            }`}
            onClick={onLikeJoke(data.id)}>
            <LikeIcon />
          </IconButton>
          <IconButton
            className={`joke__dislike-button ${
              (data as IFavoriteJoke).isDisliked ? 'joke__dislike-button_filled' : ''
            }`}
            onClick={onDislikeJoke(data.id)}>
            <DislikeIcon />
          </IconButton>
          <IconButton className="joke__delete-button" onClick={onRemoveFromFavorites(data.id)}>
            <DeleteIcon />
          </IconButton>
        </Joke>
      ),
      [onLikeJoke, onDislikeJoke, onRemoveFromFavorites]
    );

    return (
      <aside className={favoritesClass} ref={ref}>
        <IconButton className="favorites__heart-button" onClick={onCloseFavorites}>
          <HeartIcon strokeWidth={2} />
        </IconButton>
        <JokeList data={data} renderJoke={renderJoke} />
      </aside>
    );
  }
);

Favorites.displayName = 'Favorites';

export default memo(Favorites);
