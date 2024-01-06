import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { getWithFirstUpperCharText } from '@/utils/get-init-upper-char';
import { IFavoriteJoke, IJoke } from '@/types/joke';
import './joke.scss';

type JokeProps = {
  children?: ReactNode;
  data: IJoke | IFavoriteJoke;
  className?: string;
};

const Joke: FC<JokeProps> = ({ children, data, className = '' }) => {
  const jokeClass = classNames({
    joke: true,
    [className]: className,
  });

  return (
    <div className={jokeClass}>
      <div className="joke__section">
        <p className="joke__setup">SETUP</p>
        <p className="joke__setup-text">{getWithFirstUpperCharText(data.setup)}</p>
      </div>
      <div className="joke__section">
        <p className="joke__punchline">PUNCHLINE</p>
        <p className="joke__punchline-text">{getWithFirstUpperCharText(data.punchline)}</p>
      </div>
      {children}
    </div>
  );
};

export default Joke;
