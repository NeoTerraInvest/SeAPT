import { Universe } from '@components';
import { main as styles } from '@styles';
import { OrderBook, Chart } from '@components';
// import { useModal } from '@model';

const Dev = () => {
  // const { ModalComponent, openModal } = useModal();

  return (
    <div id={styles.debug} style={{ backgroundColor: 'gray' }}>
      Dev
      <span>UI Desing System</span>
      <button
        onClick={() => {
          window.open(
            `${import.meta.env.VITE_API_CDN_URL}/pdf/seapt_white_paper.pdf`,
            '_blank',
            'noopener,noreferrer',
          );
        }}
      >
        Test
      </button>
      <div style={{ padding: '30px' }}></div>
      {/* <WhitePaper /> */}
      <div style={{ padding: '30px' }}></div>
      <Universe />
      <div style={{ padding: '30px' }}></div>
      <>
        {/* <button onClick={openModal}>Open Modal</button> */}
        {/* <ModalComponent
          modalChildren={<div>👋 Hello! I am a slide-up modal!</div>}
        /> */}
      </>
      <OrderBook marketId='SEAPT-USDT' />
      <Chart marketId='SEAPT-USDT' />
      <footer style={{ padding: '30px' }}></footer>
    </div>
  );
};

export default Dev;
