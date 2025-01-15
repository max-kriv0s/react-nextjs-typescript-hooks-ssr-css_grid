'use client';

import { JSX, useState } from 'react';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm } from './ReviewForm.interface';
import { sendReview } from '@/api/review';
import axios from 'axios';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const data = await sendReview(productId, formData);
      if (data.message) {
        setIsSuccess(true);
        setIsError(false);
        reset();
      } else {
        setIsError(true);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log('Error: ' + e.response?.data?.message);
      } else {
        console.log(e);
      }

      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles['review-form'], className)} {...props}>
        <Input
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
          placeholder='Имя'
          error={errors.name}
        />
        <Input
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
          placeholder='Заголовок отзыва'
          className={styles.title}
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                error={errors.rating}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', { required: { value: true, message: 'Заполните текст отзыва' } })}
          placeholder='Текст отзыва'
          className={styles.description}
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button appearance='primary'>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.panel, styles.success)}>
          <div className={styles['success-title']}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
          <CloseIcon
            className={styles.close}
            onClick={() => {
              setIsSuccess(false);
            }}
          />
        </div>
      )}
      {isError && (
        <div className={cn(styles.panel, styles.error)}>
          Что-то пошло не так, попробуйте обновить страницу
          <CloseIcon
            className={styles.close}
            onClick={() => {
              setIsError(false);
            }}
          />
        </div>
      )}
    </form>
  );
};
