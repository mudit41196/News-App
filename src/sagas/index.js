import {call, put, takeLatest} from 'redux-saga/effects';
import{
    FETCH_NEWS
} from '../actions/news';

import {getArticles} from '../services/news';

const apiconfig={
    type: FETCH_NEWS,
    apiFn: getArticles,
};

function *middlewareSaga(config,params){
    try{
        const response=yield call(config.apiFn, params);
        if(response)
            {   
                yield put({type: `${config.type}_SUCCESS`, data: response});
                
            }
        }
    catch(ex) {
        yield put({type:`${config.type}_FAILED`, message: ex.message});
    }
}


function *sagas(){
    yield takeLatest(FETCH_NEWS, middlewareSaga,apiconfig)
}

export default sagas;