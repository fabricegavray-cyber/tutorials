/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Counter extends Component {
    static template = "awesome_owl.counter";

    // Validation des props — onChange est optionnel
    static props = {
        onChange: { type: Function, optional: true },
    };

    setup() {
        this.state = useState({ value: 0 });
    }

    increment() {
        this.state.value++;
        // Si le parent a passé onChange, on l'appelle
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
}