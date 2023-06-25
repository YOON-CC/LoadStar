import React, { useState, Component } from "react";
import "./board_post.css";
import store from "../../store";
import axios from 'axios';



const Board_post = () => {
    
    //유저 아이디
    const userId = localStorage.getItem('user_Id');

    //토큰 받기
    const access_token = localStorage.getItem('access-token');
    const cookieString  = document.cookie.match('(^|;)\\s*' + 'X-REFRESH-TOKEN' + '\\s*=\\s*([^;]+)').pop();
    const prefix = 'X-REFRESH-TOKEN=';
    const extractedValue = cookieString.substring(cookieString.indexOf(prefix) + prefix.length);
    const endIndex = extractedValue.indexOf("%");
    const refresh_token = extractedValue.slice(0, endIndex);


    //그래프 보여주기 체크
    const [showgraph, setShowgraph] = useState('');
    console.log("그래프 보여주기 여부",showgraph)

    //게시물 종류(참고글 or 질문글)
    const [posttype, setPosttype] = useState('');
    console.log("게시글 종류",posttype)
    
    //제목
    const [title, setTitle] = useState(''); 
    const handletitleChange = (event) => { 
        setTitle(event.target.value)
    };

    //내용
    const [content, setContent] = useState(''); 
    const handlecontentChange = (event) => { 
        setContent(event.target.value)
    };

    
    
    //해시테그
    const [h1, setH1] = useState(0);
    const [h2, setH2] = useState(0);
    const [h3, setH3] = useState(0);
    const [h4, setH4] = useState(0);
    const [h5, setH5] = useState(0);
    const [h6, setH6] = useState(0);
    const [h7, setH7] = useState(0);
    const [h8, setH8] = useState(0);
    const [h9, setH9] = useState(0);
    const [h10, setH10] = useState(0);

    const [cs1, setCs1] = useState(0);
    const [cs2, setCs2] = useState(0);
    const [cs3, setCs3] = useState(0);
    const [cs4, setCs4] = useState(0);
    const [cs5, setCs5] = useState(0);
    const [cs6, setCs6] = useState(0);
    const [cs7, setCs7] = useState(0);

    const [e1, setE1] = useState(0);
    const [e2, setE2] = useState(0);

    const allTags = [
        h1, h2, h3, h4, h5, h6, h7, h8, h9, h10,
        cs1, cs2, cs3, cs4, cs5, cs6, cs7,
        e1, e2
      ].filter(tag => tag !== 0);


    console.log("유저아이디:", userId, "토큰:",access_token,refresh_token)
    console.log("title:", title, "content:",content)
    console.log("showgraph:", showgraph, "qna:",posttype)
    console.log("hashtag:", allTags)


    //api 연결
    const handlepostSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post("http://13.125.16.222/boards/new", {
                userId : userId,
                title : title,
                showGraph : showgraph,
                qna : posttype,
                hashtags : allTags,
                content : content,
            }, 
            {
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });

            //요청 성공
            if (response.status === 200) {
                store.dispatch({type:"AFTER_LOGIN"});
                console.log("성공")
            }
        }
        catch (error) {

        }
    }
    
    return (
        <div className="board_post_container">
            <h2>게시글 작성</h2>
            <form onSubmit={handlepostSubmit}>
                <div className="board_post_container_title">
                    <input type="text" onChange={handletitleChange}></input>
                    <label>제목</label>
                </div>

                <div className="board_post_container_check">

                    <div className="board_post_container_check_1">
                        <div className="board_post_container_check_1_title">show your graph?</div>
                        <div className="board_post_container_check_1_title_container">
                            <div className ="show_or_not_graph_container" onClick={() => setShowgraph("y")}>
                                {(showgraph === "n" || showgraph === '') && <div className ="show_or_not_graph_container_default">YES</div>}
                                {showgraph === "y" && <div className ="show_or_not_graph_container_check">YES</div>}
                            </div>
                            <div className ="show_or_not_graph_container" onClick={() => setShowgraph("n")}>
                                {(showgraph === "y" || showgraph === '') && <div className ="show_or_not_graph_container_default">NO</div>}
                                {showgraph === "n" && <div className ="show_or_not_graph_container_check">NO</div>}
                            </div>
                        </div>
                    </div>

                    <div className="board_post_container_check_2">
                        <div className="board_post_container_check_2_title">what is the post type?</div>
                        <div className="board_post_container_check_1_title_container">
                            <div className ="show_or_not_graph_container" onClick={() => setPosttype("y")}>
                                {(posttype === "n" || posttype === '') && <div className ="show_or_not_graph_container_default">참고글</div>}
                                {posttype === "y" && <div className ="show_or_not_graph_container_check">참고글</div>}
                            </div>  
                            <div className ="show_or_not_graph_container" onClick={() => setPosttype("n")}>
                                {(posttype === "y" || posttype === '') && <div className ="show_or_not_graph_container_default">질문글</div>}
                                {posttype === "n" && <div className ="show_or_not_graph_container_check">질문글</div>}
                            </div>
                        </div>
                    </div>
                    <div className="board_post_container_check_3">
                        <div className="board_post_container_check_3_hashtag">
                            {/* 언어 */}
                            {h1 === 0 && <div className="none_click_tag" onClick={() => setH1("html")}>html</div>}
                            {h1 !== 0 && <div className="click_tag" onClick={() => setH1(0)}>html</div>}

                            {h2 === 0 && <div className="none_click_tag" onClick={() => setH2("css")}>css</div>}
                            {h2 !== 0 && <div className="click_tag" onClick={() => setH2(0)}>css</div>}

                            {h3 === 0 && <div className="none_click_tag" onClick={() => setH3("javascript")}>javascript</div>}
                            {h3 !== 0 && <div className="click_tag" onClick={() => setH3(0)}>javascript</div>}

                            {h4 === 0 && <div className="none_click_tag" onClick={() => setH4("javascript")}>typescript</div>}
                            {h4 !== 0 && <div className="click_tag" onClick={() => setH4(0)}>typescript</div>}

                            {h5 === 0 && <div className="none_click_tag" onClick={() => setH5("react")}>react</div>}
                            {h5 !== 0 && <div className="click_tag" onClick={() => setH5(0)}>react</div>}

                            {h6 === 0 && <div className="none_click_tag" onClick={() => setH6("java")}>java</div>}
                            {h6 !== 0 && <div className="click_tag" onClick={() => setH6(0)}>java</div>}

                            {h7 === 0 && <div className="none_click_tag" onClick={() => setH7("python")}>python</div>}
                            {h7 !== 0 && <div className="click_tag" onClick={() => setH7(0)}>python</div>}

                            {h8 === 0 && <div className="none_click_tag" onClick={() => setH8("spring")}>spring</div>}
                            {h8 !== 0 && <div className="click_tag" onClick={() => setH8(0)}>spring</div>}

                            {h9 === 0 && <div className="none_click_tag" onClick={() => setH9("springboot")}>springboot</div>}
                            {h9 !== 0 && <div className="click_tag" onClick={() => setH9(0)}>springboot</div>}

                            {h10 === 0 && <div className="none_click_tag" onClick={() => setH10("node.js")}>node.js</div>}
                            {h10 !== 0 && <div className="click_tag" onClick={() => setH10(0)}>node.js</div>}
                            {/* CS */}
                            {cs1 === 0 && <div className="none_click_tag" onClick={() => setCs1("운영체제")}>운영체제</div>}
                            {cs1 !== 0 && <div className="click_tag" onClick={() => setCs1(0)}>운영체제</div>}

                            {cs2 === 0 && <div className="none_click_tag" onClick={() => setCs2("네트워크")}>네트워크</div>}
                            {cs2 !== 0 && <div className="click_tag" onClick={() => setCs2(0)}>네트워크</div>}
                            
                            {cs3 === 0 && <div className="none_click_tag" onClick={() => setCs3("자료구조")}>자료구조</div>}
                            {cs3 !== 0 && <div className="click_tag" onClick={() => setCs3(0)}>자료구조</div>}

                            {cs4 === 0 && <div className="none_click_tag" onClick={() => setCs4("컴퓨터구조")}>컴퓨터구조</div>}
                            {cs4 !== 0 && <div className="click_tag" onClick={() => setCs4(0)}>컴퓨터구조</div>}

                            {cs5 === 0 && <div className="none_click_tag" onClick={() => setCs5("알고리즘")}>알고리즘</div>}
                            {cs5 !== 0 && <div className="click_tag" onClick={() => setCs5(0)}>알고리즘</div>}

                            {cs6 === 0 && <div className="none_click_tag" onClick={() => setCs6("데이터베이스")}>데이터베이스</div>}
                            {cs6 !== 0 && <div className="click_tag" onClick={() => setCs6(0)}>데이터베이스</div>}

                            {cs7 === 0 && <div className="none_click_tag" onClick={() => setCs7("컴파일러")}>컴파일러</div>}
                            {cs7 !== 0 && <div className="click_tag" onClick={() => setCs7(0)}>컴파일러</div>}
                            {/* 기타 */}
                            {e1 === 0 && <div className="none_click_tag" onClick={() => setE1("부트캠프")}>부트캠프</div>}
                            {e1 !== 0 && <div className="click_tag" onClick={() => setE1(0)}>부트캠프</div>}

                            {e2 === 0 && <div className="none_click_tag" onClick={() => setE2("개발외주")}>개발외주</div>}
                            {e2 !== 0 && <div className="click_tag" onClick={() => setE2(0)}>개발외주</div>}
                        </div>
                    </div>
                </div>


                <div className="board_post_container_detail">
                    <div>내용</div>
                    <input type="text" onChange={handlecontentChange}></input>

                </div>

                <div className="board_post_container_button">
                    <button className="board_post_container_button_post">게시글 post</button>
                    
                    <div className="board_post_container_button_cancel" onClick={function(){
                        store.dispatch({type:"AFTER_LOGIN"});
                    }.bind(this)}>취소</div>
                </div>   

            </form>
        </div>
    )
    
}

export default Board_post;