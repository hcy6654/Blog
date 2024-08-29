import { Link } from "react-router-dom";

export default function PostDetail() {
  return (
    <>
      <div className="post_detail">
        <div className="post_box">
          <div className="post_title">dummy</div>
          <div className="post_profile-box">
            <div className="post_profile"></div>
            <div className="post_author-name">한지웅</div>
            <div className="post_date">2024.08.13</div>
          </div>
          <div className="post_utils-box">
            <div className="post_delete">삭제</div>
            <div className="post_edit">
              <Link to={`/post/edit/1`}>수정</Link>
            </div>
          </div>
          <div className="post_text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
            tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem
            ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa.
            Commodo odio aenean sed adipiscing diam donec adipiscing tristique.
            Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at
            imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis.
            Egestas integer eget aliquet nibh praesent. In hac habitasse platea
            dictumst quisque sagittis purus. Pulvinar elementum integer enim
            neque volutpat ac.
          </div>
        </div>
      </div>
    </>
  );
}
