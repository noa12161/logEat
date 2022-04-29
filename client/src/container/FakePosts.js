// 포스트 필드
// 1. 제목
// 2. 내용
// 3. 사진
// 4. 태그
// 5. 작성자 정보:
//     1. 작성자 _id
//     2. 작성자 이름

export const fakePosts = [
  {
    title: '아침에 먹은 밥',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dolorum, aut nam repudiandae earum consequuntur.',
    image:
      'https://www.google.co.kr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    tags: ['태그1', '태그2'],
    user: {
      username: 'david',
      _id: 'asdaccasad24224',
    },
  },
  {
    title: '어제 먹은 밥입니다.',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dolorum, aut nam repudiandae earum consequuntur.',
    image:
      'https://www.google.co.kr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    tags: ['태그1', '태그2'],
    user: {
      username: 'jasmin',
      _id: 'f145a6sf4sda56f',
    },
  },
  {
    title: '오늘은 가볍게 먹었어요.',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dolorum, aut nam repudiandae earum consequuntur.',
    image:
      'https://www.google.co.kr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    tags: ['태그1', '태그2'],
    user: {
      username: 'esther',
      _id: 'ad4as5d4asd2as53as1c',
    },
  },
];
