import Image from "next/image";
import { mbtiDict } from "../../image/mbti/profile";

const KeywordComponent = ({keyword}) => (
    <div style={{ padding: '4px 12px 4px 12px', borderRadius: '24px',
        backgroundColor: '#F2F2F2', color: 'rgb(119, 119, 119)', marginRight: '4px'
    }}>
        {keyword}
    </div>
)

export const PersonalRequest = () => {
    const name = '김스옹';
    const campus = '명륜';
    const major = '경영학과';
    const studentId = '21';
    const gender = '여성';
    const mbti = 'ENTP';
    const keywords = ["스포츠", "양식"];
    const introduction = "개인 한줄 소개입니다"

    return (
        <div style={{ fontSize: '12px', lineHeight: '14px', width: '100%',
            padding: '15px 12px 15px 12px', display: 'flex', border: '1px solid rgb(226, 226, 226)',
            borderRadius: '18px', marginBottom: '15px'
        }}>
            <Image src={mbtiDict.ENTP} width={90} height={93} layout='fixed' style={{ justifyContent: 'left' }} />
            <div style={{ marginLeft: '15px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 700, display: 'flex' }}>
                    <span style={{ fontSize: '18px', fontWeight: 700, lineHeight: '20px' }}>
                        {name}
                    </span>
                    <div style={{ marginLeft: '8px', padding: '5px', textAlign: 'center',
                        borderRadius: '10px', backgroundColor: '#FFFCE4', color: 'rgb(255, 172, 11)'
                    }}>
                        {campus}
                    </div>
                </div>
                <div style={{ margin: '6px 0', color: 'rgb(119, 119, 119)' }}>
                    {major} / {studentId}학번 / {gender.charAt(0)}
                </div>
                <div style={{ display: 'flex' }}>
                    <KeywordComponent keyword={mbti} />
                    {keywords.map((keyword) => <KeywordComponent keyword={keyword} />)}
                </div>
                <p style={{ margin: 'auto 0 0', color: '#3C3C3C', fontWeight: 700 }}>
                    "{introduction}"
                </p>
            </div>
        </div>
    );
};

