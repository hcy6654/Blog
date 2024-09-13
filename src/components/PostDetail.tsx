import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostProps } from "./PostList";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import Loader from "./Loader";
import { toast } from "react-toastify";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "post", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

  const getPosts = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  useEffect(() => {
    if (params?.id) getPosts(params?.id);
  }, [params?.id]);
  return (
    <>
      <div className="post_detail">
        {post ? (
          <div className="post_box">
            <div className="post_title">{post?.title}</div>
            <div className="post_profile-box">
              <div className="post_profile"></div>
              <div className="post_author-name">{post?.email}</div>
              <div className="post_date">{post?.creatAt}</div>
            </div>
            <div className="post_utils-box">
              <div
                className="post_delete"
                role="presentation"
                onClick={handleDelete}
              >
                삭제
              </div>
              <div className="post_edit">
                <Link to={`/post/edit/${post?.id}`}>수정</Link>
              </div>
            </div>
            <div className="post_text post_text_prewrap">{post?.content}</div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
