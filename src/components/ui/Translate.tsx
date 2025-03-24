import { useEffect, useState } from 'react';
import { translate as styles } from '@styles';
import { translate } from '@data';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setTranslate } from '@/store/slice/translate.slice';

const Translate = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLanguage, setLanguage] = useState<string>(translate.data[0].key);
  const [isFlag, setFlag] = useState<string>(translate.data[0].image);
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
            <img src={isFlag} alt={isLanguage} width={26} height={14} />
            <span id={styles.text}>{isLanguage}</span>
            <img src='./arrow.png' alt='arrow' />
          </li>
        </ul>
        {isOpen && (
          <ul className={styles.menu}>
            {translate.data.map((el) => (
              <li
                className={styles.element}
                onClick={() => {
                  setLanguage(el.key);
                  setFlag(el.image);
                }}
              >
                <div
                  className={styles.group}
                  onClick={() => {
                    dispatch(setTranslate(el.key));
                  }}
                >
                  <img src={el.image} alt={el.key} width={26} height={14} />
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
