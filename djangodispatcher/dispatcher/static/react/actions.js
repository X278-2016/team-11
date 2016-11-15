export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export function fetchCurrentUser(){
    return function (dispatch){
        return $.get('/api/currentuser', function(result){
            dispatch(getDataUpdater(result))
        }.bind(this));
    }
}

export function getDataUpdater(data){
    return { type:GET_CURRENT_USER, data }
}

export function fetchCurrentUserTasks(){
    return function (dispatch){
        return $.get('/api/activetasks', function(result){
            dispatch(getDataUpdater(result))
        }.bind(this));
    }
}

export function fetchCompletedUserTasks(){
    return function (dispatch){
        return $.get('/api/completedtasks', function(result){
            dispatch(getDataUpdater(result))
        }.bind(this));
    }
}
