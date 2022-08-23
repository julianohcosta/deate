import {useState} from "react";
import {DatePicker, Select, Space} from "antd";
import moment from 'moment';
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/pt_BR";
import "./OptionBar.module.css";

const {Option} = Select;
const {RangePicker} = DatePicker;

const meses = ['Janeiro', 'Fevereiro',
  'Março', 'Abril',
  'Maio', 'junho',
  'Julho', 'Agosto',
  'Setembro', 'Outubro',
  'Novembro', 'Dezembro']

const anos = [];
for (let i = 2018; i<=new Date().getFullYear(); i++){
  anos.push(i);
}

const OptionBar = props => {
  const disabled = props.disabled && true;
  const [status, setStatus] = useState("error");
  const dateFormat = "DD/MM/YYYY";

  const handleChange = values => {
    /** Manipula a cor da borda do select do ano*/
    values.length === 0 ? setStatus("error") : setStatus("");
    props.onSelectedYear(values);
  };

  const handleMonthChange = month => {
    props.onSelectedMonth(month)
  }

  const rangeHandler = (dates) => {
    if (dates && dates.length > 0) {
      props.onSelectedPeriod(dates)
    }
  }

  const disabledDate = (current) => {
    // Can not select days before today and today

    return current && current > moment().endOf('day');
  };

  return (
    <>
      {props.type === "rhap" && (
        <Space direction="horizontal">
          <Select
            mode="multiple"
            status={status}
            style={{marginLeft: "0.4em", width: "24em", fontSize: ".525rem"}}
            placeholder="Selecione o(s) ano(s)"
            optionLabelProp="label"
            onChange={handleChange}
            disabled={disabled}
          >
            {anos.map((ano, idx) => {
              return (
                <Option key={idx} value={ano} label={ano}>
                  <div className="ano-item">{ano}</div>
                </Option>)})}
          </Select>
          <span
            style={{marginLeft: "0.5em", fontSize: "0.725rem"}}
          >
            Meses:
          </span>
          <Select
            defaultValue="Todos"
            style={{width: "8em", fontSize: ".575rem"}}
            disabled={disabled}
            onChange={handleMonthChange}
          >
            <Option value="">Todos</Option>
            {meses.map((mes, idx) => {return (<Option key={idx+1} value={idx+1}>{mes}</Option>)})}}
          </Select>
        </Space>
      )}
      {props.type === "estoque" && (
        <RangePicker
          style={{border: "0.8px solid #adb5bd"}}
          locale={locale}
          format={dateFormat}
          onChange={rangeHandler}
          disabledDate={disabledDate}
        />
      )}
    </>
  );
};
export default OptionBar;
