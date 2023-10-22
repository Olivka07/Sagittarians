import { Suspense, ElementType } from "react";
import {Spinner} from '../spinner'
import { FullPageWrapper } from "../full-page-wrapper";

export function Loadable(Component: ElementType){
    return function fn(props: any){
        return (
            <Suspense
                fallback={
                    <FullPageWrapper>
                        <Spinner/>
                    </FullPageWrapper>
                }
            >
                <Component {...props}/>
            </Suspense>
        )
    }
}