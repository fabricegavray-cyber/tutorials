/** @odoo-module **/
import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";
import { useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { ClickerModel } from "./clicker_model";

const clickerService = {
    start() {
        const model = new ClickerModel();

        setInterval(() => model.tick(), 10000);

        return model;
    },
};

export function useClicker() {
     return useState(useService("clicker"));
}

registry.category("services").add("clicker", clickerService);