import { useApiData } from '@hook';
import { useEffect } from 'react';
import getApi from '@/service/get.api';
import { API } from '@types';
const TokenList = () => {
  console.log('🔁 TokenList rendered');

  const { isData, isLoading, isError, isSuccess } =
    useApiData<API.marketResList>({
      api: () => getApi<API.marketResList>('/market'),
    });

  useEffect(() => {
    if (isSuccess) {
      console.log('🟢 isData:', isData);
    }
    if (isLoading) {
      console.log('🟠 isLoading:', isLoading);
    }
    if (isError) {
      console.log('🔴 isError:', isError);
    }
  }, [isData, isError, isLoading, isSuccess]);

  return (
    <div>
      {isLoading && <div>🟠 Loading...</div>}
      {isError && <div>🔴 Error: {isError}</div>}
      {isSuccess && (
        <div>
          🟢 Success:
          <pre>{JSON.stringify(isData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TokenList;
