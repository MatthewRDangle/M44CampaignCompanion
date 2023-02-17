const m = require("mithril");
const classNames = require("classnames");


const PlayableUnit = (initialVnode) => {


    return {
        view: (vNode) => {
            const {units, faction} = vNode.attrs;
            const factionHexColors = faction.color;
            const totalHealth = !!units ? units.reduce((amt, unit) => amt + unit.health, 0) : 0;


            return (
                m('div', {className: 'relative w-20 h-20 z-10'}, [
                    m('div', {
                        className: 'w-full h-full rounded-[25%]',
                        style: {'background-color': factionHexColors.background}
                    }),
                    m('div', {className: 'absolute left-1/2 -bottom-4 -translate-x-1/2 w-3/4 text-font text-xl text-center bg-background rounded-full'}, m('span', totalHealth))
                ])
            )
        }
    }
}

export default PlayableUnit;