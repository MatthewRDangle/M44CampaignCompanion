import m from 'mithril';
import TableControllerBuilder from "../../models/TableController.builder";


const SimpleTable = (initialVnode) => {
    initialVnode.attrs.builder = new TableControllerBuilder();


    return {
        view: (vNode) => {
            const { attrs } = vNode;
            const { builder } = attrs;


            return m('table', [
                m('tr', builder?.columns.map(key =>
                    m('th', key)
                )),
                builder?.rows.map(row =>
                    m('tr', row.map(value =>
                        m('td', value)
                    ))
                )
            ])
        }
    }
}

export default SimpleTable;