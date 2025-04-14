import { useCallback, useEffect, useRef, useState } from 'react';

const useApiData = <DataType>({ api }: { api: () => Promise<DataType> }) => {
  const [isData, setData] = useState<DataType | null>(null);
  const [isLoading, setLoading] = useState<string>('');
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isError, setError] = useState<string | null>(null);
  const fetchFlag = useRef(false);

  const fetchState = useCallback(async () => {
    try {
      setLoading('🟠 Loading...');
      setError(null);
      const result = await api();
      if (result) {
        setSuccess(true);
        setData(result);
        setLoading('✅ Done');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      setLoading('🔴 Error');
      setSuccess(false);
    }
  }, [api]);

  // only once call fetchState
  useEffect(() => {
    if (!fetchFlag.current) {
      console.log('🟢 fetchFlag.current:', fetchFlag.current);
      fetchFlag.current = true;
      fetchState();
    }
  }, [fetchState]);

  return { isData, isLoading, isError, isSuccess, refetch: fetchState };
};

export default useApiData;
