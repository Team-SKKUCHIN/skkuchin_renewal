import React from 'react';
import { useRouter } from 'next/router';
import PostDetail from '../../components/SkkuChat/PostDetail';
import { Loading } from '../../components/Loading';

const PostDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <Loading />;
  }

  return <PostDetail postId={id} />
};

export default PostDetailPage;
