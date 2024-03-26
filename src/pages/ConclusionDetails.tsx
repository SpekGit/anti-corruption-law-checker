import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ModalError from '../components/modals/ModalError';
import ModalAcceptConclusion from '../components/modals/ModalAcceptConclusion';
import ModalDenyConclusion from '../components/modals/ModalDenyConclusion';
import ModalReviseConclusion from '../components/modals/ModalReviseConclusion';
import { fetchConclusionDetails, setLoading, setError } from '../redux/actions/conclusionActions';

const ConclusionEdit = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const conclusionId = Number(location.pathname.split('/').pop());

    // State for managing modal visibility
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showDenyModal, setShowDenyModal] = useState(false);
    const [showReviseModal, setShowReviseModal] = useState(false);

    const { currentUser } = useSelector(state => state.user);
    const { loading, error, conclusionData } = useSelector(state => state.conclusion);

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch(fetchConclusionDetails(conclusionId))
            .catch(err => {
                dispatch(setError(err.toString()));
            });
    }, [dispatch, conclusionId]);

    const handleAccept = useCallback(() => {
        // Accept conclusion logic here
        setShowAcceptModal(false);
    }, []);

    const handleDeny = useCallback(() => {
        // Deny conclusion logic here
        setShowDenyModal(false);
    }, []);

    const handleRevise = useCallback(() => {
        // Revise conclusion logic here
        setShowReviseModal(false);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <ModalError errorMessage={error} onClose={() => dispatch(setError(null))} />;

    return (
        <div>
            {conclusionData && (
                <>
                <h1>{t('conclusion_edit_title')}</h1>
                {/* Conditional rendering based on user role and conclusion status */}
                {currentUser.role === 'expert' && conclusionData.status === 'pending' && (
                    <button onClick={() => setShowAcceptModal(true)}>Accept Conclusion</button>
                )}
                {currentUser.role === 'expert' && conclusionData.status === 'pending' && (
                    <button onClick={() => setShowDenyModal(true)}>Deny Conclusion</button>
                )}
                {currentUser.role === 'coordinator' && conclusionData.status === 'review' && (
                    <button onClick={() => setShowReviseModal(true)}>Revise Conclusion</button>
                )}

                {/* Modals */}
                {showAcceptModal && (
                    <ModalAcceptConclusion onAccept={handleAccept} onClose={() => setShowAcceptModal(false)} />
                )}
                {showDenyModal && (
                    <ModalDenyConclusion onDeny={handleDeny} onClose={() => setShowDenyModal(false)} />
                )}
                {showReviseModal && (
                    <ModalReviseConclusion onRevise={handleRevise} onClose={() => setShowReviseModal(false)} />
                )}
                </>)}
        </div>
    );
};

export default ConclusionEdit;