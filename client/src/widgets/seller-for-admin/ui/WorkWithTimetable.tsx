import { Button, Col, Form, Row } from 'antd';
import {Button as Btn} from 'shared/ui/button'
import React, { FC, useEffect, useState} from 'react';
import { IUserDto } from 'shared/api/users/models';
import './seller-for-admin.css'
import { SellerInTimetable } from 'entities/users/ui/seller-in-timetable/SellerInTimetable';
import { useStore } from 'effector-react';
import { $ceils, $ceilsFromDb, $currentCeil, $currentSeller, $date_timetable, $loading, changeCeils, changeCurrentCeil, changeCurrentSeller, clearCeils, createCeils, fetchSaveTimetableFx, fetchTimetableFx } from '../model/timetable/store';
import DatePickerTimetable from 'features/seller-for-admin/ui/date-picker-timetable/DatePickerTimetable';
import { useForm } from 'antd/es/form/Form';
import { daysInMonth, weekDays } from '../lib';
import { ButtonSaveTimetable } from 'features/seller-for-admin/ui/btn-save-timetable/ButtonSaveTimetable';
import { ButtonClearTimetable } from 'features/seller-for-admin/ui/btn-clear-timetable/ButtonClearTimetable';
import { ICeil, ISellerDto } from 'shared/api/timetable/models';
import { useModal } from 'shared/lib/hooks/modal.hook';
import Message from 'shared/ui/message/Message';
import { Spinner } from 'shared/ui/spinner';


interface WorkWithTimetableProps {
    sellers: IUserDto[]
}

