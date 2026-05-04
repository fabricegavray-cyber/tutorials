/** @odoo-module **/
import { Component, xml } from "@odoo/owl";
import { humanNumber } from "@web/core/utils/numbers";

export class ClickValue extends Component {
    static props = { value: Number };
     static template = xml`
        <span t-att-data-tooltip="props.value.toString()">
            <t t-esc="humanNumber(props.value)"/>
        </span>
    `;

    humanNumber(val) {
        return humanNumber(val);
    }
}