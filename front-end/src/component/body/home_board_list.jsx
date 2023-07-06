import React, { useState, useEffect } from 'react';
import "./home_board_list.css";
import Home_header from '../header/home_header';
import axios from 'axios';
import store from "../../store";
import { Link } from 'react-router-dom';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';


const Home_board_list = () => {

    //해시테그 보기
    const [show, setShow] = useState(false);

    //해시테그의 적용 또는 초기화
    const [board_type, setBoard_type] = useState(true);

    //해시테그
    const [tag_type_1, setTag_type_1] = useState(0);

    const [tag_user_1, setTag_user_1] = useState(0);
    const [tag_user_2, setTag_user_2] = useState(0);
    const [tag_user_3, setTag_user_3] = useState(0);
    const [tag_user_4, setTag_user_4] = useState(0);
    const [tag_user_5, setTag_user_5] = useState(0);
    const [tag_user_6, setTag_user_6] = useState(0);

    const [tag_p_1, setTag_p_1] = useState(0);
    const [tag_p_2, setTag_p_2] = useState(0);
    const [tag_p_3, setTag_p_3] = useState(0);
    const [tag_p_4, setTag_p_4] = useState(0);
    const [tag_p_5, setTag_p_5] = useState(0);
    const [tag_p_6, setTag_p_6] = useState(0);
    const [tag_p_7, setTag_p_7] = useState(0);
    const [tag_p_8, setTag_p_8] = useState(0);
    const [tag_p_9, setTag_p_9] = useState(0);
    const [tag_p_10, setTag_p_10] = useState(0);
    
    const [tag_cs_1, setTag_cs_1] = useState(0);
    const [tag_cs_2, setTag_cs_2] = useState(0);
    const [tag_cs_3, setTag_cs_3] = useState(0);
    const [tag_cs_4, setTag_cs_4] = useState(0);
    const [tag_cs_5, setTag_cs_5] = useState(0);
    const [tag_cs_6, setTag_cs_6] = useState(0);
    const [tag_cs_7, setTag_cs_7] = useState(0);

    const [tag_etc_1, setTag_etc_1] = useState(0);
    const [tag_etc_2, setTag_etc_2] = useState(0);

    const allTags = [
        tag_type_1, tag_user_1, tag_user_2, tag_user_3, tag_user_4, tag_user_5,
        tag_user_6, tag_p_1, tag_p_2, tag_p_3, tag_p_4, tag_p_5, tag_p_6, tag_p_7,
        tag_p_8, tag_p_9, tag_p_10, tag_cs_1, tag_cs_2, tag_cs_3, tag_cs_4, tag_cs_5,
        tag_cs_6, tag_cs_7, tag_etc_1, tag_etc_2
    ].filter(tag => tag !== 0);

    //전체글의 경우
    const tag_all = null;
    if (allTags.length === 0) {
        allTags.push(tag_all);
    } else {
        const index = allTags.indexOf(tag_all);
        if (index !== -1) {
            allTags.splice(index, 1);
        }
    }
    //적용하기
    const handlehashtagboard = () => { 
        setBoard_type(!board_type)
        setShow(!show);
        setPage(0); 
        setBoard_data([])
    };

    //초기화
    const handledefaultboard = () => { 
        setBoard_type(!board_type)
        setShow(!show);
        setPage(0); 
        setBoard_data([])

        setTag_type_1(0);
        setTag_user_1(0);
        setTag_user_2(0);
        setTag_user_3(0);
        setTag_user_4(0);
        setTag_user_5(0);
        setTag_user_6(0);

        setTag_p_1(0);
        setTag_p_2(0);
        setTag_p_3(0);
        setTag_p_4(0);
        setTag_p_5(0);
        setTag_p_6(0);
        setTag_p_7(0);
        setTag_p_8(0);
        setTag_p_9(0);
        setTag_p_10(0);

        setTag_cs_1(0);
        setTag_cs_2(0);
        setTag_cs_3(0);
        setTag_cs_4(0);
        setTag_cs_5(0);
        setTag_cs_6(0);
        setTag_cs_7(0);

        setTag_etc_1(0);
        setTag_etc_2(0);
        // console.log(board_type)
    };

    //페이지 받기작업
    const [page, setPage] = useState(0);
    const [divElements, setDivElements] = useState([]);

    //서버에서 받은 데이터 
    const [board_data, setBoard_data] = useState([]);

    //헤시태그 고르기 버튼 들어가기

    const hashtag_Show = () => {
        // console.log(board_data[0][0])
        setShow(!show);
    };
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@--차트 받아옴--@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    useEffect(() => {
        const handleBoardInfo = async () => {
            const hashtagsQuery = allTags.join(",");
            try {
            const response = await axios.get("http://13.125.16.222/boards", {
                params: {
                    page: page,
                    hashtags:hashtagsQuery
                },
                headers: {
                "Content-Type": "application/json"
                }
            });
        
            if (response.status === 200) {
                console.log(response.data)
                //튜플로 합치기 (boardId, 그래프 보여주기, Q&A여부 ,제목, 해시테그)
                const combinedArray = response.data.map(item => [item.boardId, item.careerImage, item.title, item.hashtags, item.arr]);                
                
                setBoard_data(prevTitle => {
                    const existingIds = prevTitle.map(item => item[0]);
                    const newItems = combinedArray.filter(item => !existingIds.includes(item[0]));
                    return [...prevTitle, ...newItems];
                });
                console.log(board_data)
            }
            } catch (error) {
            // 에러 처리
            }
        };
        
        handleBoardInfo();

    }, [board_type, page]);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = document.documentElement.scrollHeight - window.innerHeight - 100; // 스크롤 위치 임계값

            if (scrollPosition > scrollThreshold) {
            setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    useEffect(() => {
        const updatedDivElements = [];
        for (let i = 0; i < board_data.length; i++) {
            const title = board_data[i][2];
            const hash_tag = board_data[i][3];
            const board_Id = board_data[i][0];
            const chartData = board_data[i][4];
            console.log(chartData)
            //그 그래프 없으면,, 있으면,, 조건 이렇게 
            if (chartData.length === 0) {continue};
            //https://apexcharts.com/javascript-chart-demos/timeline-charts/basic/
            //https://apexcharts.com/docs/react-charts/
            // const chartData = [
            //     { x: '알고리즘', y: [1654009200000, 1675177200000], rangeName: '2v5q1yh8' },
            //     { x: '알고리즘', y: [1680274800000, 1688137200000], rangeName: 'e0va4tu5' },
            //     { x: 'CS', y: [1680274800000, 1685545200000], rangeName: 'cxtc10kwf' },
            //   ];    
            
            const options = {
                chart: {
                    height: 350,
                    type: 'rangeBar',
                    zoom: {
                        enabled: false,
                      },
                      toolbar: {
                        show: false, // 햄버거 바 숨기기
                      },
                },
                plotOptions: {
                    bar: {
                      horizontal: true,
                      barHeight: 10,
                      borderRadius: 2,
                    },
                  },
                  xaxis: {
                    type: 'datetime',
                    labels: {
                        style: {
                          colors: '#ffffff', // 원하는 글자색 지정
                        },
                      },
                      axisBorder: {
                        show: false, // 세로 축 선 색상 지정
                      },
                    
                  },
                  yaxis: {

                    show: false,
                  },
                  colors: ['#ffffff'],
              };
              
            const series = [
                {
                    data : chartData,
                }
              ]
          

            updatedDivElements.push(
                <Link to={`/board/${board_Id}`} key={board_Id}>
                    <div className="board-list" onClick={() => localStorage.setItem('board_Id', board_Id)}>
                        <div className="board-list_c1">

                            <div className="board-list_c1_img">
                                {/* <img className="home_header_body_1_graph_img" src="image/그래프_사진.png" alt="그래프 사진" /> */}
                                {/*여기에 차트 표시*/}
                                <Chart className="chanchan" options={options} series={series} type="rangeBar" height = "140" width="250"/>
                            </div>

                            <div className="board-list_c1_tag"></div>
                        </div>
                        <div className="board-list_c2">{title}</div>
                        {hash_tag && hash_tag.length === 1 && (
                        <div className="board-list_c3">
                            <div className="board-list_c3_tag">{hash_tag[0]}</div>
                        </div>
                        )}
                        {hash_tag && hash_tag.length > 1 && (
                        <div className="board-list_c3">
                            <div className="board-list_c3_tag">{hash_tag[0]}</div>
                            <div className="board-list_c3_tag">{hash_tag[1]}</div>
                            <div className="board-list_c3_tag_end">...</div>
                        </div>
                        )}
                    </div>
                </Link>
            );
        }
        
        setDivElements(updatedDivElements);
    },[board_data]);

    return (
        <div>
        <Home_header></Home_header>
        <div className="home_board_list_body">
        <form>
            <div className="home_hashtag_body">
                <div className="home_hashtag_container">
                    <div className="hashtag" onClick={hashtag_Show}>해시태그 고르기</div>
                </div>
            </div>
        </form>
        {show && (
            <div className="home_hashtag_container_view">
                <div className="home_hashtag_container_view_container">
                    <div className="list_0_container">
                        <div className="hashtag_title">게시글 TYPE</div>
                        <div className="list_0">
                            {tag_type_1 === 0 && <div className="none_click_list_tag" onClick={() => setTag_type_1("질문글")}>질문글</div>}                            
                            {tag_type_1 !== 0 && <div className="click_list_tag" onClick={() => setTag_type_1(0)}>질문글</div>}
                        </div>
                    </div>
                    <div className="list_1_container">
                        <div className="hashtag_title">기본설정</div>
                        <div className="list_1">
                            {tag_user_1 === 0 && (<div className="none_click_list_tag" onClick={() => {setTag_user_1("전공자"); setTag_user_2(0);}}>전공자</div>)}
                            {tag_user_1 !== 0 && (<div className="click_list_tag" onClick={() => {if (tag_user_1 === "전공자") {setTag_user_1(0);} else {setTag_user_1("전공자"); setTag_user_2(0);}}}>전공자</div>)}

                            {tag_user_2 === 0 && (<div className="none_click_list_tag" onClick={() => {setTag_user_2("비전공자");setTag_user_1(0);}}>비전공자</div>)}
                            {tag_user_2 !== 0 && (<div className="click_list_tag" onClick={() => {if (tag_user_2 === "비전공자") {setTag_user_2(0);} else {setTag_user_2("비전공자");setTag_user_1(0);}}}>비전공자</div>)}

                            {tag_user_3 === 0 && (<div className="none_click_list_tag" onClick={() => { setTag_user_3("현직자");setTag_user_4(0);}}>현직자</div>)}
                            {tag_user_3 !== 0 && (<div className="click_list_tag" onClick={() => {if (tag_user_3 === "현직자") {setTag_user_3(0);} else {setTag_user_3("현직자");setTag_user_4(0);}}}>현직자</div>)}

                            {tag_user_4 === 0 && (<div className="none_click_list_tag" onClick={() => { setTag_user_4("비현직자");setTag_user_3(0);}}>비현직자</div>)}
                            {tag_user_4 !== 0 && (<div className="click_list_tag" onClick={() => {if (tag_user_4 === "비현직자") {setTag_user_4(0);} else {setTag_user_4("비현직자");setTag_user_3(0);}}}>비현직자</div>)}

                            {tag_user_5 === 0 && (<div className="none_click_list_tag" onClick={() => { setTag_user_5("프론트엔드");setTag_user_6(0);}}>프론트엔드</div>)}
                            {tag_user_5 !== 0 && (<div className="click_list_tag" onClick={() => {if (tag_user_5 === "프론트엔드") {setTag_user_5(0);} else {setTag_user_5("프론트엔드");setTag_user_6(0);}}}>프론트엔드</div>)}

                            {tag_user_6 === 0 && (<div className="none_click_list_tag" onClick={() => { setTag_user_6("백엔드");setTag_user_5(0);}}>백엔드</div>)}
                            {tag_user_6 !== 0 && (<div className="click_list_tag" onClick={() => {if (tag_user_6 === "백엔드") {setTag_user_6(0);} else {setTag_user_6("백엔드");setTag_user_5(0);}}}>백엔드</div>)}
                        </div>
                    </div>
                    <div className="list_2_container">
                        <div className="hashtag_title">프로그래밍 언어</div>
                        <div className="list_2">
                            {tag_p_1 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_1("html")}>html</div>}
                            {tag_p_1 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_1(0)}>html</div>}

                            {tag_p_2 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_2("css")}>css</div>}
                            {tag_p_2 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_2(0)}>css</div>}

                            {tag_p_3 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_3("javascript")}>javascript</div>}
                            {tag_p_3 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_3(0)}>javascript</div>}

                            {tag_p_4 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_4("typescript")}>typescript</div>}
                            {tag_p_4 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_4(0)}>typescript</div>}

                            {tag_p_5 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_5("react")}>react</div>}
                            {tag_p_5 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_5(0)}>react</div>}

                            {tag_p_6 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_6("java")}>java</div>}
                            {tag_p_6 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_6(0)}>java</div>}
                        </div>
                        <div className="list_2">
                            {tag_p_7 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_7("python")}>python</div>}
                            {tag_p_7 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_7(0)}>python</div>}
                            
                            {tag_p_8 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_8("spring")}>spring</div>}
                            {tag_p_8 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_8(0)}>spring</div>}

                            {tag_p_9 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_9("springboot")}>springboot</div>}
                            {tag_p_9 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_9(0)}>springboot</div>}

                            {tag_p_10 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_10("node.js")}>node.js</div>}
                            {tag_p_10 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_10(0)}>node.js</div>}
                        </div>
                    </div>
                    <div className="list_3_container">
                        <div className="hashtag_title">CS</div>
                        <div className="list_3">
                            {tag_cs_1 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_1("운영체제")}>운영체제</div>}
                            {tag_cs_1 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_1(0)}>운영체제</div>}

                            {tag_cs_2 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_2("네트워크")}>네트워크</div>}
                            {tag_cs_2 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_2(0)}>네트워크</div>}

                            {tag_cs_3 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_3("자료구조")}>자료구조</div>}
                            {tag_cs_3 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_3(0)}>자료구조</div>}

                            {tag_cs_4 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_4("컴퓨터구조")}>컴퓨터구조</div>}
                            {tag_cs_4 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_4(0)}>컴퓨터구조</div>}

                            {tag_cs_5 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_5("컴파일러")}>컴파일러</div>}
                            {tag_cs_5 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_5(0)}>컴파일러</div>}

                            {tag_cs_6 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_6("알고리즘")}>알고리즘</div>}
                            {tag_cs_6 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_6(0)}>알고리즘</div>}

                        </div>
                        <div className="list_3">
                            {tag_cs_7 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_7("데이터베이스")}>데이터베이스</div>}
                            {tag_cs_7 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_7(0)}>데이터베이스</div>}
                        </div>
                    </div>
                    <div className="list_4_container">
                        <div className="hashtag_title">활동</div>
                        <div className="list_4">
                            {tag_etc_1 === 0 && <div className="none_click_list_tag" onClick={() => setTag_etc_1("부트캠프")}>부트캠프</div>}
                            {tag_etc_1 !== 0 && <div className="click_list_tag" onClick={() => setTag_etc_1(0)}>부트캠프</div>}

                            {tag_etc_2 === 0 && <div className="none_click_list_tag" onClick={() => setTag_etc_2("개발외주")}>개발외주</div>}
                            {tag_etc_2 !== 0 && <div className="click_list_tag" onClick={() => setTag_etc_2(0)}>개발외주</div>}
                        </div>
                    </div>
                    <div className="hashtag_btn_container">
                        <div onClick={handlehashtagboard}>적용하기</div>
                        <div onClick={handledefaultboard}>초기화</div>
                        <div onClick={hashtag_Show}>취소</div>
                    </div>
                </div>
            </div>
        )}

            <div className="board-list-container">
                {divElements}
            </div>
        </div>
        </div>
    );
};

export default Home_board_list;