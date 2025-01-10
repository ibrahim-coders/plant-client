import { BsFingerprint } from 'react-icons/bs';
import { GrUserAdmin } from 'react-icons/gr';
import MenuItem from './MenuItem';
import { useState } from 'react';
import toast from 'react-hot-toast';
import BecomeSellerModal from '../../../Modal/BecomeSellerModal';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
const CustomerMenu = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleSellerRequest = async () => {
    try {
      // Send request to server
      const { data } = await axiosSecure.patch(`/users/${user?.email}`);

      // Show success toast notification
      toast.success('Successfully applied to become a seller');
    } catch (err) {
      // Log error and show error notification
      console.log(err?.response?.data || 'An unexpected error occurred');
      toast.error(
        err?.response?.data || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />

      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Seller</span>
      </button>

      <BecomeSellerModal
        closeModal={closeModal}
        isOpen={isOpen}
        handleSellerRequest={handleSellerRequest}
      />
    </>
  );
};

export default CustomerMenu;
