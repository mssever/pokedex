import 'bootstrap/dist/css/bootstrap.css'
import '../assets/App.scss';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from '../util/routes'

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                {routes.map(route => {
                    return (
                        <Route key={route.path} exact path={route.path}>
                            <route.func data={route.data} />
                        </Route>
                    )
                })}
            </Switch>
        </BrowserRouter>
    )
}
