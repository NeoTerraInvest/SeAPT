import { useApiData } from '@/hook';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect } from 'react';

const News = () => {
  // 환경 변수에서 NEWS API URL과 프로토콜 가져오기
  const newsApiUrl = import.meta.env.VITE_NEWS_API || '';
  const newsApiProtocol = import.meta.env.VITE_NEWS_APIT_PROTOCOL || '';
  const apiKey = import.meta.env.VITE_NEWS_API_KEY || '';

  // 페이지 크기 설정
  const pageSize = 1;

  // 최종 엔드포인트 구성 (프로토콜 + 페이지 크기 + 인증키)
  const endpoint = `${newsApiProtocol}${pageSize}&apiKey=${apiKey}`;

  const { isData, isLoading, isError, isSuccess } = useApiData({
    api: () =>
      axiosInstance.get(endpoint, {
        baseURL: newsApiUrl,
      }),
  });

  useEffect(() => {
    if (isSuccess) {
      console.log('뉴스 데이터:', isData);
    }
    if (isLoading) {
      console.log('로딩 중:', isLoading);
    }
    if (isError) {
      console.log('에러 발생:', isError);
    }
  }, [isSuccess, isData, isLoading, isError]);

  return (
    <div>
      <div>{isData?.data.articles[0].title}</div>
      <div>{isData?.data.articles[0].publishedAt}</div>
      <img src={isData?.data.articles[0].urlToImage} alt='news' width={500} />
      <div>{isData?.data.articles[0].description}</div>
      <div>{isData?.data.articles[0].url}</div>
      {/* <div>{isData?.data.articles[0].content}</div> */}
    </div>
  );
};

export default News;
