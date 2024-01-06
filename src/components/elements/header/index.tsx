import { FC, memo } from 'react';
import Button from '@/components/elements/ui/button';
import classNames from 'classnames';
import './header.scss';

type HeaderProps = {
  className?: string;
  onOpenFavorites: () => void;
};

const Header: FC<HeaderProps> = ({ className = '', onOpenFavorites }) => {
  const headerClass = classNames({
    header: true,
    [className]: className,
  });

  return (
    <header className={headerClass}>
      <div className="header__body container">
        <Button design="ghost" onClick={onOpenFavorites}>
          Избранное
        </Button>
      </div>
    </header>
  );
};

export default memo(Header);
