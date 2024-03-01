import Image from "next/image";
import { arrowForward, groupImage } from "../../image/request";


const RequestComponent = () => {
    const groupName = "그룹명명"
    const gender = "여성";
 
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
            width: '100%', height: '129px', fontWeight: 700, fontSize: '12px', lineHeight: '14px'
        }}>
            <Image src={groupImage} width={50} height={50} layout='fixed' />
            <div style={{ display: 'flex', marginTop: '10px' }}>
                <div style={{ width: '69px', whiteSpace: 'pre-wrap', textAlign: 'right',
                    marginRight: '8px', fontSize: groupName.length > 4 ? 'inherit' : '18px',
                    lineHeight: groupName.length > 4 ? 'inherit' : '20px'
                }}>
                    {groupName}
                </div>
                <div style={{ width: '21px', height: '21px', borderRadius: '10px',
                    backgroundColor: gender === '여성' ? '#FFF4F9' : '#E8F9FF',
                    color: gender === '여성' ? 'rgb(250, 164, 195)' : 'rgb(131, 182, 242)',
                    textAlign: 'center', padding: '5px'
                }}>
                    {gender.charAt(0)}
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                <button style={{ color: 'rgb(158, 158, 158)', textDecorationLine: 'underline',
                    fontSize: '12px', fontWeight: 700, backgroundColor: 'transparent', 'border': 'none'
                }}>
                    상대 프로필 보기
                </button>
            </div>
        </div>
    );
}

export const GroupRequest = () => {
    return (
        <div style={{ width: '100%', padding: '20px', display: 'flex', border: '1px solid rgb(226, 226, 226)', borderRadius: '12px', marginBottom: '15px' }}>
            <RequestComponent />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto 24px' }}>
                <Image src={arrowForward} width={15.57} height={15.16} layout='fixed' />
            </div>
            <RequestComponent />
        </div>
    );
};
