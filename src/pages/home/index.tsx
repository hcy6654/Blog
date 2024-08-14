import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <div>
        <Header />
        <div className="post_navigation">
          <div className="post_navigation-active">전체 글</div>
          <div>나의 글</div>
        </div>
        <div className="post_list">
          {[...Array(10)].map((e, index) => (
            <div key={index} className="post_box">
              <Link to={`posts/${index}`}>
                <div className="post_profile-box">
                  <div className="post_profile"></div>
                  <div className="post_author-name">한지웅</div>
                  <div className="post_date">2024.08.13</div>
                </div>
                <div className="post_title">게시글 {index}</div>
                <div className="post_text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Nisl tincidunt eget nullam non. Quis hendrerit dolor magna
                  eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris
                  sit amet massa. Commodo odio aenean sed adipiscing diam donec
                  adipiscing tristique. Mi eget mauris pharetra et. Non tellus
                  orci ac auctor augue. Elit at imperdiet dui accumsan sit.
                  Ornare arcu dui vivamus arcu felis. Egestas integer eget
                  aliquet nibh praesent. In hac habitasse platea dictumst
                  quisque sagittis purus. Pulvinar elementum integer enim neque
                  volutpat ac.
                </div>
                <div className="post_utils-box">
                  <div className="post_delete">삭제</div>
                  <div className="post_edit">수정</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}
