# 프로젝트 소개

- 프로젝트명: logEat
- 개요: 내가 먹은 음식들의 영양성분을 확인하고 날짜별로 내 리스트에 기록 하며<br>
  열량, 영양성분을 추적 할수있는 웹앱입니다. 그래프 기능을 추가함으로 효율적으로 현재 상황을 인지할수있고<br>
  다른 사람들과 식단공유를 할수있는 게시판을 구현했습니다.
- 배포 서비스는 heroku를 이용했습니다.
- 배포 링크: [logEat](https://logeat.herokuapp.com/) // 앱이 sleep모드일시 초반 로딩시간이 조금 걸릴수 있습니다.
- 반응형 웹으로 제작되었습니다.
- 공공데이터포털 오픈 API를 활용하여 만들었습니다.
- 간혹 공공데이터포털 내부서버 오류(500, 503)로 음식 검색이 안될때가 있습니다.

---

<br>
<br>

# 주요 사용 기술 스택

- ## Front-end
  - react
  - pure css
  - chart.js
  - date-picker
  - quill
  - RTK
  - RTK-Thunk
- ## Back-end
  - nodejs
  - express
  - mongoose
  - bcrypt
  - jsonwebtoken
  - multer
  - cloudinary
- ## DB
  - mongoDB

---

<br>
<br>

# 기능 설명

- ## 사용자 인증

  - 사용자의 비밀번호는 bycrypt로 암호화 하여 저장합니다.
  - 로그인시 jsonwebtoken이 쿠키에 저장됩니다.
  - 게시글을 삭제, 수정할때 jsonwebtoken을 이용하여 현재 사용자와 게시글 작성자를 검사합니다.

  <br>

- ## 사용자 설정

  - 초기 회원가입 할때 사용자 정보와 (**현재 몸무게**), (**일일 목표 섭취 열량**)을 정할수있습니다.
  - 몸무게는 날짜별로 기록할수있고 (**일일 목표 섭취 열량**)은 회원가입 후에 수정할수있습니다.

  <br>

- ## 날짜 선택

  - 상단 Header에서 선택한 날짜별로 기록한 내용이 저장됩니다.
  - datepicker를 이용해서 날짜를 선택을 구현했습니다.

  <br>

- ## 음식 검색,추가,삭제
  - ### 음식 검색
    - 공공데이터포털 api 사용
  - ### 음식 추가, 삭제 (**로그인시 사용 가능**)
    - 용량단위 (1회제공량, 1g) 를 선택후 용량을 입력하여 내 리스트에 추가
    - 내 리스트에 추가된 음식 삭제 가능

<br>

- ## 그래프 (**로그인시 사용 가능**)
  - 사이드바 그래프
    - 설정한 (**목표 일일 섭취 열량**)을 기반으로 계산됩니다.
    - 목표치와 그날 먹은 영양성분의 차이를 그래프로 보여줍니다
    - 그날 먹은 음식들의 영양성분 비율을 그래프로 보여줍니다.
  - 그래프 페이지
    - 선택한 날짜에 해당하는 월의 일일 섭취 열량을 그래프로 보여줍니다.
    - 사용자가 기록한 몸무게 변화 과정을 그래프로 보여줍니다.

<br>

- ## 게시글
  - 기본적인 CRUD 기능이 가능합니다.
  - 유저 이름 클릭시 해당 유저의 게시글을 조회합니다.
  - 태그 클릭시 해당 태그 관련 글을 조회합니다.
  - 이미지는 **cloudinary**에 저장됩니다.

# 버전별 업데이트 내용

- ## v1

  - 음식 검색 (공공데이터 포털 API사용)
  - 선택 음식 사용자 DB에 추가
  - 선택 음식 삭제
  - 사이드 그래프바
    - 설정 목표 열량 대비 영양성분 달성치
    - 영양성분 비율
  - 선택 날짜 해당 월 일일 열량 섭취량 그래프
  - 사용자 몸무게 변화 그래프

  ***

- ## v2

  - api 호출 함수 한곳에 정리
  - 토글 버튼 리덕스로 관리
  - 게시판 기능 추가
    - 글쓰기
      - quill 텍스트 에디터 사용
    - 삭제
    - 전체게시글 조회
    - 선택 태그 관련 게시글 조회
    - 선택 유저 게시글 조회
  - RTK-Thunk 적용
    - 음식 검색할때
    - 게시글 조회, 생성, 수정할떄

  ***

- ## v2.2

  - Log 관련 컴포넌트 분리
  - SideChart 관련 컴포넌트 분리
  - Loading 중일때 스피너 컴포넌트 추가

  ***

- ## v2.3 (오류, 시스템 개선)

  - ## 이미지 업로드 관련 오류

    - 1차 버전

      > 게시글 이미지를 base64형태로 변환후 string 타입으로 바로 DB에 저장하는 방식 사용<br><br>
      > -> 이미지 하나하나의 용량이 커서 게시글 조회할때 이미지가 포함 되어있다면 서버 클라이언트 통신 시간 지연이 상당함.

    - 2차 버전

      > multer 를 이용해 지정 디렉토리에 이미지를 저장<br><br>

      > -> 개발 환경에서는 지정 디렉토리에 이미지가 저장되지만 heroku에 배포후에는 업로드한 이미지 파일이 임시 Dyno 저장소에 저장되어 서버가 재부팅 될떄마다 저장한 이미지가 사라진다.

    - 3차 버전
      > cloudinary 라는 클라우드 저장소에 이미지를 저장하고 해당 이미지의 url을 DB에 저장하니 서버 용량 부담도 줄어들고 게시글 조회 속도가 대폭 개선 되었습니다.

  - ## 선택 날짜 해당 월 일일 열량 그래프 개선

    - 1차 버전
      > eg) <br> 2022. 4. 11. 선택했다고 가정.<br>
      > 서버에 2022. 4. 1 ~ 2022. 4. 30. 일에 대한 데이터 30번 요청후<br>
      > 결과를 리덕스 스토어에 저장
    - 2차 버전
      > 로그인한 사용자의 데이터를 참조하여 사용자의 데이터가 변할때만 계산후<br>
      > 리덕스 스토어에 저장<br>
      > -> 해당 기능을 위해 클라이언트와 서버간의 개별 통신이 필요하지않게됨

    <br>

