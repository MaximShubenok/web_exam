import axios from 'axios';
import {FORMAT, URI} from "../../api/v1";
import {RENDER_STUDENTS_SUCCESS} from "./actionTypes";

export function renderStudents() {
    return async dispatch => {
        try {
            const response = await axios.get(`${URI}/students.${FORMAT}`);

            const data = Object.entries(response.data).map(item => {
                return {
                    ...item[1],
                    id: item[0],
                    key: item[0]
                }
            });

            dispatch(renderStudentsSuccess(data))
        } catch (e) {
            console.log(e)
        }
    }
}

export function renderStudentsSuccess(students) {
    return {
        type: RENDER_STUDENTS_SUCCESS,
        students
    }
}