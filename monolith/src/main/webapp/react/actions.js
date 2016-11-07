export const GET_COMMITS = 'GET_COMMITS';

export function fetchCommitData(){
    return function (dispatch){
        return $.get('https://api.github.com/repos/X278-2016/team-11/commits?sha=daily/sam_hurd', function(result){
            dispatch(getDataUpdater(result))
        }.bind(this));
    }
}


export function getDataUpdater(data){
    return { type:GET_COMMITS, data }
}