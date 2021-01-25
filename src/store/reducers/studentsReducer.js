import {RENDER_STUDENTS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    students: []
};

export default function studentsReducer(state = initialState, action) {
    switch (action.type) {

        case RENDER_STUDENTS_SUCCESS:
            return {
                ...state,
                students: action.students
            };
        default:
            return state
    }
}