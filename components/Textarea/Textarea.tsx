import { ForwardedRef, forwardRef, JSX } from 'react';
import { TextareaProps } from './Textarea.props';
import styles from './Textarea.module.css';
import cn from 'classnames';

export const Textarea = forwardRef(function Textarea(
  { className, error, ...props }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
): JSX.Element {
  return (
    <div className={cn(className, styles['textarea-wrapper'])}>
      <textarea
        className={cn(styles.textarea, {
          [styles.error]: error,
        })}
        ref={ref}
        {...props}
      />
      {error && <span className={styles['error-message']}>{error.message}</span>}
    </div>
  );
});
