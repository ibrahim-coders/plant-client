import { useState } from 'react';
import UpdateUserModal from '../../Modal/UpdateUserModal';
import PropTypes from 'prop-types';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const { email, status, role } = user || {};
  console.log(user);
  const updateRole = async selectsRole => {
    if (role === selectsRole) return;

    try {
      await axiosSecure.patch(`/user/role/${email}`, {
        role: selectsRole,
      });
      toast.success('Role updated sucessFull!');
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.response.data);
    } finally {
      setIsOpen(false);
    }
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{role}</p>{' '}
        {/* Display user role */}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={`${
            status === 'Requested'
              ? ''
              : status === 'seller'
              ? ''
              : 'text-green-500'
          } whitespace-no-wrap`}
        >
          {status || 'Unavailable'}
        </p>

        {/* Display user status */}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </span>
        {/* Modal for updating user role */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          role={role}
          updateRole={updateRole}
        />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserDataRow;
