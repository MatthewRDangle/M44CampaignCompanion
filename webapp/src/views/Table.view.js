import m from 'mithril';
import classNames from "classnames";
import Button from "./Button.view";


const Table = (initialVnode) => {


    return {
        view: (vNode) => {
            const { attrs } = vNode;
            const {
                data = [], // required - an array of objects
                rules = [], // required
                actions, // option; undefined or []
                dataKey = 'id',
                tableClassName = '',
                theadClassName = '',
                tbodyClassName = '',
                trClassName = '',
                thClassName = '',
                tdClassName = '',
                classNamesByKey = {},
                onRowClick,
            } = attrs;

            const autoColumnWidth = 100 / rules.length;


            return m('table', {className: `${tableClassName} w-full border-b-[1px] border-secondary`},
                m('thead', {className: `${theadClassName} w-full`}, [
                    m('tr', {className: 'block w-full text-left border-b-[1px] border-secondary'},
                        rules?.map(rule =>
                            m('th', {
                                key: rule.key,
                                style: `width: ${rule.width ?? autoColumnWidth}%;`,
                                className: `inline-block ${thClassName} pb-3`
                            },
                                rule.as ?? rule.key
                            )
                        )
                    ),
                ]),
                m('tbody', {className: `block ${tbodyClassName} w-full`}, [
                    data?.map(obj =>
                        m('tr', {
                            key: obj[dataKey],
                            className: `block w-full text-left even:bg-background-300 odd:bg-background-500 ${trClassName} ${classNamesByKey[obj[dataKey]] ?? ''}`,
                        },
                            rules?.map(rule =>
                                m('td', {
                                    key: obj[dataKey] + '-' + rule.key,
                                    style: `width: ${rule.width ?? autoColumnWidth}%;`,
                                    className: classNames(`inline-block ${tdClassName} pt-4 pb-3`, {
                                        'cursor-pointer': !!onRowClick,
                                    }),
                                    onclick: () => onRowClick && onRowClick(obj),
                                },
                                    rule.valueHandler
                                        ? rule.valueHandler(obj[rule.key], obj)
                                        : obj[rule.key]
                                )
                            ),
                            !!actions ? m('td', actions.map(action =>
                                m(Button, {onclick: (e) => action.onClick(obj, e)}, action.label)
                            )) : ''
                        )
                    )
                ]),
            )
        }
    }
}

export default Table;