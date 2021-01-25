import React, {useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {Button, DatePicker, Input, Select} from "antd";
import axios from 'axios';
import {FORMAT, URI} from "../../../api/v1";

export const Edit = () => {

    const location = useLocation();

    const history = useHistory();

    const { Option } = Select;

    const [name, setName] = useState(location.state.data.name);
    const [surname, setSurname] = useState(location.state.data.surname);
    const [patronymic, setPatronymic] = useState(location.state.data.patronymic);
    const [phone, setPhone] = useState(location.state.data.phone);
    const [email, setEmail] = useState(location.state.data.email);
    const [born, setBorn] = useState(location.state.data.born);
    const [group, setGroup] = useState(location.state.data.group);
    const [stage, setStage] = useState(location.state.data.stage);

    const editHandler = async () => {
        try {
            await axios.put(`${URI}/students/${location.state.data.id}.${FORMAT}`, {
                surname,
                name,
                patronymic,
                phone,
                email,
                born,
                group,
                stage
            });

            history.push('/');
        } catch (e) {
            console.log(e)
        }
    };

    const deleteStudent = async () => {
        try {
            await axios.delete(`${URI}/students/${location.state.data.id}.${FORMAT}`);

            history.push('/');
        } catch (e) {
            console.log(e)
        }
    };

    // const goBackHandler = () => {
    //     history.goBack();
    // };

    const validate =
        surname === '' ||
        name === '' ||
        patronymic === '' ||
        phone === '' ||
        email === '' ||
        born === '' ||
        group === '' ||
        stage === '';

    return (
        <div className={'Edit'}>
            <h1>Edit {surname + ' ' + name + ' ' + patronymic}</h1>

            {/*<Button type={'primary'} onCLick={goBackHandler}>Go back</Button>*/}

            <Input placeholder="set surname" value={surname} onChange={e => setSurname(e.target.value)} />
            <Input placeholder="set name" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="set patronymic" value={patronymic} onChange={e => setPatronymic(e.target.value)} />
            <Input placeholder="set phone" value={phone} type={'phone'} onChange={e => setPhone(e.target.value)} />
            <Input placeholder="set email" value={email} type={'email'} onChange={e => setEmail(e.target.value)} />
            <DatePicker placeholder="set born" onChange={(dateString) => setBorn(dateString)} />
            <Select placeholder={'set group'} value={group} onChange={(value) => setGroup(value)}>
                <Option value="191-321">191-321</Option>
                <Option value="191-322">191-322</Option>
                <Option value="191-323">191-323</Option>
                <Option value="191-324">191-324</Option>
            </Select>
            <Select placeholder={'set stage'} value={stage} onChange={(value) => setStage(value)}>
                <Option value="Web">Web</Option>
                <Option value="SAPR">SAPR</Option>
                <Option value="KES">KES</Option>
                <Option value="Big-Data">Big-Data</Option>
            </Select>

            {!validate ?
                <Button type={'primary'} onClick={editHandler}>Update student</Button> :
                <Button type={'primary'} disabled>Update student</Button>
            }

            <Button type={'danger'} onClick={deleteStudent}>Delete student</Button>
        </div>
    )
};