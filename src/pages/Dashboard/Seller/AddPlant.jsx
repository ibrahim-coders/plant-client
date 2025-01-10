import { Helmet } from 'react-helmet-async';
import AddPlantForm from '../../../components/Form/AddPlantForm';
import { imgaeUploade } from '../../../Api/utils';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
const AddPlant = () => {
  const axiosSecure = useAxiosSecure();
  const [uploadButtonText, setuploadButtonText] = useState('Uploade Image');
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseFloat(form.quantity.value);
    const image = form.image.files[0];
    const imageUrl = await imgaeUploade(image);
    //seler infromation
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    //creact plant data object
    const plantData = {
      name,
      description,
      category,
      price,
      quantity,

      image: imageUrl,
      seller,
    };

    try {
      await axiosSecure.post('/plants', plantData);
      toast.success('Data Added Success!');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm
        handleSubmit={handleSubmit}
        uploadButtonText={uploadButtonText}
        setuploadButtonText={setuploadButtonText}
        loading={loading}
      />
    </div>
  );
};

export default AddPlant;