---

- ## v2.4 (오류, 시스템 개선)

  - 게시글 작성할시에 tags에 한개 이상의 값을 추가할시 배열로 인식되어 formData에 append 할때<br> JSON.stringify(tags) 해서 append.

  - 게시글에 이미지가 있는 경우와 없는 경우를 나눠서 CRUD 구현.<br>
    eg)<br>

  ```javascript
  let result = null;
  // 이미지와 함께 업로드 할경우 값을 넣어줌
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path);
  }
  const newPost = await Post.create({
    ...form,
    image: result
      ? {
          imageUrl: result.secure_url,
          imageId: result.public_id,
        }
      : "",
    user: {
      _id: req.user._id,
      username: req.user.username,
    },
  });
  ```

  - 해결중...
    > - 공공데이터 포털 API에 의존하는 웹앱인만큼 공공데이터 포털의 API 신뢰성이 중요한데. 한두달에 한번씩
    >   게이트웨이 내부에러 500, 503이 발생할떄가 있습니다. 몇시간이 걸릴지 몇일이 걸릴지 몰라서
    >   임시방편으로 음식 검색후 서버 http코드 500 혹은 503을 응답받으면 alert로 사용자에게 알려주는 기능을 추가하였습니다.
    >   근본적인 해결 방법은 신뢰성이 높은 api를 적용하는건데 다른 국내 음식영양성분 관련 api는 음식의 정보량이 현저히 부족하고
    >   해외 api를 사용하자니 한국어 지원이 안되서 해결방법을 모색중입니다.

<br>
<br>

# 컴포넌트 구성

> **index.js**
>
> > **App.js**
> >
> > > - \<Routes>
> > >   > - **HomePage.js**
> > >   >   - **SideBar.js** (네비게이션 바)
> > >   >   - **Header.js** (날짜 선택, 로그인, 로그아웃, 회원가입)
> > >   >     > - \<Routes>
> > >   >     >   - **LogContainer.js** (음식 검색, 저장, 삭제)
> > >   >     >   - **ChartContainer.js** (선택 날짜 한달 일일 열량섭취량, 몸무게 변화 그래프)
> > >   >     >   - **PostPage.js** (게시글 페이지)
> > >   >     > - \<Routes>
> > >   >   - **SideChartCont.js** (일일 영양성분 달성치, 비율 그래프)
> > >   > - **LoginPage.js**
> > >   > - **RegisterPage.js**
> > > - \<Routes>
