import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import theme from '../theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/router';
import { Header } from '../components/Header';
import { Menu } from '../components/Request/Menu';
import { Filter } from '../components/Request/Filter';
import { GroupRequest } from '../components/Request/GroupRequest';
import { PersonalRequest } from '../components/Request/PersonalRequest';
import { useDispatch, useSelector } from 'react-redux';
import { load_group_requests } from '../actions/groupChatRequest/groupChatRequest';
import { load_personal_requests } from '../actions/personalChatRequest/personalChatRequest';
import { CustomButton } from '../components/Request/CustomButton';
import { KakaoLink } from '../components/Request/KakaoLink';
import Image from 'next/image';
import { noInfoCharacter } from '../image/request';

const showRequests = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const groupChatRequests = useSelector(state => state.groupChatRequest.requests);
    const personalChatRequests = useSelector(state => state.personalChatRequest.requests);

    const senderName = useRef('');
    const link = useRef('');
    const [linkOn, setLinkOn] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState('전체');
    const filterOptions = ['전체', '여럿이서 먹어요', '둘이 먹어요'];

    const noInfoMessage = useMemo(() => {
        return ['아직 받은 신청이 없어요', '아직 보낸 신청이 없어요', '아직 확정 내역이 없어요'];
    }, [])

    const receiveRequests = useMemo(() => {
        const groupRequests = selectedFilter === '둘이 먹어요' ? [] : (groupChatRequests?.receive_requests || []);
        const personalRequests = selectedFilter === '여럿이서 먹어요' ? [] : (personalChatRequests?.receive_requests || []);
        return [...groupRequests, ...personalRequests].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA;
        });
    }, [groupChatRequests, personalChatRequests, selectedFilter]);

    const sendRequests = useMemo(() => {
        const groupRequests = selectedFilter === '둘이 먹어요' ? [] : (groupChatRequests?.send_requests || []);
        const personalRequests = selectedFilter === '여럿이서 먹어요' ? [] : (personalChatRequests?.send_requests || []);
        return [...groupRequests, ...personalRequests].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA;
        });
    }, [groupChatRequests, personalChatRequests, selectedFilter]);

    const confirmedRequests = useMemo(() => {
        const groupRequests = selectedFilter === '둘이 먹어요' ? [] : (groupChatRequests?.confirmed_requests || []);
        const personalRequests = selectedFilter === '여럿이서 먹어요' ? [] : (personalChatRequests?.confirmed_requests || []);
        return [...groupRequests, ...personalRequests].sort((a, b) => {
            const dateA = new Date(a.confirmed_at);
            const dateB = new Date(b.confirmed_at);
            return dateB - dateA;
        });
    }, [groupChatRequests, personalChatRequests, selectedFilter]);

    const allRequests = useMemo(() => {
        return [receiveRequests, sendRequests, confirmedRequests];
    }, [receiveRequests, sendRequests, confirmedRequests]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(load_group_requests());
            dispatch(load_personal_requests());
        }
    }, [isAuthenticated])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title="신청 현황" handleBack={() => router.push('/')} />
            <Menu selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            <div style={{ margin: '145px 24px 24px'}}>
                <Filter
                    filterOptions={filterOptions}
                    selectedFilter={selectedFilter}
                    number={allRequests[selectedIndex].length}
                    onFilterSelect={(filter) => setSelectedFilter(filter)}
                />
                {allRequests[selectedIndex].length === 0 && (
                    <div style={{ width: '100%', marginTop: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Image src={noInfoCharacter} width={104} height={87} layout='fixed' />
                        <p style={{ textAlign: 'center', margin: '15px 0', color: '#BABABA', fontSize: '16px', fontWeight: 700, lineHeight: '18px' }}>
                            {noInfoMessage[selectedIndex]}
                        </p>
                    </div>
                )}
                {allRequests[selectedIndex].map((request, index) => (
                    <div key={index}>
                        {request.gender ?
                        <PersonalRequest request={request} />
                        : <GroupRequest request={request} />}
                        <CustomButton
                            selectedIndex={selectedIndex}
                            request={request}
                            senderName={senderName}
                            link={link}
                            setLinkOn={setLinkOn}
                        />
                    </div>
                ))}
            </div>
            {linkOn && <KakaoLink senderName={senderName} link={link} setLinkOn={setLinkOn} />}
        </ThemeProvider>
    )
}

export default showRequests;
