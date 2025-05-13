import { modalFrame as styles } from '@styles';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';

const ModalFrame = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.debug}>
      <div
        id={styles.element}
        style={{
          cursor: 'pointer',
        }}
        onClick={() => {
          navigate('/TokenList');
        }}
      >
        TokenList
      </div>
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
