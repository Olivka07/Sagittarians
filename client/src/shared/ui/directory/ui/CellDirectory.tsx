import React, { FC, useEffect, useMemo, useRef, useState, memo } from 'react';
import { DirectoryItem } from './Directory';
import { useDirectoryContext } from '../lib/context';
import { Form, Input, InputRef } from 'antd';
import './directory.css'



interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof DirectoryItem;
    record: DirectoryItem;
    source: DirectoryItem
    handleSave: (record: DirectoryItem) => void;
}
  
export const CellDirectory: FC<EditableCellProps> =({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    source,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useDirectoryContext()!
    useEffect(() => {
      if (editing) {
          inputRef.current!.focus();
      } 
    });

  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const changed = () => {
      if (source!==null) {
        let changedCount = 0
        for (let key of Object.keys(record)) {
          if (record[key as keyof DirectoryItem] !== source[key as keyof DirectoryItem]) {
            changedCount++
          }
        }
        if (changedCount!==0) {
          return 'changed'
        } else {
          return ''
        }
      }
      return 'changed'
      
    }
  
    const save = async () => {
      try {
        const values = await form.validateFields();
        handleSave({ ...record, ...values });
        toggleEdit();
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children
  
    
    if (editable) {
      childNode = editing ? (
        <Form.Item
          className='form-cell-directory'
          key={record.name+record.key}
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} обязательно`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div key={record.name+record.key} className={`${changed()}`}  style={{ paddingRight: 24 }} onClick={toggleEdit}>
          {children}
        </div>
      );
    }
  
    return <td key={'td'+inputRef.current} {...restProps}>{childNode}</td>;
}
