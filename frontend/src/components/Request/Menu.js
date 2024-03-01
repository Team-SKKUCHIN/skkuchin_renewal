export const Menu = ({ selectedIndex, setSelectedIndex }) => (
    <div style={{ width: '100%', height: '33px', display: 'flex', marginTop: '90px' }}>
        {['받은 신청', '보낸 신청', '확정 내역'].map((menu, index) => (
            <div
                style={{
                    width: '100%',
                    textAlign: 'center', 
                    color: index === selectedIndex ? '#3C3C3C' : '#BABABA',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '18px',
                    letterSpacing: '-2%',
                    cursor: 'pointer',
                    borderBottom: index === selectedIndex ? '2px solid rgb(255, 206, 0)' : '2px solid rgb(186, 186, 186)'
                }}
                onClick={() => setSelectedIndex(index)}
            >{menu}</div>
        ))}
    </div>
);
