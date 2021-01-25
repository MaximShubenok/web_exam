import React, {useState, useEffect} from 'react';
import {Button, DatePicker, Input, Select, Table} from "antd";
import {connect} from "react-redux";
import {renderStudents} from "../../../store/actions/studentsActions";
import axios from 'axios';
import {FORMAT, URI} from "../../../api/v1";
import getAge from 'get-age';
import {useHistory} from 'react-router-dom';

const Students = props => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [born, setBorn] = useState('');
    const [group, setGroup] = useState('191-321');
    const [stage, setStage] = useState('Web');

    const [term, setTerm] = useState('');

    const [showAdd, setShowAdd] = useState(false);

    const { Option } = Select;

    const history = useHistory();

    useEffect(() => {
        props.renderStudents();
        //Вшитая ошибка линта на реакт приложение, обращать внимание не стоит, монжо задисейблить
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.students]);

    const showAddHandler = () => {
      setShowAdd(!showAdd)
    };

    const editStudent = (id, data) => {
        history.push({
            pathname: `/edit/${id}`,
            state: {
                data
            }
        })
    };

    const addStudent = async () => {
      try {
          await axios.post(`${URI}/students.${FORMAT}`, {
              surname,
              name,
              patronymic,
              phone,
              email,
              born,
              group,
              stage
          });

          setName('');
          setSurname('');
          setPatronymic('');
          setPhone('');
          setEmail('');
          setBorn('');
          setGroup('');
          setStage('');

          setShowAdd(false)

      } catch (e) {
          console.log(e)
      }
    };

    const deleteStudent = async id => {
      try {
          await axios.delete(`${URI}/students/${id}.${FORMAT}`);
      } catch (e) {
          console.log(e)
      }
    };

    const searchHandler = term => {
        return function(x) {
            return x.surname.toLowerCase().includes(term.toLowerCase()) || !term
        }
    };

    const columns = [
        {
            title: 'Full name',
            dataIndex: 'surname',
            key: 'surname',
            sorter: (a, b) => a.surname.localeCompare(b.surname),
            defaultSortOrder: 'ascend',
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
                <p>{`${record.surname} ${record.name.charAt(0)}. ${record.patronymic.charAt(0)}.`}</p>
            )
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Age',
            dataIndex: 'born',
            key: 'born',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => getAge(a.born) - getAge(b.born),
            render: (text, record) => (
                <p>{getAge(record.born)}</p>
            )
        },
        {
            title: 'Group',
            dataIndex: 'group',
            key: 'group',
            filters: [
                {
                    text: '191-321',
                    value: '191-321',
                },
                {
                    text: '191-322',
                    value: '191-322',
                },
                {
                    text: '191-323',
                    value: '191-323',
                },
                {
                    text: '191-324',
                    value: '191-324',
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.group.indexOf(value) === 0,
        },
        {
            title: 'Stage',
            dataIndex: 'stage',
            key: 'stage',
            filters: [
                {
                    text: 'Web',
                    value: 'Web',
                },
                {
                    text: 'SAPR',
                    value: 'SAPR',
                },
                {
                    text: 'KES',
                    value: 'KES',
                },
                {
                    text: 'Big-Data',
                    value: 'Big-Data',
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.stage.indexOf(value) === 0,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div className={'actions-block'}>
                    <p style={{marginRight: '1rem'}} onClick={() => deleteStudent(record.id)}>Delete</p>
                    <p onClick={() => editStudent(record.id, record)}>Edit</p>
                </div>
            )
        }
    ];

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
        <div className={'Students'}>

            <h1>Students</h1>

            <Input placeholder={'search by surname'} onChange={e => setTerm(e.target.value)}/>

            {showAdd ?
                <div className={'Students__add'}>

                    <Button type={'primary'} onClick={showAddHandler}>Close add widget</Button>
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
                        <Button type={'primary'} onClick={addStudent}>Add new student</Button> :
                        <Button type={'primary'} disabled>Add new student</Button>
                    }

                </div> :
                <Button type={'primary'} style={{marginBottom: '1rem'}} onClick={showAddHandler}>Show add widget</Button>
            }

            <Table dataSource={props.students.filter(searchHandler(term))} columns={columns} />
        </div>
    )
};

function mapStateToProps(state) {
    return {
        students: state.studentsReducer.students
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderStudents: () => dispatch(renderStudents())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)