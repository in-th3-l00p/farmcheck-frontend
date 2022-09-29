// everything that relates to forms
import React, { useState, useEffect } from "react";

import { FloatingLabel, Form } from "react-bootstrap";
import { getElementsBy } from "../../lib/algorithms";
import countries from "./countries";
import indexes from "./indexes";

import style from "./forms.module.scss";

/**
 * Component that accepts input as a number within the [0, maximum] range.
 * @param props.label input's label
 * @param props.className component's classes
 * @param props.maximum the maximum range
 * @param props.value state value
 * @param props.setValue state's reducer
 * @returns the component
 */
export const InputRange = ({
    label,
    className="",
    maximum=100,
    value,
    setValue
}) => {
    return (
        <div className={className}>
            <LabelInput 
                label={label} 
                value={value}
                setValue={(newValue) => {
                    // checking if the newValue is a number and is in the range
                    if (
                        newValue === "" || (
                        /^-?\d+$/.test(newValue) && 
                        newValue >= 1 && 
                        newValue <= maximum
                    ))
                        setValue(newValue);
                }}
            />
        </div>
    );
}

/**
 * An input that comes with a label
 * @returns the component
 */
export const LabelInput = ({ 
    label,
    type="text",
    className="",
    value, 
    setValue, 
    onFocus=() => {},
    onBlur=() => {}
}) => {
    return (
        <FloatingLabel
            label={label}
            className={`${style.label} ${className}`} 
        >
            <Form.Control
                className={style.content}
                type={type} 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                onFocus={onFocus} onBlur={onBlur}
            />
        </FloatingLabel>
    );
}

/**
 * Input component that goes on multiple lines.
 * @param label the label of the input
 * @param className the class name of the container
 * @param style the style of the container
 * @param inputClassName the class name of the input
 * @param inputStyle the style of the input
 * @param value the input's value
 * @param setValue the input's value state reducer
 * @return {JSX.Element} the input component
 */
export const LabelTextInput = ({
    label,
    className="",
    inputClassName = "",
    style = {},
    inputStyle = {},
    value,
    setValue
}) => {
    return (
        <Form.Group
            className={className}
            style={style}
        >
            <Form.Label>{label}</Form.Label>
            <Form.Control
                as="textarea"
                className={inputClassName}
                style={inputStyle}
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
        </Form.Group>
    );
}

/**
 * A normal input with a label that auto completes into a country.
 * Also offers an interface for choosing a country.
 * @param props.className additional classes
 * @param props.value the state for the input's value
 * @param props.setValue the function used for chaning the state of the input's value
 * @returns the component
 */
export const CountryInput = ({ className="", value, setValue }) => {
    const [inputSelected, setInputSelected] = useState(false)
    const [countryListHover, setCountryListHover] = useState(false)
    const [countryList, setCountryList] = useState(countries)

    // getting every country that we need to list
    useEffect(() => {
        let bounds = getElementsBy(countries, value);

        // don't need to show if there is only one element or less
        if (bounds.length) {
            setCountryList(bounds);
            return;
        }

        setCountryList([]);
    }, [value])

    return (
        <div className={`${style.input} ${className}`}>
            <LabelInput 
                label="Country / Region"
                value={value} setValue={setValue}
                onFocus={() => setInputSelected(true)}
                onBlur={() => setInputSelected(false)}
            />

            {/* the country chooser */}
            {((inputSelected || countryListHover) && countryList.length > 0) ? (
                <ul 
                    className={style.list}
                    onMouseEnter={() => setCountryListHover(true)}
                    onMouseLeave={() => setCountryListHover(false)}
                >
                    {countryList.map((country, index) => {
                        return (
                            <li key={index}>
                                <button 
                                    className={style.button}
                                    onClick={() => { 
                                        setValue(country); 
                                        setCountryListHover(false)
                                    }}
                                >
                                    {country}
                                </button>
                            </li>
                        )
                    })}                
                </ul>
            ): <></>}
        </div>
    );
}

export const PhoneNumberInput = ({ className="", value, setValue }) => {
    const [inputSelected, setInputSelected] = useState(false);
    const [phoneNumberIndexHover, setPhoneNumberIndexHover] = useState(false);
    const [phoneNumberIndexList, setPhoneNumberIndexList] = useState(indexes);

    useEffect(() => {
        let bounds = getElementsBy(indexes, value);

        if (bounds.length) {
            setPhoneNumberIndexList(bounds);
            return;
        }

        setPhoneNumberIndexList([]);
    }, [value])

    return (
        <div className={`${style.input} ${className}`}>
            <LabelInput 
                label="Phone number"
                value={value} 
                setValue={(newValue) => {
                    if (newValue === "" || (/^-?\d+$/.test(newValue.length > 1 ? newValue.substring(1) : newValue)))
                        setValue(newValue);
                    else if (newValue === "+")
                        setValue("");
                }}
                onFocus={() => setInputSelected(true)}
                onBlur={() => setInputSelected(false)}
            />

            {((inputSelected || phoneNumberIndexHover) && phoneNumberIndexList.length > 0) ? (
                <ul 
                    className={style.list}
                    onMouseEnter={() => setPhoneNumberIndexHover(true)}
                    onMouseLeave={() => setPhoneNumberIndexHover(false)}
                >
                    {phoneNumberIndexList.map((countryNumber, index) => {
                        return (
                            <li key={index}>
                                <button 
                                    className={style.button}
                                    onClick={() => {
                                        setValue("+" + countryNumber.match(/\d/g).join(""));
                                        setPhoneNumberIndexHover(false)
                                    }}
                                >
                                    {"+" + countryNumber}
                                </button>
                            </li>
                        )
                    })}                
                </ul>
            ): <></>}
        </div>
    )
}

/**
 * A file uploader component. Once a file is loaded, it will
 * be stored as an Int8Array. 
 * @param {callback} props.setBlob content state reducer
 * @returns the components
 */
export const FileUploader = ({ setBlob }) => {
    return (
        <div>
            <input
                type="file"
                onChange={(event) => {
                    const file = event.target.files[0];
                    if (!file) return; // error checking

                    // getting the file content as an array
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = (event) => {
                        if (event.target.result instanceof ArrayBuffer) {
                            const buffer = new Uint8Array(event.target.result);
                            setBlob([...buffer]);
                        }
                    };
                }}
            />
        </div>
    );
}