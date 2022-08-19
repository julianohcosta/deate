import {Select, Space, DatePicker} from 'antd';
import {useState} from "react";
import './OptionBar.module.css'

const {Option} = Select;
const { RangePicker } = DatePicker;


const OptionBar = (props) => {

  const disabled = props.disabled && true;
  const [status, setStatus] = useState('error');


  const handleChange = (values) => {

    /** Manipula a cor da borda do select do ano*/
    values.length === 0 ?setStatus('error') : setStatus('')
    props.onSelectedYear(values)
  };

  return (
    <>
      {props.type === 'rhap' &&
      <Space direction="horizontal">
        <Select
          mode="multiple"
          status={status}
          style={{
            marginLeft: '0.4em',
            width: '24em',
            fontSize: '.525rem'
          }}
          placeholder="Selecione o(s) ano(s)"
          optionLabelProp="label"
          onChange={handleChange}
          disabled={disabled}
        >

          <Option value="2018" label="2018">
            <div className="ano-item">
              2018
            </div>
          </Option>
          <Option value="2019" label="2019">
            <div className="ano-item">
              2019
            </div>
          </Option>
          <Option value="2020" label="2020">
            <div className="ano-item">
              2020
            </div>
          </Option>
          <Option value="2021" label="2021">
            <div className="ano-item">
              2021
            </div>
          </Option>
          <Option value="2022" label="2022">
            <div className="ano-item">
              2022
            </div>
          </Option>
        </Select>
        <span style={{
          marginLeft: '0.5em',
          fontSize: '0.725rem'
        }}>
          Meses:
        </span>
        <Select
          defaultValue="Todos"
          style={{
            width: '8em',
            fontSize: '.575rem',
          }}
          disabled={disabled}
          onChange={handleChange}>
          <Option value="">Todos</Option>
          <Option value="1">Janeiro</Option>
          <Option value="2">Fevereiro</Option>
          <Option value="3">Março</Option>
          <Option value="4">Abril</Option>
          <Option value="5">Maio</Option>
          <Option value="6">Junho</Option>
          <Option value="7">Julho</Option>
          <Option value="8">Agosto</Option>
          <Option value="9">Setembro</Option>
          <Option value="10">Outubro</Option>
          <Option value="11">Novembro</Option>
          <Option value="12">Dezembro</Option>
        </Select>
      </Space>
      }
      {props.type === 'rhap' &&
      <RangePicker showTime />
      }
    </>
  )
}
export default OptionBar