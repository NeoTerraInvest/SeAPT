import { tokenFilterFrame as style } from '@styles';

const TokenFilterFrame = ({
  name = 'NAME',
  high = '0000',
  low = '0000',
}: {
  name: string;
  high: string;
  low: string;
}) => {
  return (
    <div className={style.debug}>
      <div className={style.filterList}>
        <div className={style.filter}>
          <div id={style.logo}>
            <img
              src={`${import.meta.env.VITE_PROBIT_CDN}/${name}.png`}
              width={32}
              height={32}
              alt={name}
            />{' '}
            <div id={style.name}>{name}</div>
          </div>
        </div>
        <div className={style.price}>
          <div id={style.high}>{high}</div>
          <div id={style.low}>{low}</div>
        </div>
      </div>
    </div>
  );
};

export default TokenFilterFrame;
