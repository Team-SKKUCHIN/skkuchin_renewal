import Image from "next/image";
import { backArrow, closeIcon } from "../image/recommend";

export const Header = ({ title, handleBack, handleClose, display="flex" }) => {

    return (
        <div
            style={{
                width: "100%",
                position: "fixed",
                left: 0,
                top: 0,
                display,
                justifyContent: 'center',
                zIndex: 10,
            }}
        >
            <div
                style={{
                    paddingTop: "15px",
                    backgroundColor: "#FFF",
                    height: "63px",
                    width: "100%",
                    maxWidth: "420px",
                    position: "relative",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {handleBack &&
                    <div style={{ position: 'absolute', left: 24 }}>
                        <Image
                            src={backArrow}
                            name='back'
                            onClick={handleBack}
                            layout='fixed'
                            width={24}
                            height={24}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                }
                <span
                    style={{
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 700,
                        letterSpacing: '-0.36px',
                    }}
                >
                    {title}
                </span>
                {handleClose &&
                    <div style={{ position: 'absolute', right: 24 }}>
                        <Image
                            src={closeIcon}
                            name='back'
                            onClick={handleClose}
                            layout='fixed'
                            width={24}
                            height={24}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                }
            </div>
        </div>
    );
};