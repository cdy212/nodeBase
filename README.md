#why? node	vs	thread program									
IO 작업에 대하여 비동기 처리를 기반으로 하며 단일 스레드 기반 이벤트 루프를 통하여 처리 한다.											
성능이 탁월하다는 의미는 대부분의 리소스 소모에 비중이 IO 작업에서 발생하여 비동기로 처리가 완료되기 응답을 보내며											
muily thread 방식의 io 처리에서 발생하는 context switch 작업의 오버해드가 발생 하지 않아 성능이 탁월하다											
허나 단일 스레드 방식이라 잘못된 코드로 개발 시 서버 자체가 다운되고 추적하기 어려울 수 있으며 무거운 비즈니스를 사용하는 어플리케이션에는 적합하지 않다.											
비동기 io 작업 중 오류가 발생하면 계속된 호출로 인하여 메모리 누수가 발생하여 문제가 된다.											
callback 함수로 처리되는 부분에 대한 동기 처리 시 코드의 복잡성을 띌수 있으나 지금은 await 함수 재공으로 해당 문제는 해결된 상태이다.											


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
    - session saved on redis
    - session change to jwt





# 참조
best practices
https://blog.ull.im/engineering/2019/03/31/node-js-production-best-practices.html
