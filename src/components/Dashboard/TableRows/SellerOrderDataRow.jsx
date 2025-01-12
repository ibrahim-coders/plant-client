import PropTypes from 'prop-types';
import { useState } from 'react';
import DeleteModal from '../../Modal/DeleteModal';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SellerOrderDataRow = ({ sellerOrder, refetch }) => {
  const axiosSecure = useAxiosSecure(); // Correct usage of the hook
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const { name, email, status, _id, plantId } = sellerOrder || {};

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/orders/${_id}`);
      await axiosSecure.patch(`/plants/quantity/${plantId}`, {
        quantityToUpdate: 1, // Ensure this value is passed correctly
        status: 'increase',
      });
      refetch();
      toast.success('Order canceled');
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || 'Something went wrong!';
      toast.error(errorMessage);
    } finally {
      closeModal();
    }
  };

  const handleStatus = async newStatus => {
    if (status === newStatus) {
      return; // Exit if the status is unchanged
    }

    try {
      await axiosSecure.patch(`/orders-status/${_id}`, {
        status: newStatus,
      });
      refetch();
      toast.success('Order status updated successfully');
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || 'Something went wrong!';
      toast.error(errorMessage);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">$120</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">5</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">Dhaka</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{status}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-2">
          <select
            defaultValue={status}
            onChange={e => handleStatus(e.target.value)}
            required
            className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">Start Processing</option>
            <option value="Delivered">Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Cancel</span>
          </button>
        </div>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
        />
      </td>
    </tr>
  );
};

SellerOrderDataRow.propTypes = {
  sellerOrder: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default SellerOrderDataRow;
