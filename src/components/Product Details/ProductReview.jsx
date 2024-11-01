"use client";
import React, { useState, useEffect } from "react";
import { UseAuth } from "@/app/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function ProductReview({ productID }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = UseAuth();
  const uid = user ? user.uid : null;
  const email = user ? user.email : null; // fixed typo from "emai" to "email"
  const name = user ? user.displayName : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [visibleReviews, setVisibleReviews] = useState(2); // Initially show 2 reviews

  const showMoreReviews = () => {
    setVisibleReviews(reviews.length); // Show all reviews on click
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/products/review"
        );
        const allReviews = response.data.review;

        // Filter reviews based on productId
        const filteredReviews = allReviews.filter(
          (review) => review.productId === productID
        );
        setReviews(filteredReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productID]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRatingClick = (starValue) => {
    setRating(starValue);
  };

  const handleSubmit = async () => {
    // Check if the user is authenticated
    if (!user) {
      toast.error("You must be logged in to post a review.");
      return;
    }

    const pendingToastId = toast.loading("Uploading review...");

    try {
      // Get token (assuming your auth context provides it)
      const token = await user.getIdToken(); // Assuming Firebase Auth is used and you need to get a token

      const response = await fetch("/api/admin/products/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
        body: JSON.stringify({
          email: email,
          uid: uid,
          productId: productID,
          text: text,
          rating: rating,
          userName: name,
        }),
      });

      const responseData = await response.json();

      toast.update(pendingToastId, {
        render: "Review posted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      toast.update(pendingToastId, {
        render: error.message || "An error occurred while posting the review.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };
  const averageRating = reviews.length
    ? (
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      ).toFixed(1)
    : 0;
  return (
    <div className="py-4">
      <ToastContainer />
      <section classNameName="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Reviews
              </h2>

              <div className="mt-2 flex items-center gap-2 sm:mt-0">
                <div className="flex items-center gap-0.5">
                  {/* Repeated SVG for rating stars */}
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={averageRating}
                      readOnly
                    />
                  </Stack>
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  {averageRating}
                </p>
                <div className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                  {`${reviews.length} Reviews`}
                </div>
              </div>
            </div>

            <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
              <div className="shrink-0 space-y-4">
                <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                  {averageRating} out of 5
                </p>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="mb-2 me-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white  "
                >
                  Write a review
                </button>
              </div>

            </div>
          </div>
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <div
              key={index}
              className="mt-6 divide-y divide-gray-200 dark:divide-gray-700 mx-4"
            >
              <div className="gap-3 pb-6 sm:flex sm:items-start">
                <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                <div>
                    <Rating
                      name="half-rating-read"
                      defaultValue={review.rating}
                      readOnly
                    />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {review.userName}
                    </p>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                
                  <div className="inline-flex items-center gap-1">
                    <svg
                      className="h-5 w-5 text-primary-700 dark:text-primary-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Verified purchase
                    </p>
                  </div>
                </div>

                <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    {review.text}
                  </p>

                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Was it helpful to you?
                    </p>
                    <div className="flex items-center">
                      <input
                        id={`reviews-radio-yes-${index}`}
                        type="radio"
                        value=""
                        name={`reviews-radio-${index}`}
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      />
                      <label
                        htmlFor={`reviews-radio-yes-${index}`}
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id={`reviews-radio-no-${index}`}
                        type="radio"
                        value=""
                        name={`reviews-radio-${index}`}
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      />
                      <label
                        htmlFor={`reviews-radio-no-${index}`}
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {visibleReviews < reviews.length && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={showMoreReviews}
                className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                View more reviews
              </button>
            </div>
          )}
        </div>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            {/* Modal Header */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Add a Review
            </h3>

            {/* Rating Stars */}
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <svg
                  key={starValue}
                  onClick={() => handleRatingClick(starValue)}
                  className={`h-8 w-8 cursor-pointer ${
                    rating >= starValue ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27l5.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
                </svg>
              ))}
            </div>

            {/* Review Form */}
            <form>
              <div className="mb-4">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  rows="4"
                  placeholder="Write your review here..."
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-2 text-white bg-black rounded-lg "
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
