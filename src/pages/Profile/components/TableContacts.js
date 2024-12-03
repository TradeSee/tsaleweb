import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { ClearTable, ColumnContainer, Container, EditTable, ImgDefault, RowContainer, TextDefault } from "../../../assets/styles";
import ClearIcon from "../../../icons/ClearIcon.png"
import EditIcon from "../../../icons/editIcon.png"
const alturaPagina = document.documentElement.clientHeight;

export default function TableContacts({...props}) {

  const columns = [    
    {
      title: <TextDefault color="#4b4b4b" size="15px" bold="800">Name & Last Name</TextDefault>,
      dataIndex: "nameContact",
      key: "nameContact",      
      onFilter: (value, record) => record.nameContact.indexOf(value) === 0,
    },
    {
      title: <TextDefault color="#4b4b4b" size="15px" bold="800">E-mail</TextDefault>,
      dataIndex: "businessEmail",
      key: "businessEmail",      
      onFilter: (value, record) => record.businessEmail.indexOf(value) === 0,
    },
    {
      title: <TextDefault color="#4b4b4b" size="15px" bold="800">Phone Number</TextDefault>,
      dataIndex: "businessPhone",
      key: "businessPhone",      
      onFilter: (value, record) => record.businessPhone.indexOf(value) === 0,
    },
    {
      title: <TextDefault color="#4b4b4b" size="15px" bold="800">Role at the Company</TextDefault>,
      dataIndex: "roleAtCompany",
      key: "roleAtCompany",      
      onFilter: (value, record) => record.roleAtCompany.indexOf(value) === 0,
    },
    {
      title: <TextDefault color="#4b4b4b" size="15px" bold="800">Action</TextDefault>,
      dataIndex: "",
      key: "x",      
      render: (render) => (
        <RowContainer>
          <ClearTable onClick={() => props.clearRow(render.key)}>
            <ImgDefault src={ClearIcon} width="15px" height="15px"/>
          </ClearTable>
          <EditTable style={{marginLeft: 5}} onClick={() => props.editRow(render.key)}>
            <ImgDefault src={EditIcon} width="15px" height="15px"/>
          </EditTable>
        </RowContainer>
      )
    },
   
  ]
  return(
    <Table columns={columns} dataSource={props.data} pagination={{ pageSize: alturaPagina > 650 ? 3 : 2 }} onRow={(record) => ({ onClick: () => console.log(record) })}/>
  )
}

