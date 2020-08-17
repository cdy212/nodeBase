# pm2 

1. 무중단 - https://m.blog.naver.com/sssang97/221982629467
pm2-prod.config.js
wait_ready:true,
kill_timeout:5000,

## TODO
2. 자동배포 - https://blog.rhostem.com/posts/2018-05-27-pm2-deploy


# spec 
- express
framework - express vs koa vs fastify vs hapi - check most popular.
- view - ejs

# Basic setting
1. basic setting
    cd server
    npm init
    cd..
    express --view=ejs server
    cd server
    npm start

    commit template 적용 
    git config --global commit.template ~/Documents/instagram/git-commit-template.txt

2. 리팩토링 폴더 구조 셋팅
    - client : view 분리 할 경우 화면 소스
    - server
        - bin/www : 최초 호출 인입점
        
        - app.js : 서버 상세 스팩
        - api/v1 .. : 레스트 방식 폴더
        - routes : mvc 패턴 라우터

        - middlewate : util 및 전역 컴포넌트
        - public : 스태틱 파일

3. 고도화.
    - node 코딩 가이드 : https://github.com/goldbergyoni/nodebestpractices/blob/master/README.korean.md
    - 라이브러리 트렌드 비교 : https://www.npmtrends.com/  


    - 코드 품질 정책
    eslint 적용 : .eslintrc.json , airbnb 문법 - tslint 버전업 안함
    visual studio
   https://noooop.tistory.com/entry/VS-Code%EC%97%90%EC%84%9C-ESLint-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-1-%EA%B8%B0%EB%B3%B8-%EC%84%A4%EC%A0%95

    - error trace 정책 
        - 에러를 Express 미들웨어에서 처리하지 말고 한군데에서 집중적으로 처리해라
        - Document API errors using Swagger or GraphQL


    - 폴더 및 파일 생성 정책

    - vaidation 정책
    

4. authentification






# 참조
best practices
https://blog.ull.im/engineering/2019/03/31/node-js-production-best-practices.html