export const WorkWithTimetable:FC<WorkWithTimetableProps> = ({sellers}) => {

    const {modal, toggle} = useModal()
    // const [ceilsFromDb, setCeilsFromDb] = useState<ICeil[] | null>(null)
    const [compared, setCompared] = useState<boolean>(true)

    const ceilsFromDb = useStore($ceilsFromDb) 
    const currentCeil = useStore($currentCeil)
    const currentSeller = useStore($currentSeller)
    const ceils = useStore($ceils)
    const date_timetable = useStore($date_timetable)
    const loading = useStore($loading)

    const [formPickTimetable] = useForm()

    useEffect(() => {
        createCeils(null)
    }, [])

    // Устанавливаем после каждого сохранения или получения расписания из базы данных 
    // истинное значение (как в БД) расписания в переменную "ceilsFromDb"
    // const changeCeilsFromDbAfterFetch = (mapDateSellers: Map<number, ISellerDto[]>) => {
    //     let i = 1
    //     let key = false
    //     console.log(date_timetable, 'changeFromDb')
    //     const dayOfWeek = date_timetable!.getDay() === 0 ? 6: date_timetable!.getDay()-1
    //     const maxDays = daysInMonth(date_timetable!)
    //     const mas = new Array(42).fill('').map((el, index) => {
    //         if (index === dayOfWeek) {
    //             key = true
    //             return {
    //                 id: index,
    //                 sellers: [],
    //                 date: i++
    //             }
    //         } else if (key && i<=maxDays) {
    //             return {
    //                 id: index,
    //                 sellers: [],
    //                 date: i++
    //             }
    //         } else {
    //             return {
    //                 id: index, 
    //                 sellers: []
    //             }
    //         }
    //     })
    //     if (mas[35].date) {
    //         const mas1 = mas.map((el) => {
    //             if (el.date && mapDateSellers.get(el.date)) {
    //                 return {
    //                     ...el,
    //                     sellers: [...mapDateSellers.get(el.date)!]
    //                 }
    //             } else {
    //                 return el
    //             }
    //         })
    //         setCeilsFromDb(mas1 as ICeil[])
    //     }
    //     else {
    //         setCeilsFromDb(mas.slice(0, 35).map((el) => {
    //             if (el.date && mapDateSellers.get(el.date)) {
    //                 return {
    //                     ...el,
    //                     sellers: [...mapDateSellers.get(el.date)!]
    //                 }
    //             } else {
    //                 return el
    //             }
    //         }))
    //     }
    // }

    const fetchGetTimeTable = async() => {
        try {
            const masDate = date_timetable!.toLocaleDateString('tr-TR').split('.')
            const serverDate = `${masDate[1]}.${masDate[2]}`
            const mapDateSellers = await fetchTimetableFx(serverDate)
            // changeCeilsFromDbAfterFetch(mapDateSellers)
            // createCeils(date_timetable)
        } 
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (ceils && ceilsFromDb) {
            let key = true
            for (let i = 0; i<ceils.length; i++) {
                if (ceils[i].date) {
                    const ceilFromDb = ceilsFromDb.find((el) => {
                        if (el.date && el.date === ceils[i].date) {
                            return el
                        }
                    })
                    const sellers1 = ceils[i].sellers // То, что имеем на данный момент
                    const sellers2 = ceilFromDb!.sellers // То, что пришло с БД
                    if (sellers1.length !== sellers2.length) {
                        setCompared(false)
                        key = false
                        break;
                    }

                    sellers1.forEach((el) => {
                        const sellerFromSellers2 = sellers2.find((sel) => sel.id_user === el.id_user)

                        // Проверка на новых продавцов: заходит, если новый продавец
                        if (!sellerFromSellers2) {
                            setCompared(false)
                            key = false
                            return;
                        }

                        // Проверка на изменение времени начала или окончания рабочего дня: заходит, если изменилось
                        if (sellerFromSellers2 && (sellerFromSellers2.timeStart !== el.timeStart || 
                                            sellerFromSellers2.timeEnd !== el.timeEnd)) {
                            setCompared(false)
                            key = false
                            return
                        }
                    })

                    
                    sellers2.forEach((el) => {
                        const sellerFromSellers1 = sellers1.find((sel) => sel.id_user === el.id_user)
                        // Проверка на удалённых продавцов: заходит, если были удалены
                        if (!sellerFromSellers1) {
                            setCompared(false)
                            key = false
                            return
                        }
                    })
                }
            }
            if (key) {
                setCompared(true)
            }
        }
    }, [ceils,ceilsFromDb])

    useEffect(() => {
        try {
            if (date_timetable) {
                fetchGetTimeTable()
                // console.log('setseilsfromdbnull')
                // setCeilsFromDb(null)
            }
        } catch(e) {
            console.log(e)
        }
        
    }, [date_timetable])

    const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>, ceil?:ICeil) => {
        if (ceil && !ceil.date) {
            return
        }
        if (ceil?.sellers && ceil.sellers.find(el => el.id_user === currentSeller?.id_user)) {
            return
        }
        e.preventDefault()
    } 

    const onDropHandler = (e:React.DragEvent, seller: ISellerDto, ceil?: ICeil) => {
        e.preventDefault()
        if (ceil) {
            if (currentCeil && currentSeller) {
                const currentIndex = currentCeil.sellers.indexOf(currentSeller)
                currentCeil.sellers.splice(currentIndex, 1)
            } 
            const dropIndex = ceil.sellers.indexOf(seller)
            ceil.sellers.splice(dropIndex+1, 0, currentSeller!)
            changeCeils(ceils!.map((c) => {
                if (currentCeil && c.id === currentCeil.id) {
                    return currentCeil
                }
                if (ceil.id === c.id) {
                    return ceil
                }
                return c
            }))
        } else if (currentCeil){
            const currentIndex = currentCeil!.sellers.indexOf(currentSeller!)
            currentCeil!.sellers.splice(currentIndex, 1)
            changeCeils(ceils!.map((sel) => {
                if (sel && sel.id === currentCeil!.id) {
                    return currentCeil!
                }
                return sel
            }))
        }
        changeCurrentCeil(null)
        changeCurrentSeller(null)
    }

    const saveTimetable = async() => {
        try {
            if (ceils && ceilsFromDb) {
                const masNewSellers:Map<number, ISellerDto[]> = new Map()
                const masUpdateSellers:Map<number, ISellerDto[]> = new Map()
                const masDeleteSellers:Map<number, ISellerDto[]> = new Map()
                for (let i = 0; i<ceils.length; i++) {
                    if (ceils[i].date) {
                        const ceilFromDb = ceilsFromDb.find((el) => {
                            if (el.date && el.date === ceils[i].date) {
                                return el
                            }
                        })
                        const sellers1 = ceils[i].sellers // То, что имеем на данный момент
                        const sellers2 = ceilFromDb!.sellers // То, что пришло с БД
    
                        sellers1.forEach((el) => {
                            const sellerFromSellers2 = sellers2.find((sel) => sel.id_user === el.id_user)
    
                            // Проверка на новых продавцов: заходит, если новый продавец
                            if (!sellerFromSellers2) {
                                const v = masNewSellers.get(ceils[i].date!)
                                if (v) {
                                    masNewSellers.set(ceils[i].date!, [el, ...v])
                                } else {
                                    masNewSellers.set(ceils[i].date!, [el])
                                }
                            }
    
                            // Проверка на изменение времени начала или окончания рабочего дня: заходит, если изменилось
                            if (sellerFromSellers2 && (sellerFromSellers2.timeStart !== el.timeStart || 
                                                sellerFromSellers2.timeEnd !== el.timeEnd)) {
                                const v = masUpdateSellers.get(ceils[i].date!)
                                if (v) {
                                    masUpdateSellers.set(ceils[i].date!, [el, ...v])
                                } else {
                                    masUpdateSellers.set(ceils[i].date!, [el])
                                }
                            }
                        })
    
                        
                        sellers2.forEach((el) => {
                            const sellerFromSellers1 = sellers1.find((sel) => sel.id_user === el.id_user)
                            // Проверка на удалённых продавцов: заходит, если были удалены
                            if (!sellerFromSellers1) {
                                const v = masDeleteSellers.get(ceils[i].date!)
                                if (v) {
                                    masDeleteSellers.set(ceils[i].date!, [el, ...v])
                                } else {
                                    masDeleteSellers.set(ceils[i].date!, [el])
                                }
                            }
                        })
                    }
                }
                // Формируем из даты строку вида: MM.YYYY
                const masDate = date_timetable!.toLocaleDateString('tr-TR').split('.')
                const serverDate = `${masDate[1]}.${masDate[2]}`
                const mapDateSellers = await fetchSaveTimetableFx({
                    date_timetable: serverDate, 
                    mapsWithSellers:{
                        masDeleteSellers: Object.fromEntries(masDeleteSellers.entries()), 
                        masNewSellers: Object.fromEntries(masNewSellers.entries()), 
                        masUpdateSellers: Object.fromEntries(masUpdateSellers.entries()) 
                    }
                })
                // changeCeilsFromDbAfterFetch(mapDateSellers)
            }
            setCompared(true)
            const dateMas = date_timetable!.toLocaleDateString('tr-TR').split('.')
            const dateMonth = `${dateMas[1]}.${dateMas[2]}`
            toggle(`Новое расписание на ${dateMonth} успешно сохранено!`)
        } catch (e) {
            toggle(`Ошибка при сохранении расписания на ${date_timetable!.toLocaleDateString('tr-TR')}`)
        }
    }

    const clearAll = () => {
        clearCeils(date_timetable)
    }

    return (
        <div>
            {modal && <Message>{modal}</Message>}
            <Row className='timetable__featuresadmin'>
                <Col span={8}>
                    <Form form={formPickTimetable}>
                        <DatePickerTimetable form={formPickTimetable}/>
                    </Form>
                </Col>
                <Col span={8}>
                    <div className='timetable__warningsave'>{!compared?`💥Есть несохранённые изменения`:''}</div>
                </Col>
                <Col span={8}>
                    <Row>
                        <ButtonSaveTimetable disabled={compared} onClick={saveTimetable}/>
                        <ButtonClearTimetable onClick={clearAll}/>
                    </Row>
                </Col>
            </Row>
            {loading && <Spinner/>}
            <div className='timetable__container'>
                <div className='timetable__grid'>
                    {weekDays.map((weekday) => {
                        return (
                            <div key={weekday} className='timetable__weekday'>{weekday}</div>
                        )
                    })}
                    {ceils && ceils.map((ceil, index) => {
                        return (
                            <div className={`timetable__ceil ${ceil.date? '': 'timetable__ceil_noactive'}`}
                                key={ceil.id}
                                id={`${index}`}
                                onDragOver = {(e) => onDragOverHandler(e, ceil)}
                                onDrop={(e)=>onDropHandler(e,{} as IUserDto, ceil)}
                            >
                                {ceil.date && <div className='timetable__dateinceil'>{ceil.date}</div>}
                                {ceil.sellers.length>0 && ceil.sellers.map((seller) => {
                                    return (
                                        <SellerInTimetable
                                            key={seller.id_user+ceil.id+Date.now()}
                                            ceil={ceil}
                                            seller={seller}
                                            basket={false}
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>

                <div 
                    className='basket-sellers'
                    onDrop={(e)=>onDropHandler(e,{} as IUserDto)}
                    onDragOver={(e) => onDragOverHandler(e)}
                >
                    {sellers && sellers.map((seller) => {
                        return (
                            <SellerInTimetable
                                key={seller.id_user}
                                ceil={undefined}
                                seller={seller}
                                basket={true}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
};