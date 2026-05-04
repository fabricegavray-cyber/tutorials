/** @odoo-module **/
import { Component, xml } from "@odoo/owl";

export class DashboardItem extends Component {
    static props = {
        size: { type: Number, optional: true },
        slots: Object,
    };
    static defaultProps = { size: 1 };
    static template = xml`
        <div class="card m-2" t-attf-style="width: {{ 18 * props.size }}rem;">
            <div class="card-body">
                <t t-slot="default"/>
            </div>
        </div>
    `;
}