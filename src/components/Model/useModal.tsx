import { useRef, useCallback, useState, ReactNode } from 'react';
import { modal as styles } from '@styles';

const useModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const openModal = useCallback(() => {
    setVisible(true);
    requestAnimationFrame(() => {
      if (modalRef.current) {
        modalRef.current.style.transform = 'translateY(0%)';
      }
    });
  }, []);

  const closeModal = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.style.transform = 'translateY(100%)';
      setTimeout(() => setVisible(false), 300);
    }
  }, []);

  const ModalComponent = useCallback(
    ({ modalChildren }: { modalChildren: ReactNode }) => {
      if (!visible) return null;

      return (
        <div className={styles.overlay} onClick={closeModal}>
          <div
            className={styles.modal}
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            {/* <div className={styles.handle} /> */}
            {modalChildren}
          </div>
        </div>
      );
    },
    [visible, closeModal],
  );

  return { ModalComponent, openModal, closeModal };
};

export default useModal;
