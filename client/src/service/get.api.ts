import axiosInstance from '@/utils/axiosInstance';

const getApi = async <DataType>(url: string) => {
  try {
    const res = await axiosInstance.get<DataType>(url);
    return res.data;
  } catch (err) {
    console.log('⚠️getApi error:', err);
    throw err;
  }
};

export default getApi;
