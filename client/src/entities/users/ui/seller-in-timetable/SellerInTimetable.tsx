import React, { FC, useState } from 'react';
import { ModalWindow } from 'shared/ui/modal';
import { Form } from 'antd';
import { InputTimeIn } from 'features/seller-for-admin/ui/input-time/InputTimeIn';
import { InputTimeOut } from 'features/seller-for-admin/ui/input-time/InputTimeOut';
import { useForm } from 'antd/es/form/Form';
import ButtonSaveTimeForSeller from 'features/seller-for-admin/ui/btn-save-time/ButtonSaveTimeForSeller';
import { Button } from 'shared/ui/button';
import { $ceils, changeCeils, changeCurrentCeil, changeCurrentSeller } from 'widgets/seller-for-admin/model/timetable/store';
import { useStore } from 'effector-react';
import { ICeil, ISellerDto } from 'shared/api/timetable/models';

interface SellerInTimetableProps {
    seller: ISellerDto
    ceil: ICeil | undefined
    // changeCurrentCeil: (ceil: ICeil | null) => void
    // changeCurrentSeller: (seller: ISellerDto | null) => void
    basket: boolean
    // ceils?: Array<Array<ICeil>>
    // changeCeils?: (v:Array<Array<ICeil>>) => void
}
export const SellerInTimetable:FC<SellerInTimetableProps> = ({
    seller,
    ceil,
    // changeCurrentCeil,
    // changeCurrentSeller,
    basket,
    // ceils,
    // changeCeils
}) => {
    const [changeModal, setChangeModal] = useState(false)
    const [timeStr, setTimeStr] = useState<string | null>(null)
    const [form] = useForm()
    const ceils = useStore($ceils)

    const doubleClickOnSeller = (seller: ISellerDto) => {
        setChangeModal(prev => !prev)
        changeCurrentSeller(seller)
    }

    const saveTimeHandler = () => {
        changeCeils!(ceils!.map((c) => {
                if (c.id!==ceil!.id) {
                    return c
                }
                return {
                    ...c,
                    sellers: c.sellers.map((s) => {
                        if (s.id_user === seller.id_user) {
                            return {
                                ...s,
                                timeStart: form.getFieldValue('time_in'),
                                timeEnd: form.getFieldValue('time_out')
                            }
                        }
                        return s
                    })
                }
        }))
        changeCurrentSeller(null)
        setChangeModal(prev => !prev)
    }

    const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        setTimeStr(null)
        e.preventDefault()
    } 

    const onDragStartHandler = () => {
        if (ceil)
            changeCurrentCeil(ceil)
        else
            changeCurrentCeil(null)
        changeCurrentSeller(seller)
    }

    const mouseOverHandler = () => {
        if (!basket) {
            const start: string | number  = seller.timeStart || 'Пусто'
            const end: string | number = seller.timeEnd || 'Пусто'
            setTimeStr(`${start} - ${end}`)
        }
    }

    if (!basket)
        return (
            <div
                style={{position: 'relative'}}
            >
                <ModalWindow
                    buttons={[
                        <ButtonSaveTimeForSeller form={form} key={'savetime'} onClick={saveTimeHandler}/>,
                        <Button key={'canceltime'} onClick={() => setChangeModal(prev => !prev)} text={'Отменить'}/>
                    ]}
                    open={changeModal}
                    title='Установите время'
                    onCancel={() => setChangeModal(prev => !prev)}
                >
                    <Form form={form}>
                        <InputTimeIn time_in={seller.timeStart && seller.timeStart!=='Пусто'? seller.timeStart : ''}/>
                        <InputTimeOut time_out={seller.timeEnd && seller.timeEnd!=='Пусто'? seller.timeEnd : ''}/>
                    </Form>
                </ModalWindow>
                {timeStr && 
                    <div className='timetable__metatime'>
                        {timeStr}
                    </div>
                }
                <div
                    onMouseOver={mouseOverHandler}
                    onMouseLeave={() => setTimeStr(null)}
                    onDoubleClick={() => doubleClickOnSeller(seller)}
                    key={seller.id_user}
                    draggable={true}
                    onDragOver={(e) => onDragOverHandler(e)}
                    onDragStart={onDragStartHandler}
                    className={basket?'basket-sellers__ceil' : 'timetable__seller'}
                >
                    {seller.surname + ' ' + seller.name}
                </div>
            </div>
            
        );
        return (
            <>
                {/* <ModalWindow
                    buttons={[
                        <ButtonSaveTimeForSeller form={form} key={'savetime'} onClick={saveTimeHandler}/>,
                        <Button key={'canceltime'} onClick={() => setChangeModal(prev => !prev)} text={'Отменить'}/>
                    ]}
                    open={changeModal}
                    title='Установите время'
                    onCancel={() => setChangeModal(prev => !prev)}
                >
                    <Form form={form}>
                        <InputTimeIn/>
                        <InputTimeOut/>
                    </Form>
                </ModalWindow> */}
                {/* {timeStr && 
                    <div className='timetable__metatime'>
                        {timeStr}
                    </div>
                } */}
                <div
                    // onMouseOver={mouseOverHandler}
                    // onMouseLeave={() => setTimeStr(null)}
                    // onDoubleClick={() => doubleClickOnSeller(seller)}
                    key={seller.id_user}
                    draggable={true}
                    onDragOver={(e) => onDragOverHandler(e)}
                    onDragStart={onDragStartHandler}
                    className={basket?'basket-sellers__ceil' : 'timetable__seller'}
                >
                    {seller.surname + ' ' + seller.name}
                </div>
            </>
            
        );
};

