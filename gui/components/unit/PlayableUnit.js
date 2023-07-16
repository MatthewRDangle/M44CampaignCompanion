const m = require("mithril");


const PlayableUnit = (initialVnode) => {


    return {
        view: (vNode) => {
            const {units, faction} = vNode.attrs;
            const factionHexColors = faction.color;
            const totalHealth = !!units ? units.reduce((amt, unit) => amt + unit.health, 0) : 0;

            let isExhausted = false;
            for (let unit of units) {
                if (!unit.isExhausted) {
                    isExhausted = false;
                    break;
                } else {
                    isExhausted = true;
                }
            }


            return (
                m('div', {className: 'relative w-20 h-20 z-10 transition-opacity' + (isExhausted ? ' opacity-50' : '')}, [
                    m('div', {
                        className: 'w-full h-full rounded-[25%] shadow-xl shadow-background-500/50',
                        style: {'background-color': factionHexColors.background}
                    },
                        !!faction.icon.src && m('img', {className: 'w-full h-full rounded-[25%] object-cover', src: faction.icon.src, alt: faction.icon.alt})
                    ),
                    m('div', {className: 'absolute left-1/2 -bottom-4 -translate-x-1/2 w-3/4 text-font text-xl text-center bg-background rounded-full'}, m('span', totalHealth))
                ])
            )
        }
    }
}

export default PlayableUnit;