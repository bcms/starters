import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { MenuPageContent } from '../types';
import MenuMeals from '../components/menu-page/Meals';

export interface MenuTemplateProps {
    pageContext: MenuPageContent;
}

const MenuTemplate: React.FC<MenuTemplateProps> = ({
    pageContext: { meta, foodItems, mealTypes, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Tastyyy`}>
            <MenuMeals
                meta={meta}
                meals={mealTypes}
                foodItems={foodItems}
                bcmsConfig={bcms}
            />
        </PageWrapper>
    );
};

export default MenuTemplate;
