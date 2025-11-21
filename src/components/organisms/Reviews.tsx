import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  Modal,
  TextInput,
} from 'react-native';
import { Card, Typography, Button } from '../atoms';
import { Rating } from '../molecules';
import type { Review } from '../../types';

export interface ReviewsProps {
  reviews: Review[];
  productId: string;
  onSubmitReview?: (rating: number, comment: string) => void;
  onMarkHelpful?: (reviewId: string) => void;
  loading?: boolean;
}

export const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  productId,
  onSubmitReview,
  onMarkHelpful,
  loading = false,
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const containerStyle: ViewStyle = {
    padding: 16,
  };

  const reviewCardStyle: ViewStyle = {
    marginBottom: 16,
  };

  const reviewHeaderStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  };

  const helpfulContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  };

  const modalContainerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  };

  const modalContentStyle: ViewStyle = {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  };

  const handleSubmitReview = () => {
    if (onSubmitReview && newComment.trim()) {
      onSubmitReview(newRating, newComment);
      setNewComment('');
      setNewRating(5);
      setShowReviewModal(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <View style={containerStyle}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Typography variant="h3" weight="bold">
          Reviews ({reviews.length})
        </Typography>
        <Button
          variant="outline"
          size="sm"
          onPress={() => setShowReviewModal(true)}
        >
          Write Review
        </Button>
      </View>

      {reviews.length > 0 && (
        <Card variant="outlined" padding="md" style={{ marginBottom: 16 }}>
          <View style={{ alignItems: 'center' }}>
            <Typography variant="h1" weight="bold">
              {averageRating.toFixed(1)}
            </Typography>
            <Rating rating={averageRating} size="lg" />
            <Typography variant="caption" color="muted" style={{ marginTop: 4 }}>
              Based on {reviews.length} reviews
            </Typography>
          </View>
        </Card>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {reviews.map((review) => (
          <Card
            key={review.id}
            variant="outlined"
            padding="md"
            style={reviewCardStyle}
          >
            <View style={reviewHeaderStyle}>
              <View>
                <Typography variant="label" weight="semibold">
                  {review.userName}
                </Typography>
                <Typography variant="caption" color="muted">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </View>
              <Rating rating={review.rating} size="sm" />
            </View>

            <Typography variant="body" color="secondary" style={{ marginTop: 8 }}>
              {review.comment}
            </Typography>

            <View style={helpfulContainerStyle}>
              <TouchableOpacity
                onPress={() => onMarkHelpful?.(review.id)}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Typography variant="caption" color="muted">
                  👍 Helpful ({review.helpful})
                </Typography>
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        {reviews.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 32 }}>
            <Typography variant="body" color="muted" align="center">
              No reviews yet. Be the first to review this product!
            </Typography>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showReviewModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowReviewModal(false)}
      >
        <View style={modalContainerStyle}>
          <View style={modalContentStyle}>
            <Typography variant="h3" weight="bold" style={{ marginBottom: 20 }}>
              Write a Review
            </Typography>

            <Typography variant="label" weight="medium" style={{ marginBottom: 8 }}>
              Rating
            </Typography>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setNewRating(star)}
                  style={{ marginRight: 8 }}
                >
                  <Typography variant="h2">
                    {star <= newRating ? '⭐' : '☆'}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>

            <Typography variant="label" weight="medium" style={{ marginBottom: 8 }}>
              Your Review
            </Typography>
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Share your thoughts about this product..."
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                marginBottom: 20,
                minHeight: 120,
              }}
            />

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button
                variant="outline"
                size="lg"
                onPress={() => setShowReviewModal(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                onPress={handleSubmitReview}
                disabled={!newComment.trim()}
                loading={loading}
                style={{ flex: 1 }}
              >
                Submit
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
