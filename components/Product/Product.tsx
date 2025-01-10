import { JSX } from 'react';
import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import Image from 'next/image';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
  return (
    <Card className={styles.product}>
      <div className={styles.logo}>
        <Image src={product.image} alt={product.title} width={70} height={70} />
      </div>
      <div className={styles.title}>{product.title}</div>
      <div className={styles.price}>{product.price}</div>
      <div className={styles.credit}>{product.credit}</div>
      <div className={styles.rating}>
        <Rating rating={product.reviewAvg ?? product.initialRating} />
      </div>
      <div className={styles.tags}>
        {product.categories.map((c) => (
          <Tag key={c} color='ghost'>
            {c}
          </Tag>
        ))}
      </div>
      <div className={styles['price-title']}>цена</div>
      <div className={styles['credit-title']}>кредит</div>
      <div className={styles['rate-title']}>{product.reviewCount} отзывов</div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.description}>{product.description}</div>
      <div className={styles.feature}>фичи</div>
      <div className={styles['adv-block']}>
        <div className={styles.advantages}>
          <div>Преимущества</div>
          <div>{product.advantages}</div>
        </div>
        <div className={styles.disadvantages}>
          <div>Недостатки</div>
          <div>{product.disadvantages}</div>
        </div>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.actions}>
        <Button appearance='primary'>Узнать подробнее</Button>
        <Button appearance='ghost' arrow='right'>
          Читать отзывы
        </Button>
      </div>
    </Card>
  );
};
