import {DatePicker, Space} from 'antd';

const OptionBar = (props) => {

  const disabled = props.disabled && true;

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Space direction={`horizontal`} size={12}>
      <DatePicker onChange={onChange} picker="year" disabled={disabled}/>
      <DatePicker onChange={onChange} picker="month" disabled={disabled}/>
    </Space>
  )
}
export default OptionBar