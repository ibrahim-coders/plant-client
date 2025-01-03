import axios from 'axios';

export const imgaeUploade = async imageDate => {
  const formData = new FormData();
  formData.append('image', imageDate);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_kEY}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return data.data.display_url;
};
