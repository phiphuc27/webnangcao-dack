import React from 'react';
import { Spinner, Pagination, Table, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import useForm from 'react-hook-form';
// import { makeStyles } from '@material-ui/core/styles';

// import useForm from 'react-hook-form';

const Skill = ({
  isFetching,
  isFetched,
  skills,
  getSkill,
  pagination,
  newSkill,
  updateSkill,
  deleteSkill
}) => {
  const [newSkillModalShow, setNewSkillModalShow] = React.useState(false);
  const [updateSkillModalShow, setUpdateSkillModalShow] = React.useState(false);
  const [updateSkillText, setUpdateSkillText] = React.useState('');
  const [skillIndex, setSkillIndex] = React.useState(null);
  const [newSkillText, setNewSkillText] = React.useState('');

  const { register, handleSubmit } = useForm();
  var list = null;
  if (skills !== null && skills !== undefined) {
    // console.log(userList);
    list = skills.map((skill, index) => {
      return (
        <tr key={skill.ID}>
          <td>{index + 1}</td>
          <td>{skill.KYNANG}</td>
          <td>
            <i
              className="fas fa-edit skill-edit-btn"
              onClick={e => {
                setSkillIndex(skill.ID);
                setUpdateSkillModalShow(true);
              }}
            ></i>
            {'  '}
            <i
              className="far fa-trash-alt skill-delete-btn"
              onClick={e => {
                deleteSkill(skill.ID);
              }}
            ></i>
          </td>
        </tr>
      );
    });
  } else {
    if (!isFetching && !isFetched) {
      getSkill(0);
    }
  }

  // pagnition
  let paginationList = [];
  if (pagination) {
    let active = pagination.current + 1;
    for (let number = 1; number <= pagination.numPages; number++) {
      paginationList.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={e => {
            if (number === active) return;
            getSkill(number - 1);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }
  }

  const onSubmit = e => {
    //console.log(e);
    if (newSkillText === '') return;
    newSkill(newSkillText);
    setNewSkillModalShow(false);
  };

  const onSubmitUpdate = e => {
    //console.log(e);
    if (updateSkillText === '') return;
    updateSkill(updateSkillText, skillIndex);
    setUpdateSkillModalShow(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-lg-3">
          <div className="list-group">
            <Link to="/userlist" className="list-group-item">
              Danh sách tài khoản
            </Link>
            <Link to="/skill" className="list-group-item active">
              Quản lý tag kỹ năng
            </Link>
            <Link to="/contract" className="list-group-item">
              Quản lý hợp đồng
            </Link>
            <Link to="/complain" className="list-group-item">
              Quản lý khiếu nại
            </Link>
          </div>
        </div>
        <div className="col-md-9 col-lg-9">
          {isFetching ? (
            <Spinner
              animation="border"
              variant="light"
              size="sm"
              style={{ marginRight: '10px' }}
            />
          ) : (
            <div className="userlist-table">
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên kỹ năng</th>
                    <th>
                      <Button
                        variant="link"
                        onClick={() => setNewSkillModalShow(true)}
                      >
                        Thêm mới
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>{list}</tbody>
              </Table>
              <Modal
                show={updateSkillModalShow}
                onHide={() => setUpdateSkillModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Chỉnh sửa kỹ năng
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form
                    onSubmit={handleSubmit(onSubmitUpdate)}
                    id="update-form"
                  >
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Kỹ năng</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Kỹ năng"
                        name="skill-input"
                        onChange={e => setUpdateSkillText(e.target.value)}
                        ref={register({
                          required: 'Vui lòng nhập kỹ năng !'
                        })}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setUpdateSkillModalShow(false)}
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit" form="update-form">
                    Xác nhận
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
          <Modal
            show={newSkillModalShow}
            onHide={() => setNewSkillModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Thêm kỹ năng mới
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit(onSubmit)} id="new-skill-form">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Kỹ năng</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kỹ năng"
                    name="skill-input"
                    onChange={e => setNewSkillText(e.target.value)}
                    ref={register({
                      required: 'Vui lòng nhập kỹ năng !'
                    })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setNewSkillModalShow(false)}
              >
                Close
              </Button>
              <Button variant="primary" type="submit" form="new-skill-form">
                Xác nhận
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="userlist-pagination">
            <Pagination>{paginationList}</Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skill;
