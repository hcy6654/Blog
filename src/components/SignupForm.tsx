import { Link } from "react-router-dom";

export default function SignupForm() {
  return (
    <>
      <form action="/post" method="POST" className="form form--lg">
        <h1 className="form_title">회원가입</h1>
        <div className="form_block">
          <label htmlFor="email">이메일</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="form_block">
          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div className="form_block">
          <label htmlFor="password_confirm">비밀번호 확인</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div className="form_block">
          계정이 이미 있으신가요?{" "}
          <Link to="/signup" className="form_link">
            로그인하기
          </Link>
        </div>
        <div className="form_block">
          <input type="submit" value="로그인" className="form_btn-submit" />
        </div>
      </form>
    </>
  );
}
