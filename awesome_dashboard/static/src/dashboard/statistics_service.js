/** @odoo-module **/
import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";

const statisticsService = {
    dependencies: ["rpc"],
    start(env, { rpc }) {
        const state = reactive({});

        const loadStatistics = async () => {
            const result = await rpc("/awesome_dashboard/statistics");
            Object.assign(state, result);
        };

        loadStatistics();
        setInterval(loadStatistics, 10 * 1000);

        return state;
    },
};

registry.category("services").add("awesome_dashboard.statistics", statisticsService);
