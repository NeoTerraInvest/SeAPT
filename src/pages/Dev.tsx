import { WhitePaper, Universe } from '@components';
import { main as styles } from '@styles';
import { useModal } from '@model';

const Dev = () => {
  const { ModalComponent, openModal } = useModal();

  return (
    <div id={styles.debug} style={{ backgroundColor: 'gray' }}>
      Dev
      <span>UI Desing System</span>
      <div style={{ padding: '30px' }}></div>
      <WhitePaper />
      <div style={{ padding: '30px' }}></div>
      <Universe />
      <div style={{ padding: '30px' }}></div>
      <>
        <button onClick={openModal}>Open Modal</button>
        <ModalComponent
          modalChildren={<div>👋 Hello! I am a slide-up modal!</div>}
        />
      </>
      <footer style={{ padding: '30px' }}></footer>
    </div>
  );
};

export default Dev;
