import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import AuthContext from "context/AuthContext";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps } from "./PostList";

export default function PostForm() {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<PostProps | null>(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    try {
      if (post && post?.id) {
        //데이터가 있다면 수정
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          title: title,
          summary: summary,
          content: content,
          updateAt: new Date()?.toLocaleDateString(),
          uid: user?.uid,
        });

        toast?.success("게시글을 수정했습니다.");
        navigate(`/posts/${post.id}`);
      }

      //firestore로 데이터 생성
      await addDoc(collection(db, "posts"), {
        title: title,
        summary: summary,
        content: content,
        creatAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      });

      toast.success("게시글을 생성했습니다.");
      navigate("/");
    } catch (e: any) {
      console.log(e);
      toast.error(e?.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === "summary") {
      setTitle(value);
    }

    if (name === "summary") {
      setSummary(value);
    }

    if (name === "content") {
      setContent(value);
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
  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
    } else {
      navigate("/");
      toast.error("접근 불가능한 페이지 입니다.");
    }
  }, [navigate, post, user]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form_block">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={onChange}
            value={title}
            required
          />
        </div>
        <div className="form_block">
          <label htmlFor="summary">요약</label>
          <input
            type="text"
            name="summary"
            id="summary"
            onChange={onChange}
            value={summary}
            required
          />
        </div>
        <div className="form_block">
          <label htmlFor="content">내용</label>
          <textarea
            name="content"
            id="content"
            onChange={onChange}
            value={content}
            required
          />
        </div>
        <div className="form_block">
          <input
            type="submit"
            value={post ? "수정" : "제출"}
            className="form_btn-submit"
          />
        </div>
      </form>
    </>
  );
}
