import { memberState } from "@recoil/user/atoms.mjs";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const API_SERVER = 'https://market-lion.koyeb.app/api';

function useCustomAxios(){

  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 된 사용자 정보
  const user = useRecoilValue(memberState);

  // ajax 통신에 사용할 공통 설정 지정
  const instance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000*10,
    headers: {
      'content-type': 'application/json', // request 데이터 타입
      'accept': 'application/json',  // response 데이터 타입
    }
  });

  // 요청 인터셉터
  instance.interceptors.request.use(config => {
    if(user){
      const accessToken = user.token.accessToken; 
      config.headers.Authorization = `Bearer ${ accessToken }`;
    }
    return config;
  });

  // 응답 인터셉터
  instance.interceptors.response.use(res => res, err => {
    if(err.response?.status === 401){ // 인증 되지 않음
      const gotoLogin = confirm('로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?');
      gotoLogin && navigate('/users/login', { state: { from: location.pathname } });
    }else{
      return Promise.reject(err);
    }
  });

  return instance;
}

export default useCustomAxios;