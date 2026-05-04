/** @odoo-module **/
import { registry } from "@web/core/registry";
import { Component, xml } from "@odoo/owl";
import { PieChart } from "./pie_chart";

class NumberCard extends Component {
    static props = { title: String, value: [Number, String] };
    static template = xml`
        <div>
            <h6 t-esc="props.title"/>
            <p class="fs-1 fw-bold" t-esc="props.value"/>
        </div>
    `;
}

class PieChartCard extends Component {
    static props = { data: Object };
    static components = { PieChart };
    static template = xml`<PieChart data="props.data"/>`;
}

registry.category("awesome_dashboard").add("new_orders", {
    id: "new_orders",
    description: "Nouvelles commandes",
    Component: NumberCard,
    props: (data) => ({ title: "Nouvelles commandes ce mois", value: data.new_orders }),
});

registry.category("awesome_dashboard").add("total_amount", {
    id: "total_amount",
    description: "Montant total",
    Component: NumberCard,
    props: (data) => ({ title: "Montant total ce mois", value: data.total_amount }),
});

registry.category("awesome_dashboard").add("average_quantity", {
    id: "average_quantity",
    description: "Moyenne t-shirts",
    Component: NumberCard,
    size: 2,
    props: (data) => ({ title: "Moyenne t-shirts / commande", value: data.average_quantity }),
});

registry.category("awesome_dashboard").add("pie_chart", {
    id: "pie_chart",
    description: "Répartition par taille",
    Component: PieChartCard,
    size: 2,
    props: (data) => ({ data: data.orders_by_size }),
});