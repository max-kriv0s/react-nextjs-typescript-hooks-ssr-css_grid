'use client';

import { JSX, useState } from 'react';
import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import Image from 'next/image';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '@/helpers/helpers';
import { Divider } from '../Divider/Divider';
import { Review } from '../Review/Review';

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

  return (
    <>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image src={product.image} alt={product.title} width={70} height={70} />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {priceRu(product.price)}
          {product.oldPrice && (
            <Tag className={styles['old-price']} color='green'>
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map((c) => (
            <Tag className={styles.category} key={c} color='ghost'>
              {c}
            </Tag>
          ))}
        </div>
        <div className={styles['price-title']}>цена</div>
        <div className={styles['credit-title']}>кредит</div>
        <div className={styles['rate-title']}>
          {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map((c) => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles['characteristics-name']}>{c.name}</span>
              <span className={styles['characteristics-dots']}></span>
              <span className={styles['characteristics-value']}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles['adv-block']}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles['adv-title']}>Преимущества</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles['adv-title']}>Недостатки</div>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance='primary'>Узнать подробнее</Button>
          <Button
            appearance='ghost'
            arrow={isReviewOpened ? 'down' : 'right'}
            className={styles['review-button']}
            onClick={() => setIsReviewOpened(!isReviewOpened)}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <Card
        color='blue'
        className={cn(styles.reviews, {
          [styles.opened]: isReviewOpened,
          [styles.closed]: !isReviewOpened,
        })}
      >
        {product.reviews.map((review) => (
          <>
            <Review key={review._id} review={review} />
            <Divider />
          </>
        ))}
      </Card>
    </>
  );
};
