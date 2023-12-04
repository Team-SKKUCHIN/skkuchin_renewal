import { useRef } from "react";
import {
    figure1,
    figure2,
    figure3,
    figure4,
    figure5,
    figure6,
    figure7,
    figure8,
} from "../image/event";

export const eventQuestions = [
    {
        questionId: 0,
        question: [
            '다음 빈칸에 들어갈 말은?',
            '\“야 _ _ _ 떡볶이 먹으러 가자\”',
        ],
        choices: [
            { text: "이명학", response: 0 },
            { text: "이명준", response: 1 },
            { text: "이명근", response: 2 },
            { text: "이명희", response: 3 },
        ],
        type: 0,
    },
    {
        questionId: 1,
        question: [
            '다음 중 혜화에 있는',
            '칼국수 집이 아닌 곳은?',
        ],
        choices: [
            { text: "명륜손칼국수", response: 0 },
            { text: "성균관칼국수", response: 1 },
            { text: "혜화칼국수", response: 2 },
            { text: "일송칼국수", response: 3 },
        ],
        type: 0,
    },
    {
        questionId: 2,
        question: [
            '유튜브 ‘또간집 혜화 편’에',
            '출연하지 않은 곳은?',
        ],
        choices: [
            { text: "오이지", response: 0 },
            { text: "이유식당", response: 1 },
            { text: "성균관감자탕", response: 2 },
            { text: "혜화도담", response: 3 },
        ],
        type: 0,
    },
    {
        questionId: 3,
        question: [
            '다음 중 쪽문에 있는',
            '음식점이 아닌 곳은?',
        ],
        choices: [
            { text: "벅벅", response: 0 },
            { text: "저팔계식당", response: 1 },
            { text: "마미스치킨", response: 2 },
            { text: "또오리", response: 3 },
        ],
        type: 0,
    },
    {
        questionId: 4,
        question: ['지금은 사라진, 추억의 식당은?'],
        choices: [
            { text: "삼삼오오", response: 0 },
            { text: "포차야", response: 1 },
            { text: "소친친", response: 2 },
            { text: "화로상회", response: 3 },
        ],
        type: 1,
    },
    {
        questionId: 5,
        question: [
            '다음 빈칸에 들어갈 말은?',
            '\“마님은 왜 돌쇠에게만 _을 주시나\”',
        ],
        choices: [
            { text: "떡", response: 0 },
            { text: "밥", response: 1 },
            { text: "술", response: 2 },
            { text: "콩", response: 3 },
        ],
        type: 1,
    },
    {
        questionId: 6,
        question: [
            '다음 빈칸에 들어갈 말은?',
            '\“역시 근본있는 떡볶이는',
            '@@@ 떡볶이지!\”',
        ],
        choices: [
            { text: "나눔 떡볶이", response: 0 },
            { text: "나누리 떡볶이", response: 1 },
            { text: "나누미 떡볶이", response: 2 },
            { text: "나눔이 떡볶이", response: 3 },
        ],
        type: 1,
    },
    {
        questionId: 7,
        question: [
            '다음 빈칸에 가장 적합한 말은?',
            '\“우리 막걸리 마시러 _ _ _ 가자\"',
        ],
        choices: [
            { text: "금잔디", response: 0 },
            { text: "운동장", response: 1 },
            { text: "인문관 옥상", response: 2 },
            { text: "원형극장", response: 3 },
        ],
        type: 2,
    },
    {
        questionId: 8,
        question: [
            '경영관 금잔디 식당은 \‘볶음 우동\’',
            '메뉴가 유명하다. 그렇다면 금잔디',
            '식당의 전화번호는?',
        ],
        choices: [
            { text: "02-741-1924", response: 0 },
            { text: "02-741-1925", response: 1 },
            { text: "02-740-1926", response: 2 },
            { text: "02-740-1927", response: 3 },
        ],
        type: 2,
    },
    {
        questionId: 9,
        question: [
            '법학관 법고을 식당의 학식 가격은?',
            '(현재 기준)',
        ],
        choices: [
            { text: "5,000원", response: 0 },
            { text: "5,500원", response: 1 },
            { text: "6,000원", response: 2 },
            { text: "6,500원", response: 3 },
        ],
        type: 2,
    },
];

export const useResults = () => {
    const results = useRef([]);
  
    const addResult = (response) => {
      results.current.push(response);
    }
  
    const onResponse = (response) => {
      addResult(response);
    }
  
    const getResults = () => {
      return results.current;
    }
  
    return { onResponse, getResults };
}

export const eventResult = [
    {
        name: '성균관 암모나이트',
        tags: ['#대선배님_등장', '#학교를_지켜주셔서_감사합니다'],
        explains: [
            '조선시대에 어울리는 전설의 입맛을 가지고 있네요',
            '음식 분야만큼은 교수님들을 능가해요',
        ],
        figures: {
            '태조 이성계': figure1,
            '퇴계 이황': figure2,
        },
    },
    {
        name: '성균관 유생',
        tags: ['#전통', '#기개', '#지조', '#선비'],
        explains: [
            '몇 학번인지 의심될만큼 빠삭하시네요!',
            '눈 감고도 혜화 지도를 술술 그릴 수 있는 수준이에요',
        ],
        figures: {
            '송중기': figure3,
            '명륜이 율전이': figure4,
        },
    },
    {
        name: '헌내기',
        tags: ['#고학번', '#고인물'],
        explains: [
            '‘학교 좀 다녔다~’ 라고 자랑할 수 있어요',
            '혜화 맛집은 제가 다 꿰고 있어요!',
        ],
        figures: {
            '신예은': figure5,
            '차은우': figure6,
        }
    },
    {
        name: '새내기',
        tags: ['#신입생', '#편입생', '#자퇴생'],
        explains: [
            '학교에 온 지 얼마 안 돼서 아직 잘 몰라요!',
            '선배님들 밥약 해주세요!',
        ],
        figures: {
            '박스꾸': figure7,
            '김꾸친': figure8,
        }
    },
];

export const eventPercentage = [
    97, 93, 77, 65, 55, 38, 33, 28, 24, 18, 10,
];

export const eventAnswers = [
    2, 1, 0, 3, 3, 2, 2, 0, 3, 0,
]