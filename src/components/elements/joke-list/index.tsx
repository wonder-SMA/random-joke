import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';
import { IFavoriteJoke, IJoke } from '@/types/joke';
import './joke-list.scss';

type JokeListProps = {
  data: IJoke[];
  renderJoke: (data: IJoke | IFavoriteJoke) => ReactNode;
  className?: string;
};

const JokeList: FC<JokeListProps> = ({ data, renderJoke, className = '' }) => {
  const jokeListClass = classNames({
    'joke-list': true,
    [className]: className,
  });

  return (
    <ul className={jokeListClass}>
      {data.map(joke => (
        <li className="joke-list__item" key={joke.id}>
          {renderJoke(joke)}
        </li>
      ))}
    </ul>
  );
};

export default memo(JokeList);
