import React, { useState } from 'react'
import { Form, Input, Button, Row, Select} from "antd";
import axios from 'axios';
const { Option } = Select;

const parameters = {
    workclass: ["State-gov", "Self-emp-not-inc", "Private", "Federal-gov", "Local-gov", "Self-emp-inc", "Without-pay"],
    education: ["Bachelors", "HS-grad", "11th", "Masters", "9th", "Some-college", "Assoc-acdm", "7th-8th", "Doctorate", "Assoc-voc", "Prof-school", "5th-6th", "10th", "Preschool", "12th", "1st-4th"],
    marital_status: ["Never-married", "Married-civ-spouse", "Divorced", "Married-spouse-absent", "Separated", "Married-AF-spouse", "Widowed"],
    occupation: ["Adm-clerical", "Exec-managerial", "Handlers-cleaners", "Prof-specialty", "Other-service", "Sales", "Transport-moving", "Farming-fishing", "Machine-op-inspct", "Tech-support", "Craft-repair", "Protective-serv", "Armed-Forces", "Priv-house-serv"],
    relationship: ["Not-in-family", "Husband", "Wife", "Own-child", "Unmarried", "Other-relative"],
    race: ["White", "Black", "Asian-Pac-Islander", "Amer-Indian-Eskimo", "Other"],
    sex: ["Male", "Female"],
    native_country: ["United-States", "Cuba", "Jamaica", "India", "Mexico", "Puerto-Rico", "Honduras", "England", "Canada", "Germany", "Iran", "Philippines", "Poland", "Columbia", "Cambodia", "Thailand", "Ecuador", "Laos", "Taiwan", "Haiti", "Portugal", "Dominican-Republic", "El-Salvador", "France", "Guatemala", "Italy", "China", "South", "Japan", "Yugoslavia", "Peru", "Outlying-US(Guam-USVI-etc)", "Scotland", "Trinadad&Tobago", "Greece", "Nicaragua", "Vietnam", "Hong", "Ireland", "Hungary", "Holand-Netherlands"],
} 
const column_values = ['age', 'workclass', 'fnlwgt', 'education', 'education-num', 'marital-status', 'occupation',
                     'relationship', 'race', 'sex', 'capital-gain', 'capital-loss', 'hours-per-week', 'native-country']



export default function IncomeModel() {
    const [prediction, setPrediction] = useState("Ill try my best to predict it correctly ... :)");

    const onFinish = async(values) => {
        setPrediction("Loading...");
        await axios.post("/models/income_classification", values)
            .then(res => {
                setPrediction(res.data.prediction);
            })
            .catch(err => {
                setPrediction("Error");
                console.log(err);
            })

    }

    return (
        <div className="main-blog-div">
            <div className="blog-title" style={{paddingTop: '0px'}} >
                Income Classification Model
            </div>
            <Form
                name="basic"
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                layout="vertical"
                initialValues={{
                    layout: "vertical",
                }}
                autoComplete="off"
                className="signup-form"
                onValuesChange={() => { setPrediction("Ill try my best to predict it correctly ... :)") }}
            >

            <Row gutter={24} type="flex" align="middle">

                <Form.Item
                    label="Age"
                    name="age"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your age!',
                        },
                    ]}
                    style={{ width: "47%", margin: "10px 10px" }}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="fnlwgt"
                    name="fnlwgt"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your age!',
                        },
                    ]}
                    style={{ width: "47%", margin: "10px 10px" }}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Education Number"
                    name="education_num"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Education Number!',
                        },
                    ]}
                    style={{ width: "47%", margin: "10px 10px" }}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="capital_gain"
                    name="capital_gain"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Capital Gain!',
                        },
                    ]}
                    style={{ width: "47%", margin: "10px 10px" }}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="capital_loss"
                    name="capital_loss"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Capital Loss!',
                        },
                    ]}
                    style={{ width: "47%", margin: "10px 10px" }}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="hours_per_week"
                    name="hours_per_week"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Hours per Week!',
                        },
                    ]}
                    style={{ width: "47%", margin: "10px 10px" }}
                >
                    <Input type="number" />
                </Form.Item>

                {
                    Object.keys(parameters).map((key, index) => {
                        return (
                            <Form.Item
                                label={key}
                                name={key}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your ' + key + '!',
                                    },
                                ]}
                                style={{ width: "47%", margin: "10px 10px" }}
                            >
                                <Select >
                                    {
                                        parameters[key].map((value, index) => {
                                            return (
                                                <Select.Option key={index} value={value}>{value}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        )
                    }
                    )
                }

            </Row>

                <div className="blog-title" style={{fontSize: '25px', color: '#fff'}} >
                    {prediction}
                </div>
                <div className="blog-title" style={{fontSize: '25px'}} >

                <Form.Item>
                    
                    <Button
                        htmlType="submit"
                        style={{
                            fontSize: "20px",
                            height: "auto",
                        }}
                        type="primary"
                    >
                        Predict
                    </Button>
                </Form.Item>
</div>
            </Form>
        </div>
    )
}


{/* 
// schema.age
// schema.workclass
// schema.fnlwgt
// schema.education
// schema.education_num
// schema.marital_status
// schema.occupation
// schema.relationship
// schema.race
// schema.sex
// schema.capital_gain
// schema.capital_loss
// schema.hours_per_week
// schema.native_country


// const a = {
//     "age": 39,
//     "workclass": "State-gov",
//     "fnlwgt": 77516,
//     "education": "Bachelors",
//     "education_num": 13,
//     "marital_status": "Never-married",
//     "occupation": "Adm-clerical",
//     "relationship": "Not-in-family",
//     "race": "White",
//     "sex": "Male",
//     "capital_gain": 2174,
//     "capital_loss": 0,
//     "hours_per_week": 40,
//     "native_country": "United-States"
// } */}