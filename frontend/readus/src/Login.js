import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
	
  const navigate = useNavigate(); 
  
  //로그인 폼 값 초기화
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  //에러 메세지, 성공 메세지 초기화
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //폼 입력이 변경될때마다 실행되는 함수
  const handleChange = (e) => {
    setForm({
      ...form, //기존 입력 폼 덮어쓰기
      [e.target.name]: e.target.value, //입력 값 변경 이벤트가 발생할때 마다 요소명에 변경된 값을 매핑해줌
    });
  };

  //로그인 버튼 클릭 시 값 전송 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/api/v1/auth/login", {
        username: form.username,
        password: form.password,
      });
      setSuccess("로그인 성공!");
      // 토큰 저장, 리다이렉트 등 추가 작업 가능
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "로그인 실패");
      } else {
        setError("서버와 통신 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
	<button
	  onClick={() => navigate("/signup")}
	  style={{ position: "absolute", top: 10, right: 10 }}
	>
	  회원가입
	</button>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <label>
          아이디:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        {error && (
          <div style={{ color: "red", marginTop: 10 }}>{error}</div>
        )}
        {success && (
          <div style={{ color: "green", marginTop: 10 }}>{success}</div>
        )}
        <button type="submit" style={{ marginTop: 15 }}>
          로그인
        </button>
      </form>
    </div>
  );
}
