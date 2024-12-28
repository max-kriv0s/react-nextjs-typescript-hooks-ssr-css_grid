import { TopPageComponentProps } from './TopPageComponent.props';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps) => {
  return (
    products && (
      <>
        <div>
          <div>{page.title}</div>
          <div>{page.category}</div>
          <div>{products && products.length}</div>
        </div>
      </>
    )
  );
};
