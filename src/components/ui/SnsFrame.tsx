import { snsFrame as styles } from '@styles';

const SnsFrame = ({
  image,
  title,
  description,
  state,
}: {
  image: string;
  title: string;
  description: string;
  state: boolean;
}) => {
  return (
    <div id={styles.debug}>
      <div className={styles.container}>
        <div id={styles.hyperlink}>
          <div></div>
        </div>
        <div className={styles.contents}>
          <div id={styles.img}>
            <img src={image} alt='' />
          </div>
          <div id={styles.title}>{title}</div>
          {state ? null : <div id={styles.description}>{description}</div>}
        </div>
      </div>
    </div>
  );
};

export default SnsFrame;
