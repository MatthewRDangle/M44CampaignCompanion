import m from 'mithril';


const UnitToken = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const unit = attrs.unit;
            const factionColor = unit.faction?.color;
            const factionSVGFilter = unit.faction?.filter;

            return (
                m('div', {className: classNames('relative z-10', {
                        'opacity-50': !unit.available_movement
                    })}, [
                    m('div', {
                        className: classNames('w-16 h-24', {
                            'cursor-pointer !hover:text-background !hover:bg-interaction': !!attrs.onclick,
                            '!text-interaction !bg-interaction': unit.isSelected,
                        }),
                        style: {
                            color: factionColor?.text,
                            'background-color': factionColor?.background,
                            border: `1px solid ${factionColor?.text}`,
                            'border-top': '0',
                            'border-radius': '0.25rem 0.25rem 0 0',
                            'clip-path': 'polygon(0% 0%, 0% 100%, 50% 75%, 100% 100%, 100% 0%)'
                        },
                        onclick: attrs.onclick
                    }, [
                        m('img', {
                            className: 'w-full px-1 py-3',
                            style: `filter: ${factionSVGFilter?.text}`,
                            src: unit.icon.src,
                            alt: unit.icon.alt,
                        })
                    ]),
                    m('div', {
                        className: 'absolute -bottom-6 text-font w-[90%] h-12 pt-5 ml-[5%] mr-[5%] text-center bg-background rounded-md -z-10',
                    }, unit.health || 0),
                ])
            )
        }
    }
}

export default UnitToken;