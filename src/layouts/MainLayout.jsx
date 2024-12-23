// eslint-disable-next-line react/prop-types
const MainLayout = ({ children }) => {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-xl font-bold">Pokemon App - Cibertec</h1>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    );
  };
  
  export default MainLayout;