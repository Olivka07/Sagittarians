import {FC, createContext, useContext, PropsWithChildren} from 'react'
import {Form, FormInstance} from 'antd'


const EditableContext = createContext<FormInstance<any> | null>(null);
export const useDirectoryContext = () => useContext(EditableContext)

interface RowDirectoryProps {
    index: number
}

export const RowDirectoryContext:FC<RowDirectoryProps> = ({index,...props}) => {
    const [form] = Form.useForm()
    return (
        <Form key={Date.now() + 'form'} form={form} component={false}>
            <EditableContext.Provider
                value={form}
            >
                <tr
                    {...props}
                />
            </EditableContext.Provider>
        </Form>
    )
}
