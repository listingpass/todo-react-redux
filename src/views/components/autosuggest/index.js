import React, { Component, PropTypes } from 'react';
import isMobile from 'ismobilejs';
import Autosuggest from 'react-autosuggest';
import cmmdata from './cmmdata.js';
const focusInputOnSuggestionClick = !isMobile.any;

/*
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const focusInputOnSuggestionClick = !isMobile.any;

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.name}</span>
    );
}

*/

export default class CmmAs extends Component {
    static propTypes = {
        name:PropTypes.string,
        value:PropTypes.string,
        handleChange:PropTypes.func,
        handleKeyUp:PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            name:this.props.name,
            value: this.props.value,
            suggestions: []
        };
    }
    static escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    getSuggestions(value) {
        if (value.length>0) {
            const escapedValue = CmmAs.escapeRegexCharacters(value.trim());

            if (escapedValue === '') {
                return [];
            }

            const regex = new RegExp('.*' + escapedValue, 'i');
            var cmmobj = cmmdata;
            switch (this.props.name) {
                case "Service":
                    cmmobj = cmmdata.service_item_list;
                    break;
                case "Employee":
                    cmmobj = cmmdata.employees;
                    break;
                case "Job":
                    cmmobj = cmmdata.jobs;
                    break;
                case "billing_rate_level":
                    cmmobj = cmmdata.billing_rate_level;
                    break;
                case "payroll_items":
                    cmmobj = cmmdata.payroll_items;
                    break;
                case "wc_list":
                    cmmobj = cmmdata.wc_list;
                    break;
                default:
                    cmmobj = cmmdata.employees;
            }
            return cmmobj.filter(cmmobj => regex.test(cmmobj.name));
        }
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    static getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    static renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        this.props.handleChange(this.props.name,newValue);

        // this.props.handleChange(this.props.name, newValue);

    };
    onKeyUp(event) {
            this.props.handleKeyUp(event);
        }
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };


    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            value,
            onChange:this.onChange.bind(this),
            onKeyUp:this.onKeyUp.bind(this),
            name:this.props.name,
            className:"task-form__input",
            placeholder:this.props.name
        };

        return (
                    <Autosuggest
                        name={this.props.name}
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={CmmAs.getSuggestionValue}
                        renderSuggestion={CmmAs.renderSuggestion}
                        inputProps={inputProps}
                        focusInputOnSuggestionClick={focusInputOnSuggestionClick}
                         id={this.props.name}/>
        );
    }
}
