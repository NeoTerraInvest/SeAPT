import { modalFrame as styles } from '@styles';
import { HashLink } from 'react-router-hash-link';

const ModalFrame = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className={styles.debug}>
      <HashLink
        id={styles.element}
        smooth
        to='/#target-roadMap'
        onClick={closeModal}
      >
        Roadmap
      </HashLink>
      <HashLink
        id={styles.element}
        smooth
        to='/#target-about'
        onClick={closeModal}
      >
        About
      </HashLink>
      <HashLink
        id={styles.element}
        smooth
        to='/#target-tokenomics'
        onClick={closeModal}
      >
        Tokenomics
      </HashLink>
      <HashLink
        id={styles.element}
        smooth
        to='/#target-sns'
        onClick={closeModal}
      >
        Community
      </HashLink>
    </div>
  );
};

export default ModalFrame;
