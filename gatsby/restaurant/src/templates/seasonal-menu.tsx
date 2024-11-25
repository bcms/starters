import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { SeasonalMenuPageContent } from '../types';
import { Seasons } from '../components/seasonal-menu-page/Seasons';

export interface SeasonalMenuTemplateProps {
    pageContext: SeasonalMenuPageContent;
}

const SeasonalMenuTemplate: React.FC<SeasonalMenuTemplateProps> = ({
    pageContext: { seasons, foodItems, bcms },
}) => {
    return (
        <PageWrapper title={`Seasonal Menu - Tastyyy`}>
            <Seasons
                seasons={seasons}
                foodItems={foodItems}
                bcmsConfig={bcms}
            />
        </PageWrapper>
    );
};

export default SeasonalMenuTemplate;
