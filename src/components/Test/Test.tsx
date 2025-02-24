import { useState } from 'react';
import { react } from '../../assets';
import viteLogo from '/vite.svg';
import styles from '../../styles/test.module.scss';

const Test = () => {
  const [count, setCount] = useState(0);

  return (
    <div id={styles.debug}>
      <div className={styles.contents}>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className={styles.logo} alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img
            src={react}
            className={`${styles.logo} ${styles.react}`}
            alt='React logo'
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <div id={styles.button}>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={`${styles.readTheDocs}`}>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default Test;
