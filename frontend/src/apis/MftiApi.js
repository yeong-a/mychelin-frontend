const getQTemp = () => {
    let data = {
        "data": [
            {
                "topic": "신 맛",
                "questions": [
                    {
                        "question": "나는 평소에 신 음식을",
                        "options": [
                            "자주 먹어😀 음식에 적당한 산미는 꼭 필요하다고! 감칠맛 살리기엔 필수야.",
                            "그다지 좋아하지 않아.🙄 약간 이가 시린 것 같기도 하고... 사실 없어도 된다고 생각해."
                        ]
                    },
                    {
                        "question":"나는 키위나 레몬 자두처럼 상큼한 과일을",
                        "options": [
                            "좋아해! 새콤한 비타민이 가득한 맛😋 그리고 그런 과일을 다 에이드로 먹으면 또 얼마나 맛있게요.",
                            "키위는 셔! 키위는 셔!🥝 이가 살살 녹는 산성...😑✋ 수박이나 딸기처럼 단맛이 강한 과일이 더 좋아",
                            "나는 상큼하지 않다고 해도 과일을 별로 좋아하지 않아"
                        ]
                    }
                ]
            },
            {
                "topic": "단 맛",
                "questions": [
                    {
                        "question": "나는 달콤한 음식을 좋아한다.",
                        "options": [
                            "달콤한 음료도 달콤한 음식도 대환영! 단맛이 강한 고르곤졸라 피자나 떡볶이는 최고야!",
                            "나는 디저트라면 모를까 음식이 달콤한 건 크게 끌리지 않는 것 같아.. 약간의 단 맛이면 모를까 단맛 보다 짠맛이 더 강해야 한다고 생각해! 특히 연근조림 같은 거 별로야..."
                        ]
                    },
                    {
                        "question": "나는 디저트를",
                        "options": [
                            "좋아하고 즐겨 먹어. 카페에 가면 음료만 시키남? 케이크나 쿠키는 당연히 세트 아니겠어?",
                            "가끔 먹긴 하는데 맨날 생각나지는 않아.. 당이 떨어질 때 정도? 누가 사주면 먹고 아니면 말고~",
                            "별로 안 좋아해... 디저트 만들 때 설탕이 얼마나 많이 들어가는데!!"
                        ]
                    }
                ]
            },
            {
                "topic": "짠 맛",
                "questions": [
                    {
                        "question": "평소 주변 사람들로부터 짜게 먹는다는 말을 많이 듣는다.",
                        "options": [
                            "안 그래도 나는 얼마 전에 먹은 음식 간이 싱겁다고 생각했는데 다른 사람들은 다 괜찮다고 하더라고..😅 그리고 평소에 밑반찬, 젓갈이나 장아찌 등을 자주 먹기도 해!",
                            "짜게 먹는다는 말을 들은 건 아니지만 그렇다고 싱겁게 먹는 것도 아닌 것 같아.",
                            "나는 짜게 먹는다는 얘기를 들어본 적이 없어.. 샐러드드레싱도 올리브유 + 와인 식초 + 후추면 충분하다고!"
                        ]
                    },
                    {
                        "question": "음식은 뭐니뭐니해도 간이 알맞은 것이 가장 중요하다고 생각한다.",
                        "options": [
                            "맞아. 너무 싱겁게 먹느니 적당히 짠 음식이 훨씬 즐겁게 먹을 수 있어.",
                            "음식에 따라 다르지 않을까? 물론 적당한 간은 필요하다고 생각해.",
                            "굳이 간을 하지 않아도 재료가 싱싱하면 맛있던데? 담백하게 먹는 게 더 좋아!"
                        ]
                    },
                    {
                        "question": "음식은 재료 본연의 맛이 살아있어야 한다고 생각한다.",
                        "options": [
                            "맞아! 모든 재료가 직접 느껴져야 음식이 더 맛있지. (짠맛 -)",
                            "아니야. 조리를 통한 변형이 있더라도 아주 맛있게 섭취할 수 있어. (짠맛 +)"
                        ]
                    }
                ]
            },
            {
                "topic": "기름진 맛...?",
                "questions": [
                    {
                        "question": "나는 튀긴 음식, 삼겹살, 갈비 등 지방이 많은 음식은 ...",
                        "options": [
                            "최고의 음식이라고 생각해. 위에 기름칠 좀 해줘야 머리도 잘 돌아가지. 언제 먹어도",
                            "먹을 땐 아무 생각 없이 맛있게 먹지만 먹고 나면 조금 후회하기를 반복해(그렇지만 인간은 같은 실수를 반복...)",
                            "속이 느글거려서 별로 좋아하지 않아.. 누가 사주면 모를까 내 돈 주고 사 먹진 않아!"
                        ]
                    },
                    {
                        "question": "패스트푸드(피자, 치킨, 햄버거 등)를 ",
                        "options": [
                            "자주 먹어! 그리고 메뉴가 얼마나 다양한데? 솔직히 맨날 햄버거 먹는다 해도 다 다른 햄버거로 일주일 내내도 먹을 수 있어",
                            "생각날 때 먹어! 집에서 튀기는 치킨은 가게만 못하니까 사 먹는 수밖에 없는걸?",
                            "흠..🤔 누가 사 오지 않는 이상 먹고 싶다고 내 돈 내고 사 먹은 적은 없는 것 같아."
                        ]
                    }
                ]
            }
        ]
    }
    return data
}

const MftiApi = {
    getQTemp
}

export default MftiApi