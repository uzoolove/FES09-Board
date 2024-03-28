import useCustomAxios from "@hooks/useCustomAxios.mjs";
import ReplyItem from "@pages/board/ReplyItem";
import ReplyNew from "@pages/board/ReplyNew";
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';


// import { useEffect, useState } from "react";

function ReplyList(){

  const axios = useCustomAxios();
  const { _id } = useParams();


  // const [data, setData] = useState(null);

  // const fetchList = async () => {
  //   const res = await axios.get(`/posts/${ _id }/replies`, { params: { sort: JSON.stringify({ _id: -1 }) } });
  //   setData(res.data);
  // }

  // useEffect(() => {
  //   fetchList();
  // }, []);


  const { data } = useQuery({
    queryKey: ['posts', _id, 'replies'],
    queryFn: () => axios.get(`/posts/${ _id }/replies`, { params: { sort: JSON.stringify({ _id: -1 }) } }),
    select: response => response.data,
    // refetchInterval: 1000
  });

  const list = data?.item.map(item => <ReplyItem key={ item._id } item={ item } />);

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 { list?.length || 0 }개</h4>
      { list }

      <ReplyNew />

    </section>
  );
}

export default ReplyList;