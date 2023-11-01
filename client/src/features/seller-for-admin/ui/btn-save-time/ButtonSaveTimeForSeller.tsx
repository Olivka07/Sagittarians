import { FormInstance } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import React, { FC, useEffect, useState } from 'react';
import { Button } from 'shared/ui/button';


interface ButtonSaveTimeForSellerProps {
    onClick: () => void
    form: FormInstance
}
const ButtonSaveTimeForSeller:FC<ButtonSaveTimeForSellerProps> = ({onClick, form}) => {
    const [disabled, setDisabled] = useState(false)
    const values = useWatch([], form)

    useEffect(() => {
        if (values)
        form.validateFields({validateOnly: true}).then(
            () => {
              setDisabled(false)
            },
            () => {
              setDisabled(true)
            },
          );
    }, [values])
    return (
        <Button
            className='btn-for-save-timeset'
            disabled={disabled}
            onClick={onClick}
            text='Сохранить'
        />
    );
};

export default ButtonSaveTimeForSeller;