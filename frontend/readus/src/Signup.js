import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    nickname: "",
    password: "",
    password_check: "",
    birth: "",
    hp: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.password_check) {
      setError("비밀번호를 다시 확인해 주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/v1/auth/signup", {
        email: form.email,
        username: form.username,
        nickname: form.nickname,
        password: form.password,
        password_check: form.password_check,
        birth: form.birth,
        hp: form.hp,
      });
      setSuccess("회원가입이 성공적으로 완료되었습니다.");
      setForm({
        email: "",
        username: "",
        nickname: "",
        password: "",
        password_check: "",
        birth: "",
        hp: "",
      });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "회원가입에 실패했습니다.");
      } else {
        setError("서버와 통신 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <label>
          이메일:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
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
          닉네임:
          <input
            type="text"
            name="nickname"
            value={form.nickname}
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
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$"
            title="8자 이상, 문자, 숫자, 특수문자 포함"
          />
        </label>
        <br />
        <label>
          비밀번호 확인:
          <input
            type="password"
            name="password_check"
            value={form.password_check}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          생년월일:
          <input
            type="date"
            name="birth"
            value={form.birth}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          연락처:
          <input
            type="tel"
            name="hp"
            value={form.hp}
            onChange={handleChange}
            placeholder="010-0000-0000"
            required
            pattern="^01([0|1|6|7|8|9])-?\d{3,4}-?\d{4}$"
            title="올바른 전화번호 형식으로 입력해주세요."
          />
        </label>
        <br />
        {error && (
          <div style={{ color: "red", marginTop: 10 }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ color: "green", marginTop: 10 }}>
            {success}
          </div>
        )}
        <button type="submit" style={{ marginTop: 15 }}>
          가입하기
        </button>
      </form>
    </div>
  );
}
