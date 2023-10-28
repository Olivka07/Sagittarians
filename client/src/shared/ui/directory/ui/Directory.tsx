import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Col, Form, Input, Popconfirm, Table } from 'antd';
import { CellDirectory } from './CellDirectory';
import { Button } from 'shared/ui/button';
import { RowDirectoryContext } from '../lib/context';
import { IUpdateTypesProduct } from 'shared/api/products/models';
import { useModal } from 'shared/lib/hooks/modal.hook';
import Message from 'shared/ui/message/Message';

export interface DirectoryItem {
    name: string
    key: string
}

type EditableTableProps = Parameters<typeof Table>[0];

export interface DataType {
  name: string
  id: number
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface DirectoryProps {
    data: DataType[]
    title: string
    updateInDirectoryApi: (params: DataType[]) => Promise<void>
    addInDirectoryApi: (params: DataType[]) => Promise<void>
    deleteFromDirectoryApi: (params: DataType[]) => Promise<void> 
}

export const Directory: FC<DirectoryProps> = ({data, title, updateInDirectoryApi, addInDirectoryApi, deleteFromDirectoryApi}) => {
    const [dataSource, setDataSource] = useState<DataType[]>([])
    const [warning, setWarning] = useState('')
    const {modal, toggle} = useModal()
    useEffect(() => {
      setDataSource(data)
    }, [data])


    useEffect(() => {
      let changed = false
      if (dataSource.length !== data.length) {
        changed = true
      } else {
        const map = new Map<string, number>()
        for (let item of data) {
          map.set(item.name, item.id)
        }
        for (let item of dataSource) {
          if (!map.has(item.name)) {
            changed = true
          } 
        }
      }
      if (changed===true) {
        setWarning('Необходимо сохранить изменения')
      } else {
        setWarning('')
      }
    }, [dataSource])

    const handleDelete = (id: number) => {
      setDataSource(prev => prev.filter((item) => item.id!==id));
    };

    // const handleSaveInDb = (item: DataType) => {
    //   // Проверка, что это не новый item
    //   if (String(item.id).split('.').length<2) {
    //     updateInDirectoryApi([item])
    //   } else {
    //     addInDirectoryApi([item])
    //   }
    // }

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: title,
            dataIndex: 'name',
            width: '70%',
            editable: true,
        },
        {
            title: '',
            dataIndex: 'operation_delete',
            width:'30%',
            render: (_, record) => {
                console.log(record)
                return dataSource.length >= 1 ? (
                    <Popconfirm 
                      key={record.id+'delete'} 
                      title={`Вы уверены, что хотите удалить "${record.name}"?`} 
                      onConfirm={() => handleDelete(record.id)}
                      okText="Да"
                      cancelText="Нет"
                    >
                        <Button className='btn__delete' text='Удалить'/>
                    </Popconfirm>
                ) : null
            },
        },
        // {
        //     title: '',
        //     dataIndex: 'operation_save',
        //     render: (_, record) => {
        //         return dataSource.length >= 1 ? (
        //             <Popconfirm 
        //               key={record.id+'save'} 
        //               title={`Сохранить изменение "${record.name}"?`} 
        //               onConfirm={() => handleSaveInDb(record as DataType)}
        //               okText="Да"
        //               cancelText="Нет"
        //             >
        //                 <Button disabled={!!data.find((el) => {
        //                   if (el.name === record.name && el.id === record.id)
        //                     return el
        //                 })} className='btn__save' text='Сохранить'/>
        //             </Popconfirm>
        //         ) : null
        //     },
        // },
    ];

  const handleAdd = () => {
    const newData: DataType = {
      id: Number(Date.now()+'.05'),
      name: `Измените`,
    };
    setDataSource(prev => [newData,...prev]);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const handleSaveAll = async() => {
    try {
      const updateMassiv = []
      const deleteMassiv = []
      const addMassiv = []

      for (let i = 0; i<dataSource.length; i++) {
        let item = dataSource[i]
        const check = data.find((el) => el.id === item.id) || null
        if (check && check.name !== item.name) {
          updateMassiv.push(item)
        } else if (!check){
          addMassiv.push(item)
        }
      }
      for (let i = 0; i<data.length; i++) {
        const item = data[i]
        if (!dataSource.find((el) => el.id === item.id)) {
          deleteMassiv.push(item)
        }
      }
      if (updateMassiv.length!==0) {
        await updateInDirectoryApi(updateMassiv)
      }
      if (addMassiv.length!==0) {
        await addInDirectoryApi(addMassiv)
      }
      if (deleteMassiv.length!==0) {
        await deleteFromDirectoryApi(deleteMassiv)
      }
      toggle(`Сохранение справочника "${title}" прошло успешно`)
    } catch(e) {
      toggle(`При сохранении справочника "${title}" произошла ошибка`)
    }
    
  };

  const components = {
    body: {
        row: RowDirectoryContext,
        cell: CellDirectory,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        source: data.find((el) => el.id === record.id) || null
      }),
    };
  });

  return (
    <Col span={8}>
      {modal && <Message>{modal}</Message>}
        <h2 className='dict__header'>{`Справочник "${title}"`}</h2>
        {warning && <div className='dict__warning'>&#128165;{warning}</div>}
        <Button onClick={handleAdd} text='Добавить' className='button_add'/>
        <Button onClick={handleSaveAll} text='Сохранить всё' className='button_save'/>
        {dataSource.length>0 ?
          <Table
              key={data?dataSource.length:'falsekey'}
              pagination={false}
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
          /> : <div className='dict__warning'>Справочник пуст</div>
        }
    </Col>
  );
};

