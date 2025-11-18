interface LoadMoreCoursesProps {
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

export const LoadMoreCourses = ({ onLoadMore, hasMore, loading }: LoadMoreCoursesProps) => {
  return (
    <div className="text-center">
      {hasMore && !loading && (
        <button
          onClick={onLoadMore}
          className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Load More Courses
        </button>
      )}
      {loading && <p className="text-gray-600">Loading...</p>}
      {!hasMore && <p className="text-gray-600">No more courses available</p>}
    </div>
  );
};
