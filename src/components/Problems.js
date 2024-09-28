import React, { useState, useEffect } from 'react';
import axios from 'axios';

import left from "../images/ic_left.svg";
import right from "../images/ic_right.svg";
import styles from '../css/Home.module.css';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript'); // 소문자로 변경
  const [difficulty, setDifficulty] = useState('easy'); // 기본 난이도

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/daily-problems');
        console.log('Fetched problems:', response.data); // 데이터 확인
        setProblems(response.data); // 전체 문제 데이터 설정
      } catch (error) {
        console.error('문제를 가져오는 데 오류가 발생했습니다:', error);
      }
    };

    fetchProblems();
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value.toLowerCase()); // 소문자로 변환
  };

  const renderProblems = () => {
    const languageProblems = problems[selectedLanguage]?.[difficulty] || []; // 소문자로 수정
    return languageProblems.map((problem) => (
      <tr key={problem.id}>
        <td>{problem.id}</td>
        <td>{problem.questionName}</td>
        <td>{selectedLanguage}</td>
      </tr>
    ));
  };

  return (
    <div className={styles.Problems}>
      <select name="languages" className="lang" onChange={handleLanguageChange} value={selectedLanguage}>
        <option value="javascript">javascript</option> 
        <option value="python">python</option> 
        <option value="java">java</option> 
      </select>
      <table>
        <thead>
          <tr>
            <th scope="col">순번</th>
            <th scope="col">제목</th>
            <th scope="col">언어</th>
          </tr>
        </thead>
        <tbody>
          {renderProblems()}
        </tbody>
      </table>
      <div className={styles.pages}>
        <div><img src={left} alt="이전 페이지" /></div>
        <div>1</div>
        <div><img src={right} alt="다음 페이지" /></div>
      </div>
    </div>
  );
}

export default Problems;
