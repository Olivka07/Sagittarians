import React, { useState } from 'react';
import './seller-for-admin.css'
import { ButtonTimetable } from 'features/seller-for-admin/ui/btn-timetable/ButtonTimetable';
import { ButtonToWork } from 'features/seller-for-admin/ui/btn-work-sellers/ButtonToWork';
import { WorkWithSellers } from './WorkWithSellers';
import { WorkWithTimetable } from './WorkWithTimetable';
import { useGate, useStore } from 'effector-react';
import { usersStore } from 'entities/users';
import { Spinner } from 'shared/ui/spinner';

export const SellerForAdmin = () => {
    useGate(usersStore.GateSellers)
    const [state, setState] = useState<'work' | 'timetable'>('timetable')
    const loading = useStore(usersStore.$loading)
    const sellers = useStore(usersStore.$sellers)
    const changeToWork = () => {
        setState('work')
    }
    const changeToTimetable = () => {
        setState('timetable')
    }
    return (
        <div className='seller-for-admin__container'>
            <div className='seller-for-admin__menu'>
                <ButtonTimetable onClick={changeToTimetable} state={state}/>
                <ButtonToWork onClick={changeToWork} state={state}/>
            </div>
            {loading && <Spinner/>}
            {   sellers &&
                <>
                    {   state === 'work' ? 
                        <WorkWithSellers sellers={sellers}/> :
                        <WorkWithTimetable sellers={sellers}/>
                    }
                </>
            }
        </div>
    );
};

