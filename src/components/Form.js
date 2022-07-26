import React, { useState, useEffect } from 'react';
import errorMessages from '../copyText/ErrorMessages';
import specialChars from '../validation/SpecialCharacters';
import InputField from './InputField';
import PasswordFeedback from './PasswordFeedback';

function Form() {
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [isValid, setIsValid] = useState(undefined);
    const [invalidReasons, setInvalidReasons] = useState([]);
    const [triggerValidation, setTriggerValidation] = useState(false);

    useEffect(() => {
        if (!triggerValidation) return;
        const invalidReasons = [];
        // Validation Requirements:
        // Has two input fields to validate the entry from the user (both inputs must match)
        if (firstPassword !== secondPassword) {
            invalidReasons.push(errorMessages.dontMatch)

        }
        // Password has a min length of 6 characters
        if (firstPassword.length < 6 || secondPassword.length < 6) {
            invalidReasons.push(errorMessages.tooShort)
        }
        
        // Password has at least 1 uppercase character
        // Password has at least 1 lowercase character
        // Password has at least 1 number
        // Password has at least 1 special character (!@#$%^&*()_-+={[}]|:;"'<,>.)
        let containsUppercase = false;
        let containsLowercase = false;
        let containsNumber = false;
        let containsSpecialCharacter = false;
        
        firstPassword.split("").forEach((char) => {
            if (!containsUppercase) {
                containsUppercase = char.toUpperCase() === char
            }
            if (!containsLowercase) {
                containsLowercase = char.toLowerCase() === char
            }
            if (!containsNumber) {
                containsNumber = !isNaN(parseInt(char))
            }
            if (!containsSpecialCharacter){
                containsSpecialCharacter = char in specialChars;
            }
        })
        
        if (!containsUppercase) invalidReasons.push(errorMessages.noUppercase)
        if (!containsLowercase) invalidReasons.push(errorMessages.noLowercase)
        if (!containsNumber) invalidReasons.push(errorMessages.noNumber)
        if (!containsSpecialCharacter) invalidReasons.push(errorMessages.noSpecialChar)

        setInvalidReasons(invalidReasons);
        setIsValid(invalidReasons.length === 0)
        setTriggerValidation(false);
    }, [firstPassword, secondPassword, triggerValidation])

    return <section style={{ display: 'flex', margin: '1rem', padding: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <InputField value={firstPassword} onChange={setFirstPassword} placeholder={'Password'}></InputField>
        <InputField value={secondPassword} onChange={setSecondPassword} placeholder={'Enter again'}></InputField>
        <button style={{ marginTop: '1rem', fontSize: '2rem' }} onClick={() => setTriggerValidation(true)}>Submit</button>
        <PasswordFeedback isValid={isValid} invalidReasons={invalidReasons} />
        </div>
    </section>
}

export { Form }