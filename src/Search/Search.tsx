import {Field, Form, Formik} from "formik";
import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import {ImSearch} from "react-icons/im";
import {getWeatherByCity} from "../reducers/weatherReducer";
import {getCurrentLanguage} from "../reducers/weatherSelector";
export const Search:React.FC<{}> = React.memo(() =>{
    type initialValuesType= {
        search:string
    }
    const currentLanguage = useSelector(getCurrentLanguage)
    let initialValues:initialValuesType = {search: ''}
    function validateSearch(value:initialValuesType) {
        let error;
        if (!value) {
            error = 'Required field';
            //@ts-ignore
        } else if ([...value].length > 20){
            error = 'Max length 20 symbols';
        }
        return error;
    }
    const dispatch = useDispatch()

    const onSubmit = async (values:initialValuesType, actions:any) =>{
        await dispatch(getWeatherByCity(values.search, currentLanguage))
        actions.resetForm({
            values: {search:''},
        });
    }
    return(
        <Container>
            <Row>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ errors, touched}) => (
                <Form style={{
                    margin:"auto",
                    width:"100%"
                }}>
                   <Col >
                       <Row>
                           <Field name={"search"} type={"search"} validate={validateSearch} component={"input"} maxLength={20} style={
                               {
                                   marginLeft:"10px",
                                   float: "left",
                                   minWidth: "85%",
                                   textAlign:"center",
                                   display:"block",
                                   resize:"none",
                                   fontSize:"20px",
                                   padding:"10px",
                                   borderRadius:"20px",
                                   outline:"none"
                               }
                           }/>
                           <button className={"btn btn-success"} style={{
                               float: "left",
                               margin: "auto",
                               textAlign:"center",
                               width: "10%",
                               marginLeft:"5px",
                               borderRadius:"20px",
                           }} type={"submit"}><ImSearch/></button>
                       </Row>
                   </Col>
                    <Row>
                        {errors.search && touched.search && <span role={"alert"} style={{fontSize:"20px", color:"red", margin:"10px 0px 0px 14px"}}>{errors.search}</span>}
                    </Row>
                </Form>
                )}
            </Formik>
            </Row>
        </Container>)
})