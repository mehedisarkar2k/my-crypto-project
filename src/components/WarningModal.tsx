export default function WarningModal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="glassmorphism-modal p-8 rounded-lg text-center max-w-lg w-full mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">
          MetaMask Required
        </h2>
        <p className="text-lg text-white mb-6">
          You need to connect MetaMask to use this site. Please install or
          connect MetaMask and reload the page.
        </p>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
