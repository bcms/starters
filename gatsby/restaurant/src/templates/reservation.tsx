import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { ReservationPageContent } from '../types';
import ReservationForm from '../components/reservation-page/Form';

export interface ReservationTemplateProps {
    pageContext: ReservationPageContent;
}

const ReservationTemplate: React.FC<ReservationTemplateProps> = ({
    pageContext: { meta },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Tastyyy`}>
            <div>
                <ReservationForm title={meta.title} />
            </div>
        </PageWrapper>
    );
};

export default ReservationTemplate;
