import { Checkbox, ConfigProvider } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useStore } from 'effector-react';
import { $filters, $typesProducts, changeFilters } from 'entities/product/model/store';
import './filter.css'

const CheckboxGroup = Checkbox.Group;

export const Filter = () => {
    const typesProducts = useStore($typesProducts)
    const filters = useStore($filters)

    const checkAll = typesProducts.length === filters.length;
    const indeterminate = filters.length > 0 && filters.length < typesProducts.length;

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        changeFilters(e.target.checked ? typesProducts.map((el) => el.type_product) : []);
    };

  return (
    <div className='filters__container'>
        <ConfigProvider theme={{
            token: {
                colorBgContainer: 'rgb(255, 200, 228)',
                colorBorder: 'black',
                colorPrimary: 'rgb(169, 48, 110)',
            }
        }}>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                {checkAll ? 'Убрать все': 'Выбрать все'}
            </Checkbox>
            <CheckboxGroup 
                options={typesProducts.map((el) => el.type_product)} 
                value={filters} 
                onChange={changeFilters} 
            />
        </ConfigProvider>
    </div>
  );
};

