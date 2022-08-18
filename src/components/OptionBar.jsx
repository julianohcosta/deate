import {ConfigProvider, DatePicker, Space} from 'antd';
import locale from 'antd/es/locale/pt_BR';

const OptionBar = (props) => {

  console.log(locale);

  const disabled = props.disabled && true;

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <ConfigProvider locale={locale}>
      <Space direction={`horizontal`} size={12}>
        <DatePicker onChange={onChange} picker="year" disabled={disabled}/>
        <DatePicker onChange={onChange} picker="month" disabled={disabled}/>
      </Space>
    </ConfigProvider>
  )
}
export default OptionBar