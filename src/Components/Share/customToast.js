import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const customToast = ({ t, productImage, productName, price }) => {
  // Use the navigate hook to programmatically navigate to a different route
  const navigate = useNavigate();

  return (
    <div className="toast-container flex items-center bg-white p-4 rounded-lg shadow-md w-72">
      <img src={productImage} alt={productName} className="w-12 h-12 mr-3 rounded" />
      <div className="flex flex-col">
        <span className="font-semibold">{productName}</span>
        <span className="text-sm text-gray-500">${price}</span>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss(t.id); // Dismiss the toast
              navigate("/viewcart"); // Navigate to the '/viewcart' page
            }}
            className="bg-black text-white p-2 rounded"
          >
            View Cart
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id); // Dismiss the toast
            }}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default customToast;
