import { useEffect, useState } from 'react';
import { translate as styles } from '@styles';
import { translate } from '@data';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setTranslate } from '@/store/slice/translate.slice';
import { useTrackingView } from '@model';

const Translate = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLanguage, setLanguage] = useState<string>(translate.data[0].key);
  const [isFlag, setFlag] = useState<string>(translate.data[0].image);
  const isMobile = useTrackingView({ size: 757 });
  const dispatch = useDispatch<AppDispatch>();

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    setLanguage(translate.data[0].key);
    setFlag(translate.data[0].image);
  }, [setLanguage, setFlag]);

  return (
    <div className={styles.debug}>
      <div
        className={isOpen ? styles.active : ''}
        id={styles.translate}
        onClick={handleDropDown}
      >
        <ul className={styles.view}>
          <li className={styles.element}>
            <img
              src={isFlag}
              alt={isLanguage}
              width={!isMobile ? 26 : 18}
              height={!isMobile ? 14 : 10}
            />
            {!isMobile ? <span id={styles.text}>{isLanguage}</span> : null}
            <img src='./arrow.png' alt='arrow' />
          </li>
        </ul>
        {isOpen && (
          <ul className={styles.menu}>
            {translate.data.map((el) => (
              <li
                key={el.key}
                className={styles.element}
                onClick={() => {
                  setLanguage(el.key);
                  setFlag(el.image);
                  dispatch(setTranslate(el.key));
                }}
              >
                <div className={styles.group}>
                  <img
                    src={el.image}
                    alt={el.key}
                    width={!isMobile ? 26 : 18}
                    height={!isMobile ? 14 : 10}
                  />
                  <span id={styles.text}>{el.key}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Translate;
