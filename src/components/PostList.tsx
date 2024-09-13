import AuthContext from "context/AuthContext";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
}
export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  creatAt: string;
  uid: string;
}

type TabType = "all" | "my";

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTap, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "post", id));
      toast.success("게시글을 삭제했습니다.");
      getPosts();
    }
  };

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "posts"));
    setPosts([]);
    datas.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {hasNavigation && (
        <div className="post_navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTap === "all" ? "post_navigation-active" : ""}
          >
            전체 글
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTap === "my" ? "post_navigation-active" : ""}
          >
            나의 글
          </div>
        </div>
      )}
      <div className="post_list">
        {posts?.length > 0 ? (
          posts?.map((post, index) => (
            <div key={post?.id} className="post_box">
              <Link to={`posts/${post?.id}`}>
                <div className="post_profile-box">
                  <div className="post_profile"></div>
                  <div className="post_author-name">{post?.email}</div>
                  <div className="post_date">{post?.creatAt}</div>
                </div>
                <div className="post_title">{post?.title}</div>
                <div className="post_text">{post?.summary}</div>
              </Link>

              {post?.email === user?.email && (
                <div className="post_utils-box">
                  <div
                    className="post_delete"
                    role="presentation"
                    onClick={() => handleDelete}
                  >
                    삭제
                  </div>
                  <Link to={`/post/edit/${post?.id}}`} className="post_edit">
                    수정
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post_nopost"> 게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
