/** @odoo-module **/

import { useRef, onMounted } from "@odoo/owl";

/**
 * Hook personnalisé pour focus automatique sur un élément
 * @param {string} refName - nom de la ref t-ref dans le template
 */
export function useAutofocus(refName) {
    const ref = useRef(refName);
    onMounted(() => {
        if (ref.el) {
            ref.el.focus();
        }
    });
    return ref;
}