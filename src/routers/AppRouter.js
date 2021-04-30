import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const AppRouter = () => {

    const { checking, uid } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return <h5>Espere...</h5>
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={!!uid} exact path="/login" component={LoginScreen} />
                    <PrivateRoute isAuthenticated={!!uid} exact path="/" component={CalendarScreen} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>

    )
}
