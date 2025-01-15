import { API } from '@/app/api';
import { IReviewForm, IReviewSendResponse } from '@/components/ReviewForm/ReviewForm.interface';
import axios from 'axios';

export async function sendReview(productId: string, reviewData: IReviewForm): Promise<IReviewSendResponse> {
  const response = await axios.post<IReviewSendResponse>(
    API.review.createDemo,
    { ...reviewData, productId },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
}
