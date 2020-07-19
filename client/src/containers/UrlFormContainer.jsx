import React, { Component } from 'react';

/* Import Components */
import Input from '../components/Input';
import Button from '../components/Button'

import { urlValidator } from '../helpers/Validators';
import { UrlShortenerService } from '../services/Urlshortener.service';

class UrlFormContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            urlObj: {
                originalUrl: '',
            },
            formErrors: { originalUrl: '' },
            urlValid: false,
            formValid: false,
            statusMessage: '',
            errorMessage: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => ({
            urlObj:
            {
                ...prevState.urlObj, [name]: value
            }
        }), () => { this.validateField(name, value); })
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let urlData = this.state.urlObj;
        UrlShortenerService.shorten(urlData).then((data) => {
            this.setState({ formValid: false });
            if (data.status !== 200) {
                this.setState({ errorMessage: data.message });
            } else {
                // @TODO: static URL is used, use environment variables
                var urlTxt = "http://localhost:3000/" + data.urlHash;
                this.setState({ statusMessage: 'Shortened Url: ' + urlTxt });
            }
        });
    }

    handleClearForm() {
        this.setState({
            urlObj: {
                originalUrl: '',
            },
        })
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let urlValid = this.state.urlValid;

        if (fieldName === 'originalUrl') {
            urlValid = urlValidator(value);
            fieldValidationErrors.originalUrl = urlValid ? '' : ' is invalid';
        }

        this.setState({
            formErrors: fieldValidationErrors,
            urlValid: urlValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.urlValid });
    }

    render() {
        return (

            <form className="container-fluid" onSubmit={this.handleFormSubmit}>

                {this.state.statusMessage &&
                    <span className="msg status-msg"> {this.state.statusMessage} </span>}

                {this.state.errorMessage &&
                    <span className="msg error-msg"> {this.state.errorMessage} </span>}

                <Input
                    inputType={'text'}
                    title={''}
                    name={'originalUrl'}
                    value={this.state.urlObj.originalUrl}
                    placeholder={'Enter your URL here'}
                    handleChange={this.handleInput}
                    autoComplete={'off'}
                />

                <Button
                    action={this.handleFormSubmit}
                    type={'primary'}
                    title={'Submit'}
                    disabled={this.state.formValid}
                />

            </form>

        );
    }
}

export default UrlFormContainer;