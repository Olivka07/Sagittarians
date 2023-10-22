import {Input, Form, Upload, UploadFile, FormInstance} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react';
import { Button } from 'shared/ui/button';
import { UploadChangeParam } from 'antd/es/upload';
import './work_with_product.css'
import { useWatch } from 'antd/es/form/Form';

const {Item} = Form

type FieldType = {
    path_image_product?: string;
};

interface PictureInputProps {
    form?: FormInstance
}
export const PictureInput:FC<PictureInputProps> = ({form}) => {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const values = useWatch([], form)


    const changeFileList = ({file, fileList}:UploadChangeParam) => {
        setFileList(fileList)
    }

    const beforeUpload = () => {
        return false
    }

    return (
        <>
            <Item<FieldType>
                label="Фото товара"
                name="path_image_product"
            >
                <Upload
                    listType="picture"
                    maxCount={1}
                    fileList={fileList}
                    accept='.png,.jpg,.svg'
                    onChange={changeFileList}
                    beforeUpload={beforeUpload}
                >
                    <Button 
                        onClick={() => {}} 
                        text='Загрузить'
                    />
                </Upload>
                
            </Item>
            {values && values.path_image_product && typeof values.path_image_product === 'string'
              &&fileList.length === 0 && 
                <div id='imagehead' style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>  
                    <img 
                        style={{
                            maxWidth: '60px',
                            maxHeight: '60px',
                            display: 'block',
                            marginTop: '10px'
                        }} 
                        alt='dsa'
                        src={values.path_image_product}
                    />
                    <Button 
                        text='X' 
                        onClick={() => {
                            form!.setFieldValue('path_image_product', null)
                        }}
                        style={{
                            marginLeft: '10px',
                            fontSize: '10px',
                            backgroundColor: 'rgb(177, 29, 3)',
                            color: 'white',
                            fontWeight: 'bolder',
                            padding: '0px 10px'
                        }}
                    />
                </div>
            }
        </>
    );
};
