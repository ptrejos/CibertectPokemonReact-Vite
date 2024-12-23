const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
        </div>
      </div>
    );
  };
  
  export default LoadingSpinner;
  