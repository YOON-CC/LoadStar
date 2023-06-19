import React, { Component, useEffect, useState} from "react";
import "./home_board_list.css";
import Board_view from "../board/board_view";
import store from "../../store";


export default class Home_board_list extends Component{
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            view : false,
            show : false
        };
        
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            const newBoard = <div key={scrollPosition} className="board-list" onClick={this.board_View}>board {scrollPosition}</div>;
            this.setState(prevState => ({ boards: [...prevState.boards, newBoard] }));
        }
    };

    //게시물 보기
    board_View = () => {
        this.setState({ view: !this.state.view });
    };

    //헤시테그 카테고리 보기
    hashtag_Show = () => {
        this.setState({ show: !this.state.show });
    };

    
    render() { 
        const { boards } = this.state;

        const BoardRows = [];
        for (let i = 0; i < boards.length; i += 3) {
          const row = boards.slice(i, i + 3);
          const tempboard = <div key={i} className="board-row">{row}</div>;
          BoardRows.push(tempboard);
        }

        const default_count = 6;

        const divElements = [];
        for (let i = 0; i < default_count; i++) {
          divElements.push(
           <div key={i} className="board-list" onClick={this.board_View}>                        
                <div className="board-list_c1">
                    <div className="board-list_c1_img">
                        <img className="home_header_body_1_logo_img" src="image/그래프_사진.png"></img>
                        </div>
                    <div className="board-list_c1_tag"></div>
                </div>
                <div className="board-list_c2">프론트엔드가 꿈인 같이 성장하는..</div>
                <div className="board-list_c3">
                    <div className="board-list_c3_tag">전공자</div>
                    <div className="board-list_c3_tag">front-end</div>
                    <div className="board-list_c3_tag_end">...</div>
                </div>
            </div>);
        }

        // // 스크롤 이벤트 핸들러
        // function disableScroll() {
        //     // 현재 스크롤 위치를 저장

        //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        
        //     // 스크롤 위치를 고정시키고, body에 스크롤 위치를 반영
        //     document.body.style.overflow = 'hidden';
        //     // document.body.style.position = 'fixed';
        //     document.body.style.top = `-${scrollTop}px`;
        // }
        
        // // 스크롤 이벤트 핸들러 제거
        // function enableScroll() {
        //     const scrollTop = parseInt(document.body.style.top || '0', 10);
        
        //     // 고정된 스크롤 위치를 원래대로 되돌리고, body의 스크롤 스타일을 초기화
        //     document.body.style.overflow = '';
        //     // document.body.style.position = '';
        //     document.body.style.top = '';
        
        //     // 스크롤 위치를 원래대로 복원
        //     window.scrollTo(0, -scrollTop);
        // }
        

        
        return (
            
            <div className="home_board_list_body">
                {this.state.view  && <Board_view view={this.state.view} board_View={this.board_View}></Board_view>}
                {/* <button className = "b1" onClick={disableScroll}>적용</button> */}
                
                <div className="home_hashtag_body">
                    <div className="home_hashtag_container">
                        <div className="home_hashtag_container_c1">전체</div>
                        <div className="home_hashtag_container_c1">참고글</div>
                        <div className="home_hashtag_container_c1">질문글</div>
                        <div className="hashtag" onClick={this.hashtag_Show}>해시태그 고리기</div>
                    </div>
                </div>

                {this.state.show && 
                    <div className="home_hashtag_container_view">
                        <div className="home_hashtag_container_view_container">
                            <div className = "list_1_container">
                                <div className = "hashtag_title">기본설정</div>
                                <div className = "list_1">
                                    <div>전공자</div>
                                    <div>비전공자</div>
                                    <div>현직자</div>
                                    <div>비현직자</div>
                                    <div>프론트엔드</div>
                                    <div>백엔드</div>
                                </div>
                            </div>
                            <div className = "list_2_container">
                                <div className = "hashtag_title">프로그래밍 언어</div>
                                <div className = "list_2">
                                    <div>HTML</div>
                                    <div>CSS</div>
                                    <div>javascript</div>
                                    <div>Typescript</div>
                                    <div>node.js</div>
                                    <div>react</div>
                                </div>
                                <div className = "list_2">
                                    <div>redux</div>
                                    <div>next.js</div>
                                    <div>graphQL</div>
                                    <div>Python</div>
                                </div>
                            </div>
                            <div className = "list_3_container">
                                <div className = "hashtag_title">CS</div>
                                <div className = "list_3">
                                    <div>운영체제</div>
                                    <div>네트워크</div>
                                    <div>자료구조</div>
                                    <div>컴퓨터구조</div>
                                    <div>컴파일러</div>
                                    <div>알고리즘</div>
                                </div>
                                <div className = "list_3">
                                    <div>데이터베이스</div>
                                </div>
                            </div>
                            <div className = "list_4_container">
                                <div className = "hashtag_title">활동</div>
                                <div className = "list_4">
                                    <div>부트캠프</div>
                                    <div>개발외주</div>
                                </div>
                            </div>
                            <div className = "hashtag_btn_container">
                                <div>적용하기</div>
                                <div onClick={this.hashtag_Show}>취소</div>
                            </div>
                        </div>
                    </div>}

                <div className="board-list-container">
                    {divElements}
                    {BoardRows}
                </div>
                
            </div>
        )
    }
}