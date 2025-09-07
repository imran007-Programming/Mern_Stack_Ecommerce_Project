import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReview } from "../../redux/Slice/reviewSlice/ReviewSlice";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FaStar } from "react-icons/fa";

const Review = () => {
  const { allReviewData, loading } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  // Embla carousel setup
  const [emblaRef] = useEmblaCarousel(
    { loop: true, skipSnaps: false, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    dispatch(getAllReview());
  }, [dispatch]);

  return (
    <div className="w-full py-12">
      <h2 className="text-2xl text-start my-3">Customer Reviews</h2>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {loading
            ? // Skeleton loader (show 3 while fetching)
              Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[260px] sm:w-[300px] bg-white rounded-lg shadow-lg p-5 animate-pulse"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <div className="bg-gray-300 h-4 w-24 mb-2 rounded"></div>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 bg-gray-300 rounded"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-300 h-3 w-full rounded mb-2"></div>
                  <div className="bg-gray-300 h-3 w-3/4 rounded"></div>
                </div>
              ))
            : allReviewData?.length > 0
            ? allReviewData.map((review) => (
                <div
                  key={review._id}
                  className="flex-shrink-0 w-[260px] sm:w-[300px] bg-white rounded-lg shadow-lg p-5"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={review.avatar}
                      alt={review.username}
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{review.username}</h3>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: Number(review.rating) }).map(
                          (_, i) => (
                            <FaStar key={i} />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.description}</p>
                </div>
              ))
            : // Fallback when no reviews
              (
                <p className="text-gray-500">No reviews yet.</p>
              )}
        </div>
      </div>
    </div>
  );
};

export default Review;
