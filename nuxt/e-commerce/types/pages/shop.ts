export interface ProductFilter {
    type: 'category' | 'brand' | 'gender' | 'price' | 'popularity';
    label: string;
    value: string | number;
    active: boolean;
}
