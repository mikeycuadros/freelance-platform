import React from "react";
import { addReview } from "../../services/review";

const ReviewsTab = ({
  person,
  isAuthenticated,
  user,
  id,
  reviewMessage,
  setReviewMessage,
  fetchPersonData,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reseñas de clientes</h2>

      <div className="space-y-6">
        {person.reviews && person.reviews.length > 0 ? (
          person.reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">{review.user.username}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill={
                            i < Math.floor(parseFloat(review.rating))
                              ? "currentColor"
                              : "none"
                          }
                          stroke="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
                    : "Hace 2 meses"}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="p-4 border rounded-lg text-center">
            <p className="text-gray-500">
              Este freelancer aún no tiene reseñas.
            </p>
          </div>
        )}
        {isAuthenticated && user && user.id !== parseInt(id) && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-3">Añadir una reseña</h3>
            {reviewMessage.text && (
              <div
                className={`mb-4 p-2 rounded ${
                  reviewMessage.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {reviewMessage.text}
              </div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const rawRating = parseInt(e.target.rating.value);
                const rating = Math.min(Math.max(rawRating, 0), 5);
                const comment = e.target.comment.value;

                try {
                  await addReview({
                    rating,
                    comment,
                    freelancerId: id,
                  });

                  await fetchPersonData();
                  e.target.reset();
                  setReviewMessage({
                    text: "¡Reseña enviada con éxito!",
                    type: "success",
                  });
                } catch (error) {
                  console.error("Error al enviar la reseña:", error);
                  setReviewMessage({
                    text: "Error al enviar la reseña. Por favor, inténtalo de nuevo.",
                    type: "error",
                  });
                }
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Calificación
                </label>
                <div className="flex items-center">
                  {[5, 4, 3, 2, 1].map((value) => (
                    <label
                      key={value}
                      className="mr-4 flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        className="mr-1"
                        defaultChecked={value === 5}
                      />
                      <span>{value}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-400 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Comentario
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Comparte tu experiencia trabajando con este freelancer..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Publicar reseña
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsTab;
