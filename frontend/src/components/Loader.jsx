const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        className="
          h-12
          w-12
          animate-spin
          rounded-full
          border-4
          border-blue-600
          border-t-transparent
        "
      />
    </div>
  );
};

export default Loader;