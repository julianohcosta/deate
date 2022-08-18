import {Button, Form, Input} from 'antd';

const EstoqueMensal = () => {

    const {TextArea} = Input;

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div style={{
            marginLeft: '4em'
        }}>
            <Form
                name="estoque-form"
                onFinish={onFinish}
            >
                <Form.Item label="Deates" style={{
                    fontWeight: '600',
                }}>
                    <TextArea rows={10} style={{
                        width: '15em',
                        resize: 'none',
                    }}/>
                </Form.Item>
                <Form.Item label=" " colon={false}>
                    <Button type="primary" htmlType="submit"
                            style={{
                                borderRadius: '.425em',
                                backgroundColor: '#6184c0',
                            }}
                    >
                        Gerar
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
};

export default EstoqueMensal;