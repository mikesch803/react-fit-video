export const checkNotInHistroy = (videos, item) => !videos.some(
    (video) => video._id === item._id
  );