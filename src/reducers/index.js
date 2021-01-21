import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import questionnairesReducer from './questionnairesReducer';
import userProfileReducer from './userProfileReducer';

export default combineReducers({
    profile: profileReducer,
    questionnaires: questionnairesReducer,
    userProfile: userProfileReducer
});