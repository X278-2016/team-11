export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export function fetchCurrentUser(){
    return function (dispatch){
        return $.get('/api/account', function(result){
        	console.log(result);
            dispatch(getDataUpdater(result))
        }.bind(this));
    }
}


export function getDataUpdater(data){
    return { type:GET_CURRENT_USER, data }
}