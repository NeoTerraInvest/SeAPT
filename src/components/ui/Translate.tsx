import { useEffect, useState, useRef } from 'react';
import { translate as styles } from '@styles';
import { translate } from '@data';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setTranslate } from '@/store/slice/translate.slice';
import { useTrackingView } from '@model';

const CDNURL = import.meta.env.VITE_API_CDN_URL;

const Translate = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLanguage, setLanguage] = useState<string>(translate.data[0].key);
  const isMobile = useTrackingView({ size: 757 });
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    setLanguage(translate.data[0].key);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setLanguage]);

  return (
    <div className={styles.debug} ref={dropdownRef}>
      <div
        className={isOpen ? styles.active : ''}
        id={styles.translate}
        onClick={handleDropDown}
      >
        <ul className={styles.view}>
          <li className={styles.element}>
            <img
              src={`${CDNURL}/images/ui/${isLanguage}.png`}
              alt={isLanguage}
              width={!isMobile ? 26 : 18}
              height={!isMobile ? 14 : 10}
            />
            {!isMobile ? <span id={styles.text}>{isLanguage}</span> : null}
            <img src={`${CDNURL}/images/ui/arrow.png`} alt='arrow' />
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
                  // setFlag(el.image);
                  dispatch(setTranslate(el.key));
                }}
              >
                <div className={styles.group}>
                  <img
                    src={`${CDNURL}/images/ui/${el.key}.png`}
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
