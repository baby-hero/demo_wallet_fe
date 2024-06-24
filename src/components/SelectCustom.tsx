import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space, Alert } from 'antd';
import type { InputRef } from 'antd';

let index = 0;

interface SelectCustomProps {
  placeholder: string;
  list_items: any;
  selected_value: string;
  label_add_button?: string;
  width: number;
  handleChangeItem: (address: string) => void;
  validateAddItem?: (address: string) => string;
}

const SelectCustom: React.FC<SelectCustomProps> = ({ placeholder, list_items, selected_value: selected_value, label_add_button: text_button, width, handleChangeItem: handleChangeItem, validateAddItem: validateAddItem }) => {
  const [items, setItems] = useState(['']);
  const [address, setAdress] = useState('');
  const [warning_msg, setWarningMsg] = useState('');

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    setItems(list_items)
  }, [list_items])

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdress(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const trimmedAddress = address.trim();

    if (validateAddItem) {
      const err_msg = validateAddItem(trimmedAddress)
      if (err_msg) {
        // notify
        setWarningMsg(err_msg);
        return;
      }
    }

    if (items.includes(trimmedAddress)) {
      setWarningMsg('Address already in the list.');
      return;
    }
    
    setWarningMsg('')

    setItems([...items, trimmedAddress || `New item ${index++}`]);
    setAdress('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const handleChange = (value: string) => {
    handleChangeItem(value)
  };

  return (
    <Select
      style={{ width: width }}
      variant="borderless"
      defaultValue={selected_value}
      placeholder={placeholder}
      onChange={handleChange}
      dropdownRender={(menu) => (
        <>
          {menu}
          {
            text_button && <>
              <Divider style={{ margin: '8px 0' }} />
              <Space style={{ padding: '0 8px 4px' }}>
                <Input
                  placeholder="Enter"
                  ref={inputRef}
                  value={address}
                  onChange={onNameChange}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>{text_button}</Button>
              </Space>
              {warning_msg && (
                <Divider style={{ padding: '0 8px 4px' }}>
                  <Alert
                    message={warning_msg}
                    type="warning"
                    showIcon
                    closable
                  />
                </Divider>
              )}
            </>
          }

        </>
      )}
      options={items.map((item) => ({
        label: item.length > 20 ? `${item.slice(0, 8)}...${item.slice(-6)}` : item,
        value: item,
      })
      )}
    />
  );
};

export default SelectCustom;