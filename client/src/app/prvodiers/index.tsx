import compose from 'compose-function'
import {withRouter} from './with-router'


export {RoutesApp} from './routes'
export const withProviders = compose(withRouter)